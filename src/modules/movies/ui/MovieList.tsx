"use client";

import { Movie } from "../services/movieService";
import MovieCard from "./MovieCard";

interface MovieListProps {
    movies: Movie[];
    onMovieUpdated: (movie: Movie) => void;
    onMovieDeleted: (movieId: string) => Promise<void> | void;
}

export default function MovieList({
    movies,
    onMovieUpdated,
    onMovieDeleted,
}: MovieListProps) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieUpdated={onMovieUpdated}
                    onMovieDeleted={onMovieDeleted}
                />
            ))}
        </div>
    );
}
