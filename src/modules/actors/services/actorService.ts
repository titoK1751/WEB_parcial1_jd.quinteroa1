import { fetcher } from "@/shared/services/http";
import { actorFormData } from "../validation/actorSchema";


export interface movie {
    id: string;
    title: string;
    poster: string;
    duration: number;
    country: string;
    releaseDate: string;
    popularity: number;
}

export interface Actor {
    id: string;
    name: string;
    photo: string;
    nationality: string;
    birthDate: string;
    biography: string;
    movies: movie[];
}

export const fetchActorServices = (): Promise<Actor[]> => {
    return fetcher<Actor[]>("/v1/actors");
};

export const createActor = (data: actorFormData): Promise<Actor> => {
    return fetcher<Actor>("/v1/actors", {
        method: "POST",
        body: JSON.stringify(data),
    });
};