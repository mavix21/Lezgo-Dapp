'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    path: string;
    icon: JSX.Element;
    title: string;
    subTitle: string;
}

export const SiderMenuItem = ({ path, icon, title, subTitle }: Props) => {

    const pathActive = usePathname();

    return (
        <Link
            href={path}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${(pathActive === path) ? 'text-primary': ''}`}
        >
            {icon}
            {title}
        </Link>
    )
}