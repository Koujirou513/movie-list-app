import { useState } from 'react';
import axios from 'axios';

interface RatingModalProps {
    movieId: string;
    onClose: () => void;
    onSubmit: (updatedMovie: any) => void;
}

const RatingModal: React.FC<RatingModalProps> = ({ movieId, onClose, onSubmit }) => {
    const [rating, setRating] = useState<number>(0);
    const [review, setReview] = useState<string>('');

    const handleSubmit = async () => {
        if (rating < 1 || rating > 5) {
            alert('評価は1から5の範囲で入力してください');
            return;
        }

        try {
            const response = await axios.put(`/api/movies/${movieId}/rate`, {
                rating,
                review,
            });
            onSubmit(response.data);
            onClose();
        } catch (error) {
            console.error('Error submitting rating:', error);
            alert('評価の送信に失敗しました')
        }
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-black'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
                <h2 className='text-2xl font-bold mb-4'>評価を入力</h2>
                <label className='block mb-2'>評価(1-5):</label>
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className='border p-2 w-full mb-4'
                    min="1"
                    max="5"
                />
                <label className='block mb-2'>レビュー</label>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className='border p-2 w-full mb-4'
                    rows={4}
                />
                <div className='flex justify-end space-x-2'>
                    <button onClick={onClose} className='bg-gray-400 p-2 rounded-md'>
                        キャンセル
                    </button>
                    <button onClick={handleSubmit} className='bg-green-500 text-white p-2 rounded-md'>
                        提出
                    </button>

                </div>
            </div>
        </div>
    );
};

export default RatingModal;