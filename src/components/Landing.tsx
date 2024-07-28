// components
import Hero from "./LandingComponents/Hero"
import DataStory from "./LandingComponents/DataStory"
import TestimonialCarousel from "./LandingComponents/TestimonialCarousel"
import TextMessagesCTA from "./LandingComponents/TextMessagesCTA"
import Parallax from "./LandingComponents/Parallax"
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
