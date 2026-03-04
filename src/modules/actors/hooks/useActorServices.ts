"use client";

import { useState, useEffect } from "react";
import { Actor, movie, fetchActorServices } from "@/modules/actors/services/actorService";

export function useActorServices() {
    const [services, setServices] = useState<Actor[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadservices = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await fetchActorServices();
                setServices(data);
            } catch (err) {
                if (err instanceof Error){
                    setError(err.message);
                }else {
                    setError("Ocurrio un error desconocido.");
                }
            } finally {
                setIsLoading(false);
            }
            };
            loadservices();
    }, []);

    return { services, isLoading, error};

}