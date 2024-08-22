import { FC } from 'react';
import Image from 'next/image';
import axios from 'axios';

interface MovieCardProps {
  movie: any;
  onClick?: () => void;  // onClick をオプションプロパティに変更
  onDelete?: (id: string) => void; // 削除の状態を更新するための関数
}

const MovieCard: FC<MovieCardProps> = ({ movie, onClick, onDelete }) => {
  const handleDelete = async () => {
    if (!movie.id) {
      console.error('映画IDが無効です');
      return;
    }

    const confirmDelete = confirm('この映画を削除しますか？');
    if (!confirmDelete) return;
    
    try {
      await axios.delete(`api/movies/watchlist/${movie.id}`);
      if (onDelete) {
        onDelete(movie.id);
      }
    } catch (error) {
      console.error('映画の削除に失敗しました:', error);
      alert('映画の削除に失敗しました。もう一度お試しください');
    }
  };

  return (
    <div
      className="flex justify-between border p-4 mt-4 rounded shadow hover:bg-blue-100 cursor-pointer text-black"
      onClick={onClick}
    >
      <div className='flex'>
        <Image 
          src={movie.poster || '/fallback-image.jpg'} 
          alt={movie.title || 'Movie Poster'} 
          width={70} 
          height={45} 
          className="object-cover mb-2 mr-2" 
        />
        <div>
          <h2 className="text-xl font-bold">{movie.title}</h2>
          <p>監督： {movie.director}</p>
          <p>上映年： {movie.year}</p>
          <p>ジャンル： {movie.genre}</p>
          <p>{movie.runtime}</p>
        </div>
      </div>
      <div 
        className='bg-gray-400 w-4 h-4 flex items-center text-center px-1 rounded-sm hover:bg-gray-600'
        onClick={(e) => {
          e.stopPropagation(); // 親要素のクリックイベントが発火しない様にする
          handleDelete();
        }}
      >
        <button className='cursor-pointer text-white'>x</button>
      </div>
    </div>
  );
};

export default MovieCard;
