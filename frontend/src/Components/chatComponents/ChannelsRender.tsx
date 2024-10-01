import axios from "axios";
import { useEffect } from "react";
import { List, ListItemButton, ListItemText } from "@mui/material";
import channelStore from "../../store/channelStore";

interface Channel {
  id: string;
  name: string;
  removable: boolean;
}

const ChannelsRender = ({ token }: { token: string }) => {
  const setNewChannel = channelStore((store) => store.setChannels);
  const getAllChannels = channelStore((store) => store.allChannels);
  const setCurrentChannel = channelStore((store) => store.setCurrentChannel);

  const handleClickChannel = (el: Channel) => {
    setCurrentChannel(el);
  };

  useEffect(() => {
    const requestData = async () => {
      try {
        const response = await axios.get('/api/v1/channels', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNewChannel(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    requestData();
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
            <ListItemButton key={el.id} onClick={() => handleClickChannel(el)}>
              <ListItemText primary={el.name} />
            </ListItemButton>
          ))}
        </List>
      )}
    </>
  );
};

export default ChannelsRender;
