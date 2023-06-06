import { IconType } from "react-icons";

interface AuthSocialButtonProps {
    icon: IconType,
    onClick:()=>void,
    label: string
}

const AuthSocialButton:React.FC<AuthSocialButtonProps> = ({
    icon:Icon,
    onClick,
    label
}) => {
  return (
   <button
    type="button"
    onClick={onClick}
    className="
        inline-flex
        items-center
        w-full
        justify-between
        rounded-md
        bg-white
        px-4
        py-2
        text-gray-500
        shadow-sm
        ring-1
        ring-inset
        ring-gray-300
        hover:ring-teal-50
        focus:outline-offset-0
    "
   >
    <Icon size={30}/>
    <span className="text-center font-semibold text-black w-full">{label}</span>
   </button>
  )
}

export default AuthSocialButton;
