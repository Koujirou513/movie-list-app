import { useState } from 'react';
import axios from 'axios';

interface SearchBarProps {
    onSearchResults: (movies: any) => void;
}

export default function SearchBar({ onSearchResults }: SearchBarProps) {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');

    const handleSearch = async () => {
        if (!title.trim()) {
            alert('タイトルを入力してください');
            return;
        }

        try {
            const response = await axios.get(`/api/movies/search`, {
                params: { title, year },
            });
            console.log("検索結果:", response.data)
            onSearchResults(response.data || []);
        } catch (error) {
            console.error('Search error:', error);
        }
    };
    return (
        <div className='flex items-center space-x-2 bg-gray-200 p-4 rounded-md'>
            <label className='text-sm font-semibold text-black'>タイトル</label>
            <input
                type="text"
                className="border p-2 flex-grow text-black"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="映画のタイトルを入力"
            />
            <label className='text-sm font-semibold text-black'>上映年</label>
            <input 
                type='text'
                className='border p-2 w-20 text-black'
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder='任意'
            />
            <button onClick={handleSearch} className='bg-blue-500 text-white p-2 rounded-md'>
                検索
            </button>
        </div>
    )
}

