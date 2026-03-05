"use client";

import { Actor } from "../services/actorService";
import ActorCard from "./ActorCard";

interface ActorListProps {
    actors: Actor[];    
    onActorUpdated: (actor: Actor) => void;
    onActorDeleted: (actorId: string) => Promise<void> | void;
}

export default function ActorList({ actors, onActorUpdated, onActorDeleted }: ActorListProps) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {actors.map((actor) => (
                <ActorCard
                    key={actor.id}
                    actor={actor}
                    onActorUpdated={onActorUpdated}
                    onActorDeleted={onActorDeleted}
                />
            ))}
        </div>
    );
}
