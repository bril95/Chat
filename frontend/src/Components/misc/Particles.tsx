import { useEffect } from 'react';

declare global {
  interface Window {
    particlesJS: {
      load: (id: string, path: string, callback?: () => void) => void;
    };
  }
}

const Particles = (): JSX.Element => {
  useEffect(() => {
    if (typeof window.particlesJS !== 'undefined') {
      window.particlesJS.load('particles-js', '/particles-config.json');
    }
  }, []);

  return <div id="particles-js" style={{ width: '100%', height: '100vh', position: 'absolute' }} />;
};

export default Particles;
