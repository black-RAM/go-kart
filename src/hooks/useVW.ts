import { useState, useEffect } from 'react';

// imitate css vw unit
function useVW() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(Math.round(window.innerWidth / 100))
    }

    handleResize()

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  return viewportWidth
}

export default useVW
