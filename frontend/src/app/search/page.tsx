import { useState } from 'react';
import axios from 'axios';
import PageSelectionBar from '../components/PageSelectionBar';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import MovieDetailModal from '../components/MovieDetailModal';

export default function SearchPage() {
    const [movies, setMovies] = useState<any[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<any | null>(null);

    const handleSearchResults = (results: any) => {
        setMovies(results);
    };

    return (
        <div>
            <PageSelectionBar />
            <div className='p-4'>
                <SearchBar onSearchResults={handleSearchResults} />
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onClick={() => setSelectedMovie(movie)}
                            />
                        ))
                    ) : (
                        <p className='col-span-3 text-center text-gray-500'>映画が見つかりません</p>
                    )}
                </div>
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