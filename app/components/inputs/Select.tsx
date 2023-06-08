"use client";
import  ReactSelect from "react-select"; 

interface SelectProps {
    label:string,
    value?: Record<string,any>,
    onChange:(value:Record<string,any>)=>void,
    options:Record<string,any>[],
    disabled?:boolean
}

const Select:React.FC<SelectProps> = ({
    label,
    value,
    onChange,
    options,
    disabled
}) => {
  return (
    <div
        className="z-[100]"
    >
        <label
            className="block text-sm font-medium leading-6 text-black"
        >
            {label}
        </label>
        <div className="mt-2">
            <ReactSelect 
                isDisabled={disabled}
                value={value}
                onChange={onChange}
                isMulti
                options={options}
                menuPortalTarget={document.body} //to not cause overflow since we are using select inside a modal 
                styles={{
                    menuPortal: (base) => ({
                        ...base,
                        zIndex: 9999,//scroll 9999 friends
                    })
                }}
                classNames={{
                    control:() => "text-sm"
                }}
            />
        </div>  
    </div>
  )
}

export default Select