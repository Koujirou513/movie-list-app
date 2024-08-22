'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '@/app/components/MovieCard';
import MovieDetailModal from '@/app/components/MovieDetailModal';
import PageSelectionBar from "../components/PageSelectionBar";
import { useMovies } from '@/hooks/useMovies';
import { useMovieActions } from "@/hooks/useMovieActions";

export default function WatchListPage() {
  const { movies: watchlistMovies, loading } = useMovies('watchlist');
  const { movies, handleDelete } = useMovieActions(watchlistMovies);
  
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);

  if (loading) return <p>Loading...</p>

  const handleMovieClick = (movie: any) => {
    setSelectedMovie(movie);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold my-4 text-black text-center">観たい映画リスト</h1>
      <PageSelectionBar/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {watchlistMovies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onClick={() => handleMovieClick(movie)} 
            onDelete={handleDelete}
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
