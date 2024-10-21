import { useEffect } from 'react';

const Particles = () => {
  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS.load('particles-js', '/particles-config.json');
    }
  }, []);

  return (
    <div
      id="particles-js"
      style={{ width: '100%', height: '100vh', position: 'absolute' }}
    />
  );
};

export default Particles;
