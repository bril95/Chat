import axios from "axios";
import { useEffect } from "react";
import { List, ListItemButton, ListItemText } from "@mui/material";
import messageStore from "../../store/messageStore";
import channelStore from "../../store/channelStore";
import { io } from 'socket.io-client';

const socket = io();

const MessageRender = ({ token }: { token: string }) => {
  const setAllMessages = messageStore((store) => store.setMessages);
  const getAllMessages = messageStore((store) => store.allMessages);
  const currentChannelID = channelStore((store) => store.currentChannel.id);
  const setNewMessage = messageStore((store) => store.setNewMessage)

  useEffect(() => {
    const requestData = async () => {
      try {
        const response = await axios.get('/api/v1/messages', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllMessages(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    requestData();
  }, [token, setAllMessages]);

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      setNewMessage(payload)
    });
    return () => {
      socket.off('newMessage')
    };
  },[setNewMessage])

  return (
    <>
      {getAllMessages.length > 0 && (
        <List
          sx={{
            width: '100%',
            position: 'relative',
            overflow: 'auto',
            maxHeight: '100%',
            '& ul': { padding: 0 },
          }}
        >
          {getAllMessages
            .filter((el) => el.channelId === currentChannelID)
            .map((el) => (
            <ListItemButton key={el.id}>
              <ListItemText primary={`${el.username}: ${el.body}`} />
            </ListItemButton>
          ))}
        </List>
      )}
    </>
  );
};

export default MessageRender;
