import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (
    conversationId:string
) => {
    try {
        const currentUser = getCurrentUser();
    } catch (error:any) {
        return null;
    }

    const conversation = await  prisma.conversation.findUnique({
        where:{
            id: conversationId
        },
        include:{
            users: true
        }
    })
    return conversation
}

export default getConversationById