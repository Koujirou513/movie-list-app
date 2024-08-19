'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

export default function WatchList() {
    const [movies, setMovies] = useState<any[]>([]);

    useEffect(() => {
        axios.get(`/api/movies/watchlist`)
            .then(response => setMovies(response.data))
            .catch(error => console.error('Error fetching wachlist:', error));
    }, []);

    return (
        <div >
            <h1 className="text-3xl font-bold mb-4">検索した映画リスト</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {movies.map(movie => (
                    <MovieCard key={movie.imdbID} movie={movie}/>
                ))}
            </div>
        </div>
    );
}