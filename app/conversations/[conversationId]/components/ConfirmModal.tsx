"use client";

import Modal from "@/app/components/Modal";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
import { Dialog } from "@headlessui/react";
import Button from "@/app/components/Button";

interface ConfirmModalProps{
    isOpen?:boolean,
    onClose:()=>void
}

const ConfirmModal:React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
}) => {
    const router = useRouter();
    const {conversationId} = useConversation();
    const [isLoading,setIsLoading] = useState(false);

    const onDelete = useCallback(()=>{
        setIsLoading(true);
        axios.delete(`/api/conversations/${conversationId}`)
        .then(()=>{
            onClose()
            router.push('/conversations')
            router.refresh();
        })
        .catch(()=>toast.error("Something went Wrong!"))
        .finally(()=>setIsLoading(false))
    },[conversationId, onClose, router])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div
                className="sm:flex sm:items-start"
            >
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-white sm:mx-0 sm:h-10 sm:w-10">
                    <FiAlertTriangle className="h-6 w-6 text-red-600" />
                 </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-base leading-6 font-semibold text-gray-900">
                       Delete Conversation
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Are you sure you want to delete this conversation? All the conversation data will be permanently removed. This action cannot be undone.
                        </p>
                    </div>
                </div>
            </div>
            <div
                className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse"
            >
                <Button
                    disabled={isLoading}
                    danger
                    onClick={onDelete}
                >
                    Delete
                </Button>
                <Button
                    disabled={isLoading}
                    secondary
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    )
}

export default ConfirmModal