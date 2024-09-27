import axios from "axios";
import { useEffect, useState } from "react";
import { List, ListItem, ListItemText } from "@mui/material";

interface Channel {
  id: string;
  name: string;
  removable: boolean;
}

const ChannelsRender = ({ token }: { token: string }) => {

  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const requestData = async () => {
      const response = await axios.get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setChannels(response.data);
    };
    requestData()
  }, [token]);

  return (
    <>
      {channels.length > 0 && (
        <List
        sx={{
          width: '100%',
          maxWidth: 360,
          position: 'relative',
          overflow: 'auto',
          maxHeight: 300,
          '& ul': { padding: 0 },
        }}
        >
          {channels.map((el) => (
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