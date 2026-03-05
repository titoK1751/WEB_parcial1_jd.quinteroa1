"use client";

import { useState, useEffect, useCallback } from "react";
import { Actor, fetchActorServices } from "@/modules/actors/services/actorService";

export function useActorServices() {
    const [actors, setActors] = useState<Actor[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const reloadActors = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await fetchActorServices();
            setActors(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Ocurrio un error desconocido.");
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        reloadActors();
    }, [reloadActors]);

    return { actors, isLoading, error, reloadActors };

}