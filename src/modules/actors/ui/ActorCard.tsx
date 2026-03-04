"use client";

import Image from "next/image";
import { Actor } from "../services/actorService";

interface ActorCardProps {
    actor: Actor;
}

export default function ActorCard ({
    actor,
}: ActorCardProps){
    return (
        <button
            type="button"
            className="w-full rounded-lg border border-gray-300 p-4 text-left hover:bg-gray-100"
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
    );
}