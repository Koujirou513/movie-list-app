'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '@/app/components/MovieCard';
import MovieDetailModal from '@/app/components/MovieDetailModal';

export default function WatchList() {
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);

  useEffect(() => {
    axios.get('/api/movies/watchlist')
      .then(response => setMovies(response.data))
      .catch(error => console.error('Error fetching watchlist:', error));
  }, []);

  const handleMovieClick = (movie: any) => {
    setSelectedMovie(movie);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">もう見た映画リスト</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
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