import { FC } from 'react';
import Image from 'next/image';
import axios from 'axios';

interface MovieCardProps {
  movie: any;
  onClick?: () => void;  // onClick をオプションプロパティに変更
  onDelete?: () => void; // 削除の状態を更新するための関数
}

const MovieCard: FC<MovieCardProps> = ({ movie, onClick, onDelete }) => {
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
          if (onDelete) {
            onDelete();
          }
        }}
      >
        <button className='cursor-pointer text-white'>x</button>
      </div>
    </div>
  );
};

export default MovieCard;
