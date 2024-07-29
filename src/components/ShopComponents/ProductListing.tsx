import { useState, useRef, useEffect } from "react"
import useVW from "../../hooks/useVW"
import Product from "../../types/Product"
import ProductCard from "./ProductCard"

const ProductListing: React.FC<{products: Product[]}> = ({products}) => {
  const [overflows, setOverflows] = useState(false)
  const [xOffset, setXOffset] = useState(0)
  const carousel = useRef<HTMLDivElement | null>(null)
  const translateIntervalRef = useRef(0)
  const isTranslationForwardsRef = useRef(true)
  const [isEndOfTrack, setIsEndOfTrack] = useState(false)
  const vw = useVW()

  useEffect(() => {
    const {current} = carousel
    if(current) setOverflows(current.clientWidth > (100 * vw))
  }, [vw])

  useEffect(() => {
    const {current} = carousel
    if(!current) return
    const {clientWidth} = current
    setIsEndOfTrack(Math.abs(xOffset) > (clientWidth - 100 * vw + 80))
  }, [vw, xOffset])

  const startTranslateForwards = () => {
    isTranslationForwardsRef.current = true
    translateIntervalRef.current = setInterval(() => {
      setXOffset(x => x - 4)
    }, 16) // 60 FPS
  }

  const startTranslateBackwards = () => {
    isTranslationForwardsRef.current = false
    translateIntervalRef.current = setInterval(() => {
      setXOffset(x => x + 4)
    }, 16)
  }

  const endTranslate = () => {
    if(translateIntervalRef.current) clearInterval(translateIntervalRef.current)
  }

  useEffect(() => {
    if(isTranslationForwardsRef.current) {
      if(isEndOfTrack) endTranslate()
    } else {
      if(xOffset >= 0) endTranslate()
    }
  }, [isEndOfTrack, xOffset, isTranslationForwardsRef])

  return (
    <div className="overflow-hidden relative">
      {overflows && (
        <div className="absolute left-0 top-0 z-20 h-full w-12 py-4">
          <button onMouseDown={startTranslateBackwards} onMouseUp={endTranslate} onTouchEnd={startTranslateBackwards} onTouchCancel={endTranslate} className="bg-slate-900 shadow shadow-neutral-800 bg-opacity-95 h-full w-full flex justify-center items-center hide-when-disabled" disabled={xOffset >= 0} title="scroll left">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="fill-white size-8">
              <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
            </svg>
          </button>
        </div>
      )}
      <div className="flex w-max gap-4 py-4" style={{transform: `translateX(${xOffset}px)`}} ref={carousel}>
        {products.map(product => <ProductCard p={product} />)}
      </div>
      {overflows && (
        <div className="absolute right-0 top-0 z-20 h-full w-12 py-4">
          <button onMouseDown={startTranslateForwards} onMouseUp={endTranslate} onTouchEnd={startTranslateForwards} onTouchCancel={endTranslate} disabled={isEndOfTrack} className="bg-slate-900 shadow shadow-neutral-800 bg-opacity-95 h-full w-full flex justify-center items-center hide-when-disabled" title="scroll right">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="fill-white size-8">
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductListing