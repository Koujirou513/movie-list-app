import axios from 'axios';

export function useMovieActions() {
    const handleDelete = async (ID: string, onDeleteSuccess: () => void) => {
        const confirmDelete = confirm('本当にこの映画を削除しますか？');
        if (!confirmDelete) return;

        try {
            await axios.delete(`api/movies/watchlist/${ID}`);
            onDeleteSuccess(); // 削除が完了したら親コンポーネントの状態を更新
        } catch(error) {
            console.error('映画の削除に失敗しました:', error);
            alert('映画の削除に失敗しました。もう一度お試しください');
        }
    };

    return { handleDelete };
}