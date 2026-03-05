"use client";

import { useEffect, useState } from "react";
import { useActorServices } from "../hooks/useActorServices";
import { Actor } from "../services/actorService";
import ActorList from "../ui/ActorList";

export default function ActorsPage(){
    const { actors, isLoading, error, reloadActors } = useActorServices();
    const [actorsState, setActorsState] = useState<Actor[]>([]);

    const [selectedActor, setSelectedActor] = useState<Actor | null>(null);

    useEffect(() => {
        setActorsState(actors);
    }, [actors]);


    const handleActorUpdated = (updatedActor: Actor) => {
        setActorsState((prevActors) =>
            prevActors.map((actor) =>
                actor.id === updatedActor.id ? updatedActor : actor
            )
        );

        setSelectedActor((prevSelected) =>
            prevSelected?.id === updatedActor.id ? updatedActor : prevSelected
        );
    };

    const handleActorDeleted = async (deletedActorId: string) => {
        setActorsState((prevActors) =>
            prevActors.filter((actor) => actor.id !== deletedActorId)
        );

        await reloadActors();

        setSelectedActor((prevSelected) =>
            prevSelected?.id === deletedActorId ? null : prevSelected
        );
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
            <ActorList
                actors={actorsState}
                onActorUpdated={handleActorUpdated}
                onActorDeleted={handleActorDeleted}
            />

            {selectedActor && (
                <div className="mt-8 rounded-lg border border-gray-300 p-4">
                    <h2 className="text-2xl font-semibold">{selectedActor.name}</h2>
                    <p className="mt-2 text-sm text-gray-600">{selectedActor.biography}</p>
                </div>
            )}
        </div>
    );
}