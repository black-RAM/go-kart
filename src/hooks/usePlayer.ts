import { useEffect, useMemo } from "react"

const usePlayer = (src: string, loop = false) => {
  const audio = useMemo(() => new Audio(src), [src])
  audio.loop = loop

  // Mute the audio when the tab is not open
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        audio.muted = true
      } else {
        audio.muted = false
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  }, [audio])

  const play = () => audio.play()
  
  const pause = () => {
    audio.pause()
    audio.currentTime = 0
  }
  
  return [play, pause]
}

export default usePlayer