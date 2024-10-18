import axios from "axios";
import { useEffect } from "react";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { useGetCurrentChannel } from "../../store/channelStoreActions";
import { useGetAllMessages, useSetAllMessages } from "../../store/mesageStoreActions";

const MessageRender = ({ token }: { token: string }) => {
  const setAllMessages = useSetAllMessages();
  const getAllMessages = useGetAllMessages();
  const currentChannelId = useGetCurrentChannel().id;

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
            .filter((el) => el.channelId === currentChannelId)
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
