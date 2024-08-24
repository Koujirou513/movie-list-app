import { useState, useEffect } from 'react';
import axios from 'axios';

export function useMovies(filter: 'watchList' | 'watched' | 'searched') {
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await axios.get('/api/movies');
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchMovies();
    }, []);

    let filteredMovies: any[] = [];
    if (filter === 'watchList') {
        filteredMovies = movies.filter(movie => movie.watchList && !movie.watched);
    } else if (filter === 'watched') {
        filteredMovies = movies.filter(movie => movie.watched);
    } else if (filter === 'searched') {
        filteredMovies = movies.filter(movie => !movie.watchList && !movie.watched);
    }

    // 映画を更新する関数
    const updateMovie = (updatedMovie: any) => {
        setMovies((prevMovies) => 
            prevMovies.map((movie) => movie.ID === updatedMovie.ID ? updatedMovie : movie)
        );
    };

    return { movies: filteredMovies, loading, updateMovie };
}