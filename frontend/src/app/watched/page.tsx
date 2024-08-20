'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '@/app/components/MovieCard';
import MovieDetailModal from '@/app/components/MovieDetailModal';
import PageSelectionBar from "../components/PageSelectionBar";
import { useMovies } from '@/hooks/useMovies';


export default function WatchedPage() {
  const { watchedMovies, loading } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);

  if (loading) return <p>Loading...</p>

  const handleMovieClick = (movie: any) => {
    setSelectedMovie(movie);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold my-4 text-black text-center">もう見た映画リスト</h1>
      <PageSelectionBar/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {watchedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={() => handleMovieClick(movie)} />
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