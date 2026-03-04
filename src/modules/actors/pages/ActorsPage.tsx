"use client";

import { useState } from "react";
import { useActorServices } from "../hooks/useActorServices";
import { Actor } from "../services/actorService";
import ActorList from "../ui/ActorList";

export default function ActorsPage(){
    const { services, isLoading, error } = useActorServices();

    const [selectedActor, setSelectedActor] = useState<Actor | null>(null);

    const handleActorClick = (Actor: Actor) => {
        setSelectedActor(Actor);
    };

    if (isLoading){
        return <div className= "text-center p-8">Cargando actores...</div>;
    }

    if (error){
        return <div className= "text-center p-8 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Actores</h1>
            <ActorList actors={services} onActorClick={handleActorClick} />

            {selectedActor && (
                <div className="mt-8 rounded-lg border border-gray-300 p-4">
                    <h2 className="text-2xl font-semibold">{selectedActor.name}</h2>
                    <p className="mt-2 text-sm text-gray-600">{selectedActor.biography}</p>
                </div>
            )}
        </div>
    );
}