"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { movieFormData } from "../validation/movieSchema";
import { createMovie } from "../services/movieService";
import MovieForm from "../ui/MovieForm";

export default function MovieCreatePage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleCreateMovie = async (data: movieFormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            await createMovie(data);
            router.push("/movies");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Ocurrio un error al crear la pelicula."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Crear Pelicula</h1>
            <MovieForm onSubmit={handleCreateMovie} isSubmitting={isSubmitting} />
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
}
