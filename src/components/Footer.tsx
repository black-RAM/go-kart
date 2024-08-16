import { FC } from "react"
import facebook from "../assets/facebookLogo.png"
import instagram from "../assets/instagramLogo.png"
import tiktok from "../assets/tiktokLogo.png"
import X from "../assets/xLogo.png"
import "../styles/Footer.css"

const Handle: FC<{platform: string, icon: string}> = ({platform, icon}) => {
  return (
    <a href={"https://" + platform + ".com"} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center gap-4 w-52 h-20 bg-stone-200">
      <img src={icon} alt={platform + "logo"} className="size-8" />
      <p className="tracking-widest">{platform}</p>
    </a>
  )
}

const Footer = () => {
  return <footer>
    <section className="p-6 bg-gradient-to-bl from-blue-800 to-indigo-950 bg-fixed flex flex-col items-center overflow-hidden">
      <hgroup className="relative text-7xl sm:text-8xl md:text-9xl font-bold">
        {/* Overlaying headers to have both text-color gradient and soft shadow */}
        <h2 id="brand-shadow" aria-hidden="true">GoKart</h2>
        <h2 className="absolute top-0 left-0 font-bold bg-gradient-to-bl from-stone-200 to-stone-400 bg-clip-text text-transparent">GoKart</h2>
      </hgroup>

      <ul className="flex flex-wrap gap-3 justify-center my-8 sm:gap-y-20 sm:m-20">
        <li>
          <Handle platform="Facebook" icon={facebook} />
        </li>
        <li>
          <Handle platform="Instagram" icon={instagram} />
        </li>
        <li>
          <Handle platform="TikTok" icon={tiktok} />
        </li>
        <li>
          <Handle platform="X" icon={X} />
        </li>
      </ul>
    </section>

    <section className="bg-slate-900 p-4 text-center">
      <p className="text-slate-400">© Ariel Robert Mutebi 2024</p>
      <a className="text-slate-600 hover:underline" href="https://github.com/black-RAM/go-kart" target="_blank" rel="noopener noreferrer">Source code</a>
    </section>
  </footer>
}

export default Footer