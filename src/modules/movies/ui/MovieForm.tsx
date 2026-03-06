"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { movieSchema, movieFormData } from "../validation/movieSchema";

interface MovieFormProps {
    onSubmit: SubmitHandler<movieFormData>;
    defaultValues?: movieFormData;
    isSubmitting: boolean;
}

export default function MovieForm({
    onSubmit,
    defaultValues,
    isSubmitting,
}: MovieFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<movieFormData>({
        resolver: zodResolver(movieSchema),
        defaultValues: {
            ...defaultValues,
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="title" className="block font-medium">
                    Titulo
                </label>
                <input
                    id="title"
                    {...register("title")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="poster" className="block font-medium">
                    Poster (URL)
                </label>
                <input
                    id="poster"
                    {...register("poster")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.poster && (
                    <p className="mt-1 text-sm text-red-500">{errors.poster.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="duration" className="block font-medium">
                    Duracion (minutos)
                </label>
                <input
                    id="duration"
                    type="number"
                    {...register("duration", { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.duration && (
                    <p className="mt-1 text-sm text-red-500">{errors.duration.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="country" className="block font-medium">
                    Pais
                </label>
                <input
                    id="country"
                    {...register("country")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.country && (
                    <p className="mt-1 text-sm text-red-500">{errors.country.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="releaseDate" className="block font-medium">
                    Fecha de Lanzamiento
                </label>
                <input
                    id="releaseDate"
                    type="date"
                    {...register("releaseDate")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.releaseDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.releaseDate.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="popularity" className="block font-medium">
                    Popularidad
                </label>
                <input
                    id="popularity"
                    type="number"
                    step="0.1"
                    {...register("popularity", { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.popularity && (
                    <p className="mt-1 text-sm text-red-500">{errors.popularity.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
                {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
        </form>
    );
}
