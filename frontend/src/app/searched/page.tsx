'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import PageSelectionBar from "../components/PageSelectionBar";
import MovieDetailModal from "../components/MovieDetailModal";
import { useMovies } from "@/hooks/useMovies";

export default function SearchedPage() {
    const { searchedMovies, loading } = useMovies();
    const [selectedMovie, setSelectedMovie] = useState<any | null>(null);


    if (loading) return <p>Loading...</p>

    const handleMovieClick = (movie: any) => {
        setSelectedMovie(movie);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold my-4 text-black text-center">検索した映画リスト</h1>
            <PageSelectionBar/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {searchedMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} onClick={() => handleMovieClick(movie)}/>
                ))}
            </div>
            {selectedMovie && (
                <MovieDetailModal
                movie={selectedMovie}
                onClose={() => setSelectedMovie(null)}
            />
            )}
        </div>
    );
}