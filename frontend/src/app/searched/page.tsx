'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import PageSelectionBar from "../components/PageSelectionBar";
import MovieDetailModal from "../components/MovieDetailModal";
import { useMovies } from "@/hooks/useMovies";
import { useMovieActions } from "@/hooks/useMovieActions";

export default function SearchedPage() {
    const { movies: searchedMovies, loading } = useMovies('searched');
    const { movies, handleDelete } = useMovieActions(searchedMovies);
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
                    <MovieCard 
                        key={movie.ID} 
                        movie={movie} 
                        onClick={() => handleMovieClick(movie)}
                        onDelete={() => handleDelete(movie.ID)}
                    />
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