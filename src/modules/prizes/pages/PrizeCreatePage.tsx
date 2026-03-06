"use client";

import { useState } from "react";
import PrizeForm from "../ui/PrizeForm";
import { prizeFormData } from "../validation/prizeSchema";
import { createPrize } from "../services/prizeService";

export default function PrizeCreatePage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [createdPrizeId, setCreatedPrizeId] = useState<string | null>(null);

    const handleCreatePrize = async (data: prizeFormData) => {
        setIsSubmitting(true);
        setError(null);
        setCreatedPrizeId(null);

        try {
            const prize = await createPrize(data);
            setCreatedPrizeId(prize.id);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Ocurrio un error al crear el premio."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto max-w-xl p-8">
            <h1 className="mb-6 text-3xl font-bold">Crear Premio</h1>
            <PrizeForm onSubmit={handleCreatePrize} isSubmitting={isSubmitting} />
            {createdPrizeId && (
                <p className="mt-4 rounded-md bg-green-100 p-3 text-sm text-green-800">
                    Premio creado correctamente. ID: {createdPrizeId}
                </p>
            )}
            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        </div>
    );
}
