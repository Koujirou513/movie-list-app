'use client'

import { useEffect, useState } from 'react';
import PageSelectionBar from '../components/PageSelectionBar';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import MovieDetailModal from '../components/MovieDetailModal';

export default function SearchPage() {
    const [movies, setMovies] = useState<any[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<any | null>(null);

    useEffect(() => {
        console.log("再描画のトリガー: 映画リストが更新されました", movies);
    }, [movies]);

    const handleDelete = (ID: string) => {
        setMovies((prevMovies) => prevMovies.filter((movie) => movie.ID !== ID))
    }

    const handleSearchResults = (results: any) => {
        console.log("検索された結果:", results);
        // 単一オブジェクトの場合、配列としてラップ
        const moviesArray = Array.isArray(results) ? results : [results];
        setMovies(moviesArray);
        console.log("状態更新後の映画リスト", moviesArray)
    };

    const handleRatingSubmit = (updatedMovie: any) => {
        setMovies((prevMovies) => 
        prevMovies.map((movie) => movie.ID === updatedMovie.ID ? updatedMovie : movie)
        );
        setSelectedMovie(null);
    }

    const handleAddToWatchList = (updatedMovie: any) => {
        setMovies((prevMovies) => 
            prevMovies.map((movie) => movie.ID === updatedMovie.ID ? updatedMovie : movie)
        );
        setSelectedMovie(null)
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
                                key={movie.ID}
                                movie={movie}
                                onClick={() => setSelectedMovie(movie)}
                                onDelete={() => handleDelete(movie.ID)}
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
                    onSubmit={handleRatingSubmit}
                    onAddToWatchList={handleAddToWatchList}
                />
            )}
        </div>
    );
}