import { fetcher } from "@/shared/services/http";
import { movieFormData } from "../validation/movieSchema";

export interface MovieActor {
    id: string;
    name: string;
}

export interface MoviePrize {
    id: string;
    name: string;
}

export interface Movie {
    id: string;
    title: string;
    poster: string;
    duration: number;
    country: string;
    releaseDate: string;
    popularity: number;
    actors?: MovieActor[];
    actor?: MovieActor;
    actorName?: string;
    prizes?: MoviePrize[];
    prize?: MoviePrize;
    prizeName?: string;
}

export const fetchMoviesServices = (): Promise<Movie[]> => {
    return fetcher<Movie[]>("/v1/movies");
}

export const createMovie = (data: movieFormData): Promise<Movie> => {
    return fetcher<Movie>("/v1/movies", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export const updateMovie = (id: string, data: movieFormData): Promise<Movie> => {
    return fetcher<Movie>(`/v1/movies/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export const deleteMovie = (id: string): Promise<void> => {
    return fetcher<void>(`/v1/movies/${id}`, {
        method: "DELETE",
    });
}

export const assignPrizeToMovie = (movieId: string, prizeID: string): Promise<Movie> => {
    return fetcher<Movie>(`/v1/movies/${movieId}/prizes/${prizeID}`, {
        method: "POST",
    });
};

export async function getMovieById(id: string): Promise<Movie> {
    const movies = await fetcher<Movie[]>("/v1/movies");
    const movie = movies.find(m => m.id === id);
    if (!movie) throw new Error('Movie no encontrado');
    return movie;
}