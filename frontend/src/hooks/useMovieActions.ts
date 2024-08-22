import { useState } from 'react';
import axios from 'axios';

export function useMovieActions(initialMovies: any[]) {
    const [movies, setMovies] = useState(initialMovies);

    const handleDelete = async (ID: string) => {
        const confirmDelete = confirm('本当にこの映画を削除しますか？');
        if (!confirmDelete) return;

        try {
            await axios.delete(`api/movies/watchlist/${ID}`);
            setMovies((prevMovies) => prevMovies.filter((movie) => movie.ID !== ID));
        } catch(error) {
            console.error('映画の削除に失敗しました:', error);
            alert('映画の削除に失敗しました。もう一度お試しください');
        }
    };

    return { movies, handleDelete };
}