import Link from "next/link";

const PageSelectionBar = () => {
    return (
        <nav className="flex justify-center space-x-4 bg-gray-200 p-2">
            <Link href="/watchlist" className="p-2 hover:bg-gray-300">
            観たい映画
            </Link>
            <Link href="/watched" className="p-2 hover:bg-gray-300">
            もう観た映画
            </Link>
            <Link href="/searched" className="p-2 hover:bg-gray-300">
            検索した映画
            </Link>
            <Link href="/search" className="p-2 hover:bg-gray-300">
            検索する
            </Link>
        </nav>
    );
};

export default PageSelectionBar;