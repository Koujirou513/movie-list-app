import { FC } from 'react';
import Image from 'next/image';

interface MovieCardProps {
  movie: any;
  onClick?: () => void;  // onClick をオプションプロパティに変更
}

const MovieCard: FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div
      className="border p-4 rounded shadow hover:bg-gray-100 cursor-pointer text-black"
      onClick={onClick}
    >
      <Image 
        src={movie.poster || '/fallback-image.jpg'} 
        alt={movie.title || 'Movie Poster'} 
        width={300} 
        height={450} 
        className="object-cover mb-2" 
      />
      <h2 className="text-xl font-bold">{movie.title}</h2>
      <p>監督： {movie.director}</p>
      <p>上映年： {movie.year}</p>
      <p>ジャンル： {movie.genre}</p>
      <p>{movie.runtime}</p>
    </div>
  );
};

export default MovieCard;
