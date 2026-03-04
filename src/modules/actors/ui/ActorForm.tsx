"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { actorSchema, actorFormData } from "../validation/actorSchema";

interface ActorFormProps {
    onSubmit: SubmitHandler<actorFormData>;
    defaultValues?: actorFormData;
    isSubmitting: boolean;
}

export default function EditActorForm({
    onSubmit,
    defaultValues,
    isSubmitting,
}: ActorFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors }, 
    } = useForm<actorFormData>({
        resolver: zodResolver(actorSchema),
        defaultValues: {
            ...defaultValues,
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="name" className="block font-medium">
                    Nombre
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
                <label htmlFor="photo" className="block font-medium">
                    Foto (URL)
                </label>
                <input
                    id="photo"
                    {...register("photo")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.photo && (
                    <p className="mt-1 text-sm text-red-500">{errors.photo.message}</p>
                )}
            </div>    

            <div>
                <label htmlFor="nationality" className="block font-medium">
                    Nacionalidad
                </label>
                <input
                    id="nationality"
                    {...register("nationality")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.nationality && (
                    <p className="mt-1 text-sm text-red-500">{errors.nationality.message}</p>
                )}
            </div>            

            <div>
                <label htmlFor="biography" className="block font-medium">
                    Biografia
                </label>
                <textarea
                    id="biography"
                    {...register("biography")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.biography && (
                    <p className="mt-1 text-sm text-red-500">{errors.biography.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="birthDate" className="block font-medium">
                    Fecha de Nacimiento
                </label>
                <input
                    id="birthDate"
                    type="date"
                    {...register("birthDate")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.birthDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.birthDate.message}</p>
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