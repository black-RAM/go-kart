import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useRouteError } from "react-router-dom"
import wallpaper from "../assets/ivan-bonadeo-qa1QZOFPmdI-unsplash.jpg"
import "../styles/404.css"

interface ErrorObject {
  status: number
}

const Error404 = () => {
  const error = useRouteError() as ErrorObject
  const [secondsToRedirect, setSecondsToRedirect] = useState(10)
  const countdownRef = useRef<number | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    countdownRef.current = setInterval(() => {
      setSecondsToRedirect(s => Math.max(s - 1, 0))
    }, 1000)
    return () => {
      clearInterval(countdownRef.current as number)
    }
  }, [])

  useEffect(() => {
    if(secondsToRedirect <= 0) navigate("/")
  }, [secondsToRedirect, navigate])

  return (
    <main className="h-dvh bg-center bg-cover p-8" id="error-element" style={{backgroundImage: `url(${wallpaper})`}}>
      <h2 className="font-mono text-xl text-gray-400">{error.status}</h2>
      <h1 className="font-black text-8xl mb-8" style={{textShadow: "-4px 4px #9ca3af"}}>Hey Racer,</h1>
      <div className="backdrop-blur max-w-max p-4 rounded grid gap-4 bg-[#9ca3af80] sm:bg-transparent">
        <p className="text-gray-200 sm:text-gray-600 text-2xl sm:text-4xl">Looks like you've gone off-track.</p>
        <Link to="/">Get back in the race!</Link>
        <p className="font-mono text-xl text-gray-400">Redirect in {secondsToRedirect}s</p>
      </div>
    </main>
  )
}

export default Error404