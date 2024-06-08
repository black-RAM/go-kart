import { useMemo } from "react"

const usePlayer = (src: string) => {
  const audio = useMemo(() => new Audio(src), [src])
  const play = () => audio.play()
  const pause = () => audio.pause()
  return {play, pause}
}

export default usePlayer