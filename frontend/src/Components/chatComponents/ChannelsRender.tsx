import axios from "axios";
import { useEffect } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import channelStore from "../../store/channelStore";

const ChannelsRender = ({ token }: { token: string }) => {

  const setNewChannel = channelStore((store) => store.setChannels);
  const getAllChannels = channelStore((store) => store.allChannels);

  useEffect(() => {
    const requestData = async () => {
      const response = await axios.get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setNewChannel(response.data)
    };
    requestData()
  }, [token, setNewChannel]);

  return (
    <>
      {getAllChannels.length > 0 && (
        <List
        sx={{
          width: '100%',
          maxWidth: 360,
          position: 'relative',
          overflow: 'auto',
          maxHeight: '100%',
          '& ul': { padding: 0 },
        }}
        >
          {getAllChannels.map((el) => (
             <ListItem key={el.id}>
              <ListItemText primary={el.name} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default ChannelsRender;