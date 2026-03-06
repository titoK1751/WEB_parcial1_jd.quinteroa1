'use client';

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
    Movie,
    assignPrizeToMovie,
    getMovieById,
} from "@/modules/movies/services/movieService";
import { fetchPrizes, Prize } from "@/modules/prizes/services/prizeService";

function formatReleaseDate(releaseDate: string): string {
    if (!releaseDate) return "Sin fecha";
    const parsedDate = new Date(releaseDate);
    if (Number.isNaN(parsedDate.getTime())) return releaseDate;
    return parsedDate.toLocaleDateString("es-CO");
}

export default function MovieDetailPage() {
    const params = useParams();
    const movieId = useMemo(() => {
        const value = params?.movieId;
        return Array.isArray(value) ? value[0] : value;
    }, [params]);

    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [prizes, setPrizes] = useState<Prize[]>([]);
    const [loadingPrizes, setLoadingPrizes] = useState(false);
    const [selectedPrizeId, setSelectedPrizeId] = useState("");
    const [assigningPrize, setAssigningPrize] = useState(false);
    const [assignMessage, setAssignMessage] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadMovie() {
            if (!movieId || typeof movieId !== "string") {
                if (!cancelled) {
                    setMovie(null);
                    setError("ID de pelicula invalido.");
                    setLoading(false);
                }
                return;
            }

            try {
                if (!cancelled) {
                    setLoading(true);
                    setError(null);
                    setMovie(null);
                }

                const data = await getMovieById(movieId);

                if (!cancelled) {
                    setMovie(data);
                }
            } catch (err) {
                if (!cancelled) {
                    setMovie(null);
                    setError(
                        err instanceof Error
                            ? err.message
                            : "No se pudo cargar el detalle de la pelicula."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadMovie();

        return () => {
            cancelled = true;
        };
    }, [movieId]);

    useEffect(() => {
        let cancelled = false;

        async function loadPrizes() {
            setLoadingPrizes(true);

            try {
                const data = await fetchPrizes();
                if (!cancelled) {
                    setPrizes(data);
                }
            } catch {
                if (!cancelled) {
                    setPrizes([]);
                }
            } finally {
                if (!cancelled) {
                    setLoadingPrizes(false);
                }
            }
        }

        loadPrizes();

        return () => {
            cancelled = true;
        };
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;
    if (!movie) return <p>Pelicula no encontrada.</p>;

    const actorName = movie.actors?.[0]?.name ?? movie.actor?.name ?? movie.actorName ?? "Sin actor asignado";
    const prizeName = movie.prizes?.[0]?.name ?? movie.prize?.name ?? movie.prizeName ?? "Sin premio asignado";

    const handleAssignPrize = async () => {
        if (!selectedPrizeId) {
            setAssignMessage("Debes seleccionar un premio.");
            return;
        }

        setAssigningPrize(true);
        setAssignMessage(null);

        try {
            await assignPrizeToMovie(movie.id, selectedPrizeId);
            const updatedMovie = await getMovieById(movie.id);
            setMovie(updatedMovie);
            setSelectedPrizeId("");
            setAssignMessage("Premio asignado correctamente.");
        } catch (err) {
            setAssignMessage(
                err instanceof Error
                    ? err.message
                    : "No se pudo asignar el premio a la pelicula."
            );
        } finally {
            setAssigningPrize(false);
        }
    };

    return (
        <main className="max-w-xl mx-auto p-6">
            <Image
                src={movie.poster}
                alt={movie.title}
                width={800}
                height={420}
                className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h1 className="text-3xl font-bold mb-1">{movie.title}</h1>
            <p className="text-gray-500 mb-3">Lanzamiento: {formatReleaseDate(movie.releaseDate)}</p>
            <p className="mb-2">Actor: {actorName}</p>
            <p className="mb-6">Premio: {prizeName}</p>

            <div className="mb-6 rounded-lg border border-gray-200 p-4">
                <h2 className="mb-2 font-semibold">Asignar premio a la pelicula</h2>
                <div className="flex flex-col gap-2 sm:flex-row">
                    <select
                        value={selectedPrizeId}
                        onChange={(event) => setSelectedPrizeId(event.target.value)}
                        disabled={loadingPrizes || prizes.length === 0}
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                    >
                        <option value="">
                            {loadingPrizes
                                ? "Cargando premios..."
                                : prizes.length === 0
                                    ? "No hay premios disponibles"
                                    : "Selecciona un premio"}
                        </option>
                        {prizes.map((prize) => (
                            <option key={prize.id} value={prize.id}>
                                {prize.name} - {prize.category} ({prize.year}) [{prize.status}]
                            </option>
                        ))}
                    </select>
                    <button
                        type="button"
                        onClick={handleAssignPrize}
                        disabled={assigningPrize || loadingPrizes || prizes.length === 0}
                        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-600 disabled:opacity-60"
                    >
                        {assigningPrize ? "Asignando..." : "Asignar"}
                    </button>
                </div>
                {assignMessage && <p className="mt-2 text-sm text-gray-700">{assignMessage}</p>}
            </div>
        </main>
    );
}
