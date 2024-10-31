import { useEffect } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { useGetCurrentChannel } from '../../store/channelStoreActions';
import { useGetAllMessages, useSetAllMessages } from '../../store/mesageStoreActions';
import { getMessagesResponse } from '../../services/api/messageApi';

const MessageRender = ({ token }: { token: string }): JSX.Element => {
  const setAllMessages = useSetAllMessages();
  const getAllMessages = useGetAllMessages();
  const currentChannelId = useGetCurrentChannel().id;

  useEffect(() => {
    const requestData = async (): Promise<void> => {
      try {
        const response = await getMessagesResponse();
        setAllMessages(response);
      } catch (error) {
        console.error(error);
      }
    };
    void requestData();
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
              <ListItem key={el.id}>
                <ListItemText primary={`${el.username}: ${el.body}`} />
              </ListItem>
            ))}
        </List>
      )}
    </>
  );
};

export default MessageRender;
