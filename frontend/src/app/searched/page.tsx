'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import PageSelectionBar from "../components/PageSelectionBar";
import MovieDetailModal from "../components/MovieDetailModal";
import { useMovies } from "@/hooks/useMovies";
import { useMovieActions } from "@/hooks/useMovieActions";

export default function SearchedPage() {
    const { movies: searchedMovies, loading, updateMovie, deleteMovie } = useMovies('searched');
    const { handleDelete } = useMovieActions(deleteMovie);
    const [selectedMovie, setSelectedMovie] = useState<any | null>(null);

    const handleMovieClick = (movie: any) => {
        setSelectedMovie(movie);
    };

    const handleRatingSubmit = (updatedMovie: any) => {
        updateMovie(updatedMovie);
        setSelectedMovie(null);
    };  
    
    const handleAddToWatchList = (updatedMovie: any) => {
        updateMovie(updatedMovie);
        setSelectedMovie(null) // モーダルを閉じる
    }

    const handleDeleteMovie = (ID: string) => {
        handleDelete(ID, () => {
          updateMovie(null); // 映画を削除後に状態を更新
        })
    }

    if (loading) return <p>Loading...</p>

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
                        onDelete={() => handleDeleteMovie(movie.ID)}
                    />
                ))}
            </div>
            {selectedMovie && (
                <MovieDetailModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                    onSubmit={handleRatingSubmit}
                    onAddToWatchList={handleAddToWatchList}
                />
            )}
        </div>
    );
}