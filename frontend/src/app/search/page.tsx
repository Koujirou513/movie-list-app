'use client'

import { useState } from 'react';
import axios from 'axios';
import PageSelectionBar from '../components/PageSelectionBar';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import MovieDetailModal from '../components/MovieDetailModal';

export default function SearchPage() {
    const [movies, setMovies] = useState<any[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<any | null>(null);

    const handleDelete = (id: string) => {
        setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id))
    }

    const handleSearchResults = (results: any) => {
        setMovies(results);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold my-4 text-black text-center">映画を探す</h1>
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
                                onDelete={handleDelete}
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