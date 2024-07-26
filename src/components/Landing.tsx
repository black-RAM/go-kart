// components
import Hero from "./LandingSections/Hero"
import DataStory from "./LandingSections/DataStory"
import TestimonialCarousel from "./LandingSections/TestimonialCarousel"
import TextMessagesCTA from "./LandingSections/TextMessagesCTA"
import Parallax from "./LandingSections/Parallax"
// assets
import cuboids3DArt from "../assets/milad-fakurian-9waPFLIzs1E-unsplash.jpg"
import squarePrisms3DArt from "../assets/milad-fakurian-drqGSDR-IUs-unsplash.jpg"
import "../styles/Landing.css"

const LandingPage = () => 
  <main>
    <Hero />
    <Parallax img={cuboids3DArt} />
    <DataStory />
    <Parallax img={squarePrisms3DArt} />
    <TestimonialCarousel />
    <TextMessagesCTA />
  </main>

export default LandingPage
