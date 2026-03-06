'use client';
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Actor, assignMovieToActor, getActorById } from "@/modules/actors/services/actorService";

export default function ActorDetailPage() {
    const params = useParams();
    const actorId = useMemo(() => {
        const value = params?.actorId;
        return Array.isArray(value) ? value[0] : value;
    }, [params]);

    const [actor, setActor] = useState<Actor | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [movieId, setMovieId] = useState("");
    const [assigningMovie, setAssigningMovie] = useState(false);
    const [assignMessage, setAssignMessage] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadActor() {
            if (!actorId || typeof actorId !== "string") {
                if (!cancelled) {
                    setActor(null);
                    setError("ID de actor inválido.");
                    setLoading(false);
                }
                return;
            }

            try {
                if (!cancelled) {
                    setLoading(true);
                    setError(null);
                    setActor(null);
                }

                const data = await getActorById(actorId);

                if (!cancelled) {
                    if (data) {
                        setActor(data);
                    } else {
                        setError("Actor no encontrado.");
                    }
                }
            } catch (err) {
                console.error("Error cargando actor:", err);
                if (!cancelled) {
                    setActor(null);
                    setError("No se pudo cargar el detalle del actor.");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadActor();

        return () => {
            cancelled = true;
        };
    }, [actorId]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;
    if (!actor) return <p>Actor no encontrado.</p>;

    const handleAssignMovie = async () => {
        if (!movieId.trim()) {
            setAssignMessage("Debes ingresar un ID de pelicula.");
            return;
        }

        setAssigningMovie(true);
        setAssignMessage(null);

        try {
            await assignMovieToActor(actor.id, movieId.trim());
            const updatedActor = await getActorById(actor.id);
            setActor(updatedActor);
            setMovieId("");
            setAssignMessage("Pelicula asignada correctamente.");
        } catch (err) {
            setAssignMessage(
                err instanceof Error
                    ? err.message
                    : "No se pudo asignar la pelicula al actor."
            );
        } finally {
            setAssigningMovie(false);
        }
    };

    return (
    <main className="max-w-xl mx-auto p-6">
        <Image
            src={actor.photo}
            alt={actor.name}
            width={800}
            height={420}
            className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-3xl font-bold mb-1">{actor.name}</h1>
        <p className="text-gray-500 mb-3">{actor.nationality} · {actor.birthDate}</p>
        <p className="mb-6">{actor.biography}</p>

        <h2 className="text-xl font-semibold mb-3">Películas</h2>
        <div className="mb-6 rounded-lg border border-gray-200 p-4">
            <h3 className="mb-2 font-semibold">Asignar pelicula al actor</h3>
            <div className="flex flex-col gap-2 sm:flex-row">
                <input
                    value={movieId}
                    onChange={(event) => setMovieId(event.target.value)}
                    placeholder="ID de pelicula"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                <button
                    type="button"
                    onClick={handleAssignMovie}
                    disabled={assigningMovie}
                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-600 disabled:opacity-60"
                >
                    {assigningMovie ? "Asignando..." : "Asignar"}
                </button>
            </div>
            {assignMessage && <p className="mt-2 text-sm text-gray-700">{assignMessage}</p>}
        </div>

        {actor.movies.length === 0 ? (
            <p className="text-gray-500">Este actor no tiene películas registradas.</p>
        ) : (
            <ul className="flex flex-col gap-3">
                {actor.movies.map((movie) => (
                    <li key={movie.id} className="flex gap-4 items-center border border-gray-200 rounded-lg p-3">
                        <Image
                            src={movie.poster}
                            alt={movie.title}
                            width={120}
                            height={120}
                            className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                        />
                        <div>
                            <p className="font-semibold">{movie.title}</p>
                            <p className="text-sm text-gray-500">{movie.country} · {movie.duration} min</p>
                            <p className="text-sm text-gray-500">
                                {new Date(movie.releaseDate).getFullYear()} · ⭐ {movie.popularity}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </main>
    );  
}