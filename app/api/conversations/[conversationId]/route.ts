import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"

interface IParams {
    conversationId?: string
}
export async function DELETE(
    request: Request,
    {params}:{params:IParams} //always second argument
){
    try {
        const {conversationId} = params;
        const currentUser = await getCurrentUser();
        if(!currentUser?.id){
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const existingConversation = await prisma.conversation.findUnique({
            where:{
                id:conversationId
            },
            include:{
                users:true
            }
        });

        if(!existingConversation){
            return new NextResponse("Invalid ID", { status: 400 })
        }

        const deletedConversation = await prisma.conversation.deleteMany({
            where:{
                id:conversationId,
                //authorize the deletion only for the group members or the conversation member
                userIds:{
                    hasSome : [currentUser.id]
                }
            }
        })

        return NextResponse.json(deletedConversation)
    } catch (error:any) {
        console.log(error,'ERROR_CONVERSATION_DELETE')
        return new NextResponse("Internal Error", { status: 500 })
    }
}   