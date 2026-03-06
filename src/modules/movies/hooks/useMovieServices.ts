"use client";

import { useState, useEffect, useCallback } from "react";
import { Movie, fetchMoviesServices } from "@/modules/movies/services/movieService";

export function useMovieServices() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const reloadMovies = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await fetchMoviesServices();
            setMovies(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Ocurrio un error desconocido.");
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        reloadMovies();
    }, [reloadMovies]);

    return { movies, isLoading, error, reloadMovies };
}
