import { useMemo } from "react"

const usePlayer = (src: string, loop = false) => {
  const audio = useMemo(() => new Audio(src), [src])
  audio.loop = loop
  const play = () => audio.play()
  const pause = () => {
    audio.pause()
    audio.currentTime = 0
  }
  return [play, pause]
}

export default usePlayer