"use client";

import { useEffect, useState } from "react";
import { useMovieServices } from "../hooks/useMovieServices";
import { Movie } from "../services/movieService";
import MovieList from "../ui/MovieList";

export default function MoviesPage() {
	const { movies, isLoading, error, reloadMovies } = useMovieServices();
	const [moviesState, setMoviesState] = useState<Movie[]>([]);

	useEffect(() => {
		setMoviesState(movies);
	}, [movies]);

	const handleMovieUpdated = (updatedMovie: Movie) => {
		setMoviesState((prevMovies) =>
			prevMovies.map((movie) =>
				movie.id === updatedMovie.id ? updatedMovie : movie
			)
		);
	};

	const handleMovieDeleted = async (deletedMovieId: string) => {
		setMoviesState((prevMovies) =>
			prevMovies.filter((movie) => movie.id !== deletedMovieId)
		);

		await reloadMovies();
	};

	if (isLoading) {
		return <div className="text-center p-8">Cargando peliculas...</div>;
	}

	if (error) {
		return <div className="text-center p-8 text-red-500">{error}</div>;
	}

	return (
		<div className="container mx-auto p-8">
			<h1 className="text-3xl font-bold mb-6">Peliculas</h1>
			<MovieList
				movies={moviesState}
				onMovieUpdated={handleMovieUpdated}
				onMovieDeleted={handleMovieDeleted}
			/>
		</div>
	);
}