import usePlayer from "../../hooks/usePlayer"
import revving from "../../assets/revving.mp3"

const CarPedal: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [play, pause] = usePlayer(revving)

  return (
    <figure className="grid justify-center">
      {/* pedal spindle */}
      <div className="flex justify-center">
        <div className="bg-stone-400 h-8 w-2"></div>
      </div>
      {/* pedal body */}
      <div className="z-10 relative -top-4 tilt-child-on-hover" onMouseOver={play} onMouseLeave={pause}>
        <div className="w-max p-2 sm:px-4 bg-repeat bg-opacity-75 rounded-sm cursor-pointer rhombus-pattern">
          <div className="backdrop-blur-sm rounded-sm">
            {children}
          </div>
        </div>
      </div>
    </figure>
  )
}

export default CarPedal