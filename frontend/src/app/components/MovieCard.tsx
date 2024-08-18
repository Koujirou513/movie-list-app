import { FC } from 'react';
import Image from 'next/image';

interface MovieCardProps {
  movie: any;
  onClick?: () => void;  // onClick をオプションプロパティに変更
}

const MovieCard: FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div
      className="border p-4 rounded shadow hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      <Image 
        src={movie.Poster} 
        alt={movie.Title} 
        width={20} 
        height={30} 
        className="object-cover mb-2" 
      />
      <h2 className="text-xl font-bold">{movie.Title}</h2>
      <p>{movie.Year}</p>
      <p>{movie.Genre}</p>
      <p>{movie.runtime}</p>
    </div>
  );
};

export default MovieCard;
