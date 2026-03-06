"use client";

import Image from "next/image";
import { useState } from "react";
import { Movie, deleteMovie, updateMovie } from "../services/movieService";
import { movieFormData } from "../validation/movieSchema";
import MovieForm from "./MovieForm";

interface MovieCardProps {
    movie: Movie;
    onMovieUpdated: (movie: Movie) => void;
    onMovieDeleted: (movieId: string) => Promise<void> | void;
}

function formatReleaseDateForInput(releaseDate: string): string {
    if (!releaseDate) return "";
    return releaseDate.includes("T") ? releaseDate.split("T")[0] : releaseDate;
}

export default function MovieCard({
    movie,
    onMovieUpdated,
    onMovieDeleted,
}: MovieCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpdateMovie = async (data: movieFormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const updatedMovie = await updateMovie(movie.id, data);
            onMovieUpdated(updatedMovie);
            setIsEditing(false);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Ocurrio un error al actualizar la pelicula."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteMovie = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            await deleteMovie(movie.id);
            await onMovieDeleted(movie.id);
            setIsDeleting(false);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Ocurrio un error al eliminar la pelicula."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isEditing) {
        return (
            <div className="rounded-lg border border-gray-300 p-4">
                <h2 className="mb-3 text-xl font-semibold">Editando: {movie.title}</h2>
                <MovieForm
                    onSubmit={handleUpdateMovie}
                    defaultValues={{
                        title: movie.title,
                        releaseDate: formatReleaseDateForInput(movie.releaseDate),
                        poster: movie.poster,
                        duration: movie.duration,
                        country: movie.country,
                        popularity: movie.popularity,
                    }}
                    isSubmitting={isSubmitting}
                />
                {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
                <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="mt-3 rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100"
                >
                    Cancelar
                </button>
            </div>
        );
    }

    if (isDeleting) {
        return (
            <div className="rounded-lg border border-gray-300 p-4">
                <h2 className="mb-3 text-xl font-semibold">¿Eliminar: {movie.title}?</h2>
                <p className="mb-3 text-sm text-gray-600">
                    Esta accion no se puede deshacer.
                </p>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={handleDeleteMovie}
                        disabled={isSubmitting}
                        className="rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-60"
                    >
                        {isSubmitting ? "Eliminando..." : "Si, eliminar"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsDeleting(false)}
                        disabled={isSubmitting}
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100 disabled:opacity-60"
                    >
                        Cancelar
                    </button>
                </div>
                {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
            </div>
        );
    }

    return (
        <div className="w-full rounded-lg border border-gray-300 p-4 text-left hover:bg-gray-100">
            <Image
                src={movie.poster}
                alt={movie.title}
                width={500}
                height={320}
                className="mb-3 h-56 w-full rounded-md object-cover"
            />
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-600">Realease date: {movie.releaseDate.split("T")[0]}</p>
            <p className="text-sm text-gray-600">Country: {movie.country}</p>
            <p className="text-sm text-gray-600">Duration: {movie.duration} min</p>
            <p className="text-sm text-gray-600">⭐ {movie.popularity}</p>
            <div className="mt-3 flex gap-2">
                <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-600"
                >
                    Editar
                </button>
                <button
                    type="button"
                    onClick={() => setIsDeleting(true)}
                    className="rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
                >
                    Eliminar
                </button>
            </div>
            {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
        </div>
    );
}
