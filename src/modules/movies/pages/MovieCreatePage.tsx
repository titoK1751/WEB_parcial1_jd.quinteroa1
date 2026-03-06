"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { movieSchema } from "../validation/movieSchema";
import { actorSchema } from "@/modules/actors/validation/actorSchema";
import { prizeSchema } from "@/modules/prizes/validation/prizeSchema";
import { createMovie, assignPrizeToMovie } from "../services/movieService";
import { createActor, assignMovieToActor } from "@/modules/actors/services/actorService";
import { createPrize } from "@/modules/prizes/services/prizeService";

const movieCreationBundleSchema = z.object({
    movie: movieSchema,
    actor: actorSchema,
    prize: prizeSchema,
});

type MovieCreationBundleFormData = z.infer<typeof movieCreationBundleSchema>;

export default function MovieCreatePage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<MovieCreationBundleFormData>({
        resolver: zodResolver(movieCreationBundleSchema),
        defaultValues: {
            movie: {
                title: "",
                poster: "",
                duration: 90,
                country: "",
                releaseDate: "",
                popularity: 0,
            },
            actor: {
                name: "",
                photo: "",
                nationality: "",
                biography: "",
                birthDate: "",
            },
            prize: {
                name: "",
                category: "",
                year: new Date().getFullYear(),
                status: "nominated",
            },
        },
    });

    const handleCreateBundle = async (data: MovieCreationBundleFormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const movie = await createMovie(data.movie);
            const actor = await createActor(data.actor);
            await assignMovieToActor(actor.id, movie.id);

            const prize = await createPrize(data.prize);
            await assignPrizeToMovie(movie.id, prize.id);

            router.push(`/movies/${movie.id}`);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Ocurrio un error al crear la pelicula con su actor y premio."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto max-w-4xl p-8">
            <h1 className="mb-6 text-3xl font-bold">Crear Pelicula, Actor y Premio</h1>

            <form onSubmit={handleSubmit(handleCreateBundle)} className="space-y-8">
                <section className="rounded-lg border border-gray-300 p-4">
                    <h2 className="mb-4 text-xl font-semibold">Datos de la pelicula</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label htmlFor="movie.title" className="block font-medium">Titulo</label>
                            <input id="movie.title" {...register("movie.title")} className="mt-1 block w-full rounded-md border-gray-300" />
                            {errors.movie?.title && <p className="mt-1 text-sm text-red-500">{errors.movie.title.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="movie.poster" className="block font-medium">Poster (URL)</label>
                            <input id="movie.poster" {...register("movie.poster")} className="mt-1 block w-full rounded-md border-gray-300" />
                            {errors.movie?.poster && <p className="mt-1 text-sm text-red-500">{errors.movie.poster.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="movie.duration" className="block font-medium">Duracion (min)</label>
                            <input id="movie.duration" type="number" {...register("movie.duration", { valueAsNumber: true })} className="mt-1 block w-full rounded-md border-gray-300" />
                            {errors.movie?.duration && <p className="mt-1 text-sm text-red-500">{errors.movie.duration.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="movie.country" className="block font-medium">Pais</label>
                            <input id="movie.country" {...register("movie.country")} className="mt-1 block w-full rounded-md border-gray-300" />
                            {errors.movie?.country && <p className="mt-1 text-sm text-red-500">{errors.movie.country.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="movie.releaseDate" className="block font-medium">Fecha de lanzamiento</label>
                            <input id="movie.releaseDate" type="date" {...register("movie.releaseDate")} className="mt-1 block w-full rounded-md border-gray-300" />
                            {errors.movie?.releaseDate && <p className="mt-1 text-sm text-red-500">{errors.movie.releaseDate.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="movie.popularity" className="block font-medium">Popularidad</label>
                            <input id="movie.popularity" type="number" step="0.1" {...register("movie.popularity", { valueAsNumber: true })} className="mt-1 block w-full rounded-md border-gray-300" />
                            {errors.movie?.popularity && <p className="mt-1 text-sm text-red-500">{errors.movie.popularity.message}</p>}
                        </div>
                    </div>
                </section>

                <section className="rounded-lg border border-gray-300 p-4">
                    <h2 className="mb-4 text-xl font-semibold">Datos del actor relacionado</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label htmlFor="actor.name" className="block font-medium">Nombre</label>
                            <input id="actor.name" {...register("actor.name")} className="mt-1 block w-full rounded-md border-gray-300" />
                            {errors.actor?.name && <p className="mt-1 text-sm text-red-500">{errors.actor.name.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="actor.photo" className="block font-medium">Foto (URL)</label>
                            <input id="actor.photo" {...register("actor.photo")} className="mt-1 block w-full rounded-md border-gray-300" />
                            {errors.actor?.photo && <p className="mt-1 text-sm text-red-500">{errors.actor.photo.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="actor.nationality" className="block font-medium">Nacionalidad</label>
                            <input id="actor.nationality" {...register("actor.nationality")} className="mt-1 block w-full rounded-md border-gray-300" />
                            {errors.actor?.nationality && <p className="mt-1 text-sm text-red-500">{errors.actor.nationality.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="actor.birthDate" className="block font-medium">Fecha de nacimiento</label>
                            <input id="actor.birthDate" type="date" {...register("actor.birthDate")} className="mt-1 block w-full rounded-md border-gray-300" />
                            {errors.actor?.birthDate && <p className="mt-1 text-sm text-red-500">{errors.actor.birthDate.message}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="actor.biography" className="block font-medium">Biografia</label>
                            <textarea id="actor.biography" {...register("actor.biography")} className="mt-1 block w-full rounded-md border-gray-300" />
                            {errors.actor?.biography && <p className="mt-1 text-sm text-red-500">{errors.actor.biography.message}</p>}
                        </div>
                    </div>
                </section>

                <section className="rounded-lg border border-gray-300 p-4">
                    <h2 className="mb-4 text-xl font-semibold">Datos del premio relacionado</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label htmlFor="prize.name" className="block font-medium">Nombre</label>
                            <input id="prize.name" {...register("prize.name")} className="mt-1 block w-full rounded-md border-gray-300" />
                            {errors.prize?.name && <p className="mt-1 text-sm text-red-500">{errors.prize.name.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="prize.category" className="block font-medium">Categoria</label>
                            <input id="prize.category" {...register("prize.category")} className="mt-1 block w-full rounded-md border-gray-300" />
                            {errors.prize?.category && <p className="mt-1 text-sm text-red-500">{errors.prize.category.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="prize.year" className="block font-medium">Anio</label>
                            <input id="prize.year" type="number" {...register("prize.year", { valueAsNumber: true })} className="mt-1 block w-full rounded-md border-gray-300" />
                            {errors.prize?.year && <p className="mt-1 text-sm text-red-500">{errors.prize.year.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="prize.status" className="block font-medium">Estado</label>
                            <select id="prize.status" {...register("prize.status")} className="mt-1 block w-full rounded-md border-gray-300">
                                <option value="nominated">Nominado</option>
                                <option value="won">Ganador</option>
                            </select>
                            {errors.prize?.status && <p className="mt-1 text-sm text-red-500">{errors.prize.status.message}</p>}
                        </div>
                    </div>
                </section>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 disabled:opacity-60"
                >
                    {isSubmitting ? "Creando y relacionando..." : "Crear pelicula con actor y premio"}
                </button>
            </form>

            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    );
}
