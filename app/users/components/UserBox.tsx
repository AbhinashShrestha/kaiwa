'use client';

import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

interface UserBoxProps {
    data: User
}

export default async function UserBox({data}:UserBoxProps) {
    const router = useRouter();
    const [isLoading,setIsLoading] = useState(false);

    const handleClick = useCallback(()=>{
        setIsLoading(true)

        //get the conversation of the specific people we clicked on
        axios.post('/api/conversations',{
            userId: data.id
        })
        .then((data)=>{
            router.push(`/conversations/${data.data.id}`);
        })
        .finally(()=>setIsLoading(false))
    },[data,router])
    return (
        <div
            onClick={handleClick}
            className="
                w-full
                relative
                flex
                items-center
                space-x-3
                bg-teal-100
                p-3
                hover:bg-teal-400
            "
        >
            <Avatar user={data}/>
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none" >
                    <div
                        className="
                            flex
                            justify-between
                            items-center
                            mb-1
                        "
                    >
                        <p className="text-sm font-medium text-gray-900">
                            {data.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}