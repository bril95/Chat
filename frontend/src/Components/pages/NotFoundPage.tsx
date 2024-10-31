import Particles from '../misc/Particles';
import { Box } from '@mui/material';
import notFoundImage from '../../images/notFoundImage.svg';

const NotFound = (): JSX.Element => {
  return (
    <>
      <div className="not-found-page">
        <div id="particales-js" className="particles"></div>
        <Particles />
        <Box>
          <img
            src={notFoundImage}
            style={{ width: '680px', height: '680px' }}
            alt="Icon not Found"
          />
        </Box>
      </div>
    </>
  );
};

export default NotFound;
