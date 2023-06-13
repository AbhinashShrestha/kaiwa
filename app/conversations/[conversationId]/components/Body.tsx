"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface BodyProps {
  initialMessages: FullMessageType[]
}

const Body:React.FC<BodyProps> = ({
  initialMessages
}) => {
  const [messages,setMessages]=useState(initialMessages); 

  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(()=>{
    axios.post(`/api/conversations/${conversationId}/seen`)
  },[conversationId])

  useEffect(()=>{
    pusherClient.subscribe(conversationId)
    //anyone who is listening to this conversationId channel will receive the event i.e the realtime messafe
    bottomRef?.current?.scrollIntoView()

    const messageHandler = (message:FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`)
      //when a new message is received, we want to alert everyone that a new message has been seen
      setMessages((current)=>{
        if(find(current,{id:message.id})){ //remove duplicate messages
          return current;
        }
        return [...current,message]
      });
      bottomRef?.current?.scrollIntoView()
    }

    const updateMessageHandler = (newMessage:FullMessageType) => {
      setMessages((current)=> current.map((currentMessage)=>{
        if(currentMessage.id === newMessage.id){
          return newMessage
        }
        return currentMessage;
      }))
    }

    //expect key messages:new
    pusherClient.bind('messages:new', messageHandler);//for messages

    pusherClient.bind('message:update', updateMessageHandler); //for seen

    return ()=>{
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new',messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }

  },[conversationId])

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message,i)=>(
        <MessageBox 
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" /> 
    </div>
  )
}

export default Body