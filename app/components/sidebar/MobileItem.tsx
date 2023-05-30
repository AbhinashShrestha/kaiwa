'use client';

import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
    href: string,
    label:string,
    icon: any, //used to be string but it breaks stuff so it is any type
    active?: boolean,
    onClick?: ()=>void;
}

const MobileItem:React.FC<MobileItemProps> = ({
  href,
  icon:Icon,
  active,
  onClick,
}) => {
  const handleClick = ()=>{
    if(onClick){
        return onClick();
    }
}
  return (
    <Link 
      onClick={handleClick }    
      href={href}
      className={clsx(`
        group
        flex
        gap-x-3
        rounded-md 
        justify-center
        text-sm
        w-full
        leading-6
        p-4
        font-semibold
        text-gray-500 
        hover:text-black
        hover:bg-gray-100
      `,
        active && 'bg-gray-200 text-black shadow-2xl' 
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  )
}

export default MobileItem