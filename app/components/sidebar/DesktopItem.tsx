'use client';

import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps{
    href: string,
    label: string,
    icon: any, //used to be string but it breaks stuff so it is any type
    active?: boolean,
    onClick?: ()=>void;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
    href,
    label,
    icon:Icon,
    active,
    onClick
}) => {
    const handleClick = ()=>{
        if(onClick){
            return onClick();
        }
    }
  return (
    <li onClick={handleClick}>
        <Link href={href}
            className={clsx(`
                group
                flex
                gap-x-3
                rounded-md
                p-3
                text-sm
                leading-6
                font-semibold
                text-gray-500
                hover:text-black
                hover:bg-gray-50
            `,
                active && 'bg-white text-black' 
            )}
        >
            <Icon classname="h-6 w-6 shrink-0 shadow-2xl bg-gray" />
            <span className="sr-only">{label}</span>
        </Link>
    </li>
  )
}

export default DesktopItem