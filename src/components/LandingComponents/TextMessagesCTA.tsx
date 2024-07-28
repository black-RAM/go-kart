import logo from "/kart.png"
import notification from "../../assets/notification.mp3"
import { useRef } from "react"
import useObserver from "../../hooks/useObserver"
import usePlayer from "../../hooks/usePlayer"
import ObserverCallback from "../../types/ObserverCallback"

const TextMessagesCTA = () => {
  const ctaRef = useRef<HTMLElement>(null)
  const [playNotification, endNotification] = usePlayer(notification)

  const animateCta: ObserverCallback = (isVisible) => {
    const {current} = ctaRef
    if(!current) return

    if(isVisible) {
      if(!current.classList.contains("animated")) {
        setTimeout(playNotification, 200)
        setTimeout(endNotification, 1600)
        setTimeout(playNotification, 2000)
      }
      current.classList.add("animated")
    } else {
      current.classList.remove("animated")
    }
  }

  useObserver(ctaRef, animateCta, 0.6)

  return (
    <section ref={ctaRef} className="bg-gradient-to-br from-slate-200 to-red-200" id="cta">
      <div className="flex flex-col justify-around px-4 min-h-80 overflow-hidden" style={{backgroundImage: `url(${logo})`}}>
        <p className="text-bubble left">Ready to experience the thrill of seamless online shopping?</p>
        <p className="text-bubble right">Start your engines and shop at GoKart today for unbeatable speed, service, and quality!</p>
      </div>
    </section>
  )
}

export default TextMessagesCTA