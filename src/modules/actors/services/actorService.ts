import { fetcher } from "@/shared/services/http";
import { actorFormData } from "../validation/actorSchema";


export interface ActorMovie {
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
    movies: ActorMovie[];
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

export const updateActor = (id: string, data: actorFormData): Promise<Actor> => {
    return fetcher<Actor>(`/v1/actors/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
};

export const deleteActor = (id: string): Promise<void> => {
    return fetcher<void>(`/v1/actors/${id}`, {
        method: "DELETE",
    });
};

export const assignMovieToActor = (actorId: string, movieID: string): Promise<Actor> => {
    return fetcher<Actor>(`/v1/actors/${actorId}/movies/${movieID}`, {
        method: "POST",
    });
};

export async function getActorById(id: string): Promise<Actor> {
    const actors = await fetcher<Actor[]>("/v1/actors");
    const actor = actors.find(a => a.id === id);
    if (!actor) throw new Error('Actor no encontrado');
    return actor;
}