"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ActorForm from "../ui/ActorForm";
import { actorFormData } from "../validation/actorSchema";
import { createActor } from "../services/actorService";

export default function ActorCreatePage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleCreateActor = async (data: actorFormData) => {
        setIsSubmitting(true);
        setError(null);
        try {
            await createActor(data);
            router.push("/actors");
        } catch (err){
            setError(
                err instanceof Error
                ? err.message
                : "Ocurrio un error al crear el actor."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className= "text-3xl font-bold mb-6">Crear Actor</h1>
            <ActorForm onSubmit={handleCreateActor} isSubmitting={isSubmitting} />
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
}