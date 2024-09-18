import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PageSelectionBar() {
    const pathname = usePathname();

    // リンク情報の配列
    const links = [
        { href: '/watchlist', label: '観たい映画' },
        { href: '/watched', label: 'もう観た映画' },
        { href: '/searched', label: '検索した映画' },
        { href: '/search', label: '探す' },
    ];

    return (
        <nav className="flex justify-center space-x-4 pt-10">
            {links.map((link) => (
                <Link 
                    key={link.href} 
                    href={link.href}
                    className={`w-40 p-3 text-center ${
                        pathname === link.href
                            ? 'bg-white text-black'
                            : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                    }`}
                >
                        <span>{link.label}</span>
                </Link>
            ))}
        </nav>
    );
};