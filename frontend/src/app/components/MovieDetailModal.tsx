import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import RatingModal from './RatingModal';

interface MovieDetailModalProps {
    movie: any;
    onClose: () => void;
}

export default function MovieDetailModal({ movie, onClose }: MovieDetailModalProps) {
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

    const handleRatingSubmit = () => {
        setIsRatingModalOpen(false);
    }

    const handleAddToWatchList = async () => {
        try {
            await axios.post(`/api/movies/watchlist`, {
                id: movie.id
            });
            alert('観たい映画リストに追加しました')
        } catch (error) {
            console.error('Error adding to watchlist', error);
        }
    };


    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
            <div className='bg-white p-4 rounded shadow-lg max-w-lg w-full'>
                <button onClick={onClose} className='absolute top-2 right-2 text-gray-600'>&times;</button>
                <div>
                    <Image 
                        src={movie.Poster} 
                        alt={movie.Title} 
                        width={40}
                        height={60}
                        className='object-cover mb-4'
                    />
                    <div>
                        <h2 className='text-2xl font-bold mb-4'>{movie.Title}</h2>
                        <p><strong>上映年:</strong> {movie.Year}</p>
                        <p><strong>上映時間:</strong> {movie.Runtime}</p>
                        <p><strong>ジャンル:</strong> {movie.Genre}</p>
                        <p><strong>監督:</strong> {movie.Director}</p>
                        <p><strong>著者:</strong> {movie.Writer}</p>
                        <p><strong>キャスト:</strong> {movie.Actors}</p>
                    </div>
                </div>
                <p><strong>プロット:</strong> {movie.Plot}</p>
                <p><strong>言語:</strong> {movie.Language}</p>
                <p><strong>国:</strong> {movie.Country}</p>
                <p><strong>受賞:</strong> {movie.Awards}</p>
                <p><strong>レビュー:</strong> {movie.ImdbRating}</p>
                <p><strong>評価:</strong> {movie.Rating}</p>
                <p><strong>感想:</strong> {movie.Review}</p>
                <button 
                    onClick={() => setIsRatingModalOpen(true)} 
                    className='bg-green-500 text-white p-2 mt-4 w-full rounded-md'
                >評価する</button>
                <button onClick={handleAddToWatchList} className='bg-blue-500 text-white p-2 mt-4 w-full'>観たい映画リストに追加</button>
            </div>

            {isRatingModalOpen && (
                <RatingModal
                    movieId={movie.id}
                    onClose={() => setIsRatingModalOpen(false)}
                    onSubmit={handleRatingSubmit}
                />
            )}
        </div>
    )
}