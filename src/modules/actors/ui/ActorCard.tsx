"use client";

import Image from "next/image";
import { useState } from "react";
import { Actor, deleteActor, updateActor } from "../services/actorService";
import ActorForm from "./ActorForm";
import { actorFormData } from "../validation/actorSchema";
import { useRouter } from "next/navigation";

interface ActorCardProps {
    actor: Actor;
    onActorUpdated: (actor: Actor) => void;
    onActorDeleted: (actorId: string) => Promise<void> | void;
}

function formatBirthDateForInput(birthDate: string): string {
    if (!birthDate) return "";
    return birthDate.includes("T") ? birthDate.split("T")[0] : birthDate;
}

export default function ActorCard ({
    actor,
    onActorUpdated,
    onActorDeleted,
}: ActorCardProps){
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleUpdateActor = async (data: actorFormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const updatedActor = await updateActor(actor.id, data);
            onActorUpdated(updatedActor);
            setIsEditing(false);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Ocurrio un error al actualizar el actor."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isEditing) {
        return (
            <div className="rounded-lg border border-gray-300 p-4">
                <h2 className="mb-3 text-xl font-semibold">Editando: {actor.name}</h2>
                <ActorForm
                    onSubmit={handleUpdateActor}
                    defaultValues={{
                        name: actor.name,
                        photo: actor.photo,
                        nationality: actor.nationality,
                        biography: actor.biography,
                        birthDate: formatBirthDateForInput(actor.birthDate),
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

    const handleDeleteActor = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            await deleteActor(actor.id);
            await onActorDeleted(actor.id);
            setIsDeleting(false);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Ocurrio un error al eliminar el actor."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isDeleting) {
        return (
            <div className="rounded-lg border border-gray-300 p-4">
                <h2 className="mb-3 text-xl font-semibold">¿Eliminar: {actor.name}?</h2>
                <p className="mb-3 text-sm text-gray-600">
                    Esta accion no se puede deshacer.
                </p>
                <div className="flex gap-2">
                <button
                    type="button"
                    onClick={handleDeleteActor}
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
            <button
                type="button"
                className="w-full text-left"
            >
            <Image
                src={actor.photo}
                alt={actor.name}
                width={500}
                height={320}
                className="mb-3 h-56 w-full rounded-md object-cover"
            />
            <h2 className="text-xl font-semibold">{actor.name}</h2>
            <p className="text-sm text-gray-600">{actor.nationality}</p>
            </button>
            <div className="mt-3 flex gap-2">
                <button
                    type="button"
                    onClick={() => router.push(`/actors/${actor.id}`)}
                    className="rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600"
                >
                    Ver detalle
                </button>
                <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-600"
                >
                Editar
                </button>
                <button
                    type= "button"
                    onClick={() => setIsDeleting(true)}
                    className="rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}