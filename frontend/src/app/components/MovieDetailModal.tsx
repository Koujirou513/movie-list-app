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

    // モーダル以外をクリックで閉じる
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose(); 
        }
    }

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
    console.log(movie)

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50' onClick={handleOverlayClick}>
            <div className='bg-white p-4 rounded shadow-lg max-w-lg w-full text-black'>
                <button onClick={onClose} className='absolute top-2 right-2 text-gray-600'>&times;</button>
                <div className='flex'>
                    <Image 
                        src={movie.poster || '/fallback-image.jpg'} 
                        alt={movie.title || 'Movie Poster'} 
                        width={300}
                        height={450}
                        className='object-cover mb-4 mr-4'
                    />
                    <div>
                        <h2 className='text-2xl font-bold mb-4'>{movie.title}</h2>
                        <p><strong>上映年:</strong> {movie.year}</p>
                        <p><strong>上映時間:</strong> {movie.runtime}</p>
                        <p><strong>ジャンル:</strong> {movie.genre}</p>
                        <p><strong>監督:</strong> {movie.director}</p>
                        <p><strong>著者:</strong> {movie.writer}</p>
                        <p><strong>キャスト:</strong> {movie.actors}</p>
                    </div>
                </div>
                <p><strong>プロット:</strong> {movie.plot}</p>
                <p><strong>言語:</strong> {movie.language}</p>
                <p><strong>国:</strong> {movie.country}</p>
                <p><strong>受賞:</strong> {movie.awards}</p>
                <p><strong>レビュー:</strong> {movie.imdbRating}</p>
                <p><strong>評価:</strong> {movie.rating}</p>
                <p><strong>感想:</strong> {movie.review}</p>
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
