import { useState, useEffect } from 'react';
import axios from 'axios';

export function useMovies() {
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

    // 観たい映画リスト（watchlistがtrue）
    const watchlistMovies = movies.filter(movie => movie.WatchList && !movie.Watched);

    // もう観た映画リスト（watchedがtrue）
    const watchedMovies = movies.filter(movie => movie.Watched);

    // 検索した映画リスト（watchlistとwatchedがfalse）
    const searchedMovies =movies.filter(movie => !movie.WatchList && !movie.Watched);

    return { watchlistMovies, watchedMovies, searchedMovies, loading}
}