"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { prizeFormData, prizeSchema } from "../validation/prizeSchema";

interface PrizeFormProps {
    onSubmit: SubmitHandler<prizeFormData>;
    isSubmitting: boolean;
}

export default function PrizeForm({ onSubmit, isSubmitting }: PrizeFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<prizeFormData>({
        resolver: zodResolver(prizeSchema),
        defaultValues: {
            name: "",
            category: "",
            year: new Date().getFullYear(),
            status: "nominated",
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="name" className="block font-medium">
                    Nombre del premio
                </label>
                <input
                    id="name"
                    {...register("name")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="category" className="block font-medium">
                    Categoria
                </label>
                <input
                    id="category"
                    {...register("category")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.category && (
                    <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="year" className="block font-medium">
                    Año
                </label>
                <input
                    id="year"
                    type="number"
                    {...register("year", { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.year && (
                    <p className="mt-1 text-sm text-red-500">{errors.year.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="status" className="block font-medium">
                    Estado
                </label>
                <select
                    id="status"
                    {...register("status")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    <option value="nominated">Nominado</option>
                    <option value="won">Ganador</option>
                </select>
                {errors.status && (
                    <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 disabled:opacity-60"
            >
                {isSubmitting ? "Guardando..." : "Crear premio"}
            </button>
        </form>
    );
}
