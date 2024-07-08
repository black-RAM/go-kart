import { FC, useRef } from "react"
import customer1 from "../../assets/christian-buehner-DItYlc26zVI-unsplash(1).jpg"
import customer2 from "../../assets/christopher-campbell-rDEOVtE7vOs-unsplash(1).jpg"
import customer3 from "../../assets/petr-sevcovic-e12wQLAjQi0-unsplash(1).jpg"
import customer4 from "../../assets/prince-akachi-4Yv84VgQkRM-unsplash(1).jpg"
import customer5 from "../../assets/prince-akachi-J1OScm_uHUQ-unsplash(1).jpg"
import ObserverCallback from "../../types/ObserverCallback"
import cameraSound from "../../assets/cameraSound.mp3"
import useObserver from "../../hooks/useObserver"
import usePlayer from "../../hooks/usePlayer"

interface TestimonialProps {
  imgUrl: string,
  testimony: string,
  witness: string
}

const Testimonial: FC<TestimonialProps> = ({imgUrl, testimony, witness}) => 
  <li className="bg-rose-800 rounded-sm flex flex-col items-center text-center gap-4 p-4">
    <img src={imgUrl} alt="smiling person" className="size-32 rounded-full" />
    <p className="text-zinc-50">{testimony}</p>
    <p className="text-zinc-100 italic">- {witness}</p>
  </li>

const TestimonialCarousel = () => {
  const [playCamera, endCamera] = usePlayer(cameraSound)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const testimonialSoundRef = useRef<number | null>(null)

  const animateTestimonials: ObserverCallback = (isVisible) => {
    const {current} = testimonialsRef
    if(!current) return
    if(isVisible) {
      if(testimonialSoundRef.current) clearInterval(testimonialSoundRef.current)
      testimonialSoundRef.current = setInterval(() => {
        playCamera()
        setTimeout(endCamera, 1000)
      }, 4000)
      current.classList.add("animated")
    } else {
      if(testimonialSoundRef.current) clearInterval(testimonialSoundRef.current)
      current.classList.remove("animated")
    }
  }

  useObserver(testimonialsRef, animateTestimonials, 1)

  return (
    <section className="bg-gradient-to-b from-indigo-950 to-rose-950 py-4">
      <hgroup className="text-zinc-100 text-center my-4">
        <h3 className="font-light text-2xl">What Our Customers</h3>
        <h2 className="font-bold text-4xl">Are Saying</h2>
      </hgroup>

      <div ref={testimonialsRef} className="relative overflow-hidden" id="testimonials-wrapper">
        <div className="absolute inset-0 z-10 pointer-events-none border-black border-opacity-50" id="testimonials-overlay"></div>
        <ul id="testimonials">
          <Testimonial imgUrl={customer1} testimony="I was skeptical at first, but GoKart exceeded my expectations. Great prices, quality products, and hassle-free returns. Highly recommend!" witness="Michael R." />
          <Testimonial imgUrl={customer2} testimony="GoKart is a game-changer. Amazing variety, detailed descriptions, and top-notch customer service. They've earned my trust!" witness="Emily J." />
          <Testimonial imgUrl={customer3} testimony="Incredible selection and unbeatable prices on GoKart. Easy navigation, fast shipping, and secure payments. I can't shop anywhere else now!" witness="David K." />
          <Testimonial imgUrl={customer4} testimony="GoKart has transformed my online shopping experience! Fast shipping, excellent customer service, and a user-friendly site. My go-to for everything!" witness="Arthur M."/>
          <Testimonial imgUrl={customer5} testimony="Positive experiences all around with GoKart. Great interface, prompt delivery, and excellent product quality. Love it!" witness="Sarah T."/>
        </ul>
      </div>
    </section>
  )
}

export default TestimonialCarousel