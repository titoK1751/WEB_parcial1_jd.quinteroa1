import { fetcher } from "@/shared/services/http";

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