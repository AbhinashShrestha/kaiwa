import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"

export async function POST(
    request:Request
){
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            userId,
            isGroup,
            members,
            name
        } = body;

        if(!currentUser?.id || !currentUser?.email){
            return new NextResponse('Unauthorized',{status:401})
        }

        //group chat logic 
        if(isGroup && (!members ||members.length < 2 || !name )){
            return new NextResponse('Invalid data',{status: 400})
        }

        if(isGroup){
            const newConversation = await prisma.conversation.create({
                data:{
                    name,
                    isGroup,
                    users : {
                        connect : [ //add the members to the group
                            ...members.map((member:{value : string })=>({
                                id:member.value
                            })),
                            {
                                id: currentUser.id
                            }
                        ]
                    }
                },
                include : { //a way in prisma to populate fields 
                    users: true
                }
            });
            return NextResponse.json(newConversation)
        }
        //one on one chat logic 
        const existingConversations = await prisma.conversation.findMany({
            where : {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id,userId]
                        }
                    },
                    {
                        userIds: { //this will prevent from two conversation with the same person being created
                            equals: [userId,currentUser.id]
                        }
                    }
                ]
            }
        });

        const singleConversation = existingConversations[0];
        if(singleConversation){ //if there is already a conversation then just return than
            return NextResponse.json(singleConversation);
        }

        const newConversation = await prisma.conversation.create({//create a new one if there is no previous conversations
            data:{
                users: {
                    connect: [
                        {
                            id:currentUser.id //user 
                        },
                        { 
                            id:userId  // person the user want to converse
                        }
                    ]
                }
            },
            include : {
                users: true //doing this gives us access to all the properties of the user
            }
        }) ;
        return NextResponse.json(newConversation);


    } catch (error:any) {
        return new NextResponse('Internal Error',{status:500})
    }
}