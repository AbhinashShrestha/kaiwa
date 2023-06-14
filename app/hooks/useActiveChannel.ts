import { useEffect, useState } from "react";
import { pusherClient } from "../libs/pusher";
import { Channel, Members } from "pusher-js";
import useActiveList from "./useActiveList";

const useActiveChannel = () => {
  const { set, add, remove } = useActiveList();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChannel;

    if (!channel) {
      channel = pusherClient.subscribe('presence-kaiwa'); //presence is a key word after that it is random whatever you want
      setActiveChannel(channel);
    }

    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      const initialMembers: string[] = [];

      members.each((member: Record<string, any>) => initialMembers.push(member.id)); //use .each to iterate over members as it is a special object
      set(initialMembers); //the member.id is acutally the user email
    });

    channel.bind("pusher:member_added", (member: Record<string, any>) => {
      add(member.id) //added to online list 
    });

    channel.bind("pusher:member_removed", (member: Record<string, any>) => {
      remove(member.id);
    });

    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe('presence-kaiwa');
        setActiveChannel(null);
      }
    }
  }, [activeChannel, set, add, remove]);
}

export default useActiveChannel;