// libraries
import React, { useEffect, useRef } from "react"
import * as Plot from "@observablehq/plot"
import * as d3 from "d3"
import * as topojson from "topojson-client"
// hooks
import usePlayer from "../hooks/usePlayer"
import useObserver from "../hooks/useObserver"
import useVW from "../hooks/useVW"
// types
import ObserverCallback from "../types/ObserverCallback"
// assets
import woosh from "../assets/whoosh.mp3"
import mallBackground from "../assets/mallBackground.jpg"
import cuboids3DArt from "../assets/milad-fakurian-9waPFLIzs1E-unsplash.jpg"
import squarePrisms3DArt from "../assets/milad-fakurian-drqGSDR-IUs-unsplash.jpg"
import customer1 from "../assets/christian-buehner-DItYlc26zVI-unsplash(1).jpg"
import customer2 from "../assets/christopher-campbell-rDEOVtE7vOs-unsplash(1).jpg"
import customer3 from "../assets/petr-sevcovic-e12wQLAjQi0-unsplash(1).jpg"
import customer4 from "../assets/prince-akachi-4Yv84VgQkRM-unsplash(1).jpg"
import customer5 from "../assets/prince-akachi-J1OScm_uHUQ-unsplash(1).jpg"
import notification from "../assets/notification.mp3"
import cameraSound from "../assets/cameraSound.mp3"
import logo from "/kart.png"
import customerGrowthData from "../assets/customerGrowth.json"
import productCategories from "../assets/productCategories.json"
import usaTopology from "../assets/usaTopology.json"
import usaEducation from "../assets/usaEducation.json"
import "../styles/landing.css"

interface TestimonialProps {
  imgUrl: string,
  testimony: string,
  witness: string
}

const Testimonial: React.FC<TestimonialProps> = ({imgUrl, testimony, witness}) => 
  <li className="bg-rose-800 rounded-sm flex flex-col items-center text-center gap-4 p-4">
    <img src={imgUrl} alt="smiling person" className="size-32 rounded-full" />
    <p className="text-zinc-50">{testimony}</p>
    <p className="text-zinc-100 italic">- {witness}</p>
  </li>

const LandingPage = () => {
  const [playWoosh] = usePlayer(woosh)
  const [playNotification, endNotification] = usePlayer(notification)
  const [playCamera, endCamera] = usePlayer(cameraSound)
  const vw = useVW()

  const headerRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const testimonialSoundRef = useRef<number | null>(null)

  const animateHeader: ObserverCallback = (isVisible) => {
    const {current} = headerRef
    if(!current) return
    if(isVisible) {
      if(!current.classList.contains("animated")) setTimeout(playWoosh, 2000)
      current.classList.add("animated")
    } else {
      current.classList.remove("animated")
    }
  }

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

  useObserver(headerRef, animateHeader)
  useObserver(ctaRef, animateCta, 0.6)
  useObserver(testimonialsRef, animateTestimonials, 1)

  const customerGrowthGraphRef = useRef<HTMLElement>(null)

  // customer growth area graph
  useEffect(() => {
    const customerGrowthDataTyped = customerGrowthData.map(({ year, customers, type }) => ({
      year: new Date(year, 0, 1),
      customers,
      type
    }))

    const customerGrowthGraph = Plot.plot({
      y: {grid: true},
      color: {legend: true},
      marks: [
        Plot.areaY(customerGrowthDataTyped, {x: "year", y: "customers", fill: "type", fillOpacity: 0.6}),
      ]
    })
    customerGrowthGraphRef.current?.appendChild(customerGrowthGraph)

    return () => {
      customerGrowthGraph.remove()
    }
  }, [])

  // product-category distribution pie chart
  useEffect(() => {
    const width = Math.max(vw * 30, 256)
    const height = width
    const radius = width / 2
    
    const categories = productCategories.map(cat => cat.category)
    const categoryCounts = productCategories.map(cat => cat.count)
    const productSum = categoryCounts.reduce((a, b) => a + b)
    const categoryPercentages = categoryCounts.map(count => count / productSum * 100)

    // append the svg element
    const pieChartContainer = d3.select("#category-pie-chart")

    const pieChartSvg = pieChartContainer.append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // monochromatic color scale: blue 800 600 200 and 100
    const color = d3.scaleOrdinal().range(["#1e40af", "#2563eb", "#60a5fa", "#bfdbfe"])

    // Compute the position of each group on the pie:
    const arcData = d3.pie()(categoryCounts)

    // shape helper to build arcs:
    const arcGenerator = d3.arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius)

    // Build the pie chart
    pieChartSvg
      .selectAll("sectors")
      .data(arcData)
      .join("path")
        .attr("d", (d) => arcGenerator(d as unknown as d3.DefaultArcObject))
        .attr("fill", (_, i) => color(categories[i]) as string)
        .attr("stroke", "#172554") // blue-950 (same as background)
        .style("stroke-width", "2px")

    // Legend using HTML, grid layout, tailwind, etc because those are more intuitive
    const legend = d3.select("#category-pie-chart-legend")

    legend.style("max-width", `${width * 0.5}px`)

    legend
      .selectAll("series")
      .data(arcData)
      .join("div")
      .style("background-color", (_, i) => String(color(categories[i])))
      .style("grid-row-start", (_, i) => String(i + 1))
      .attr("class", "size-4 col-start-1 mt-1")

    legend
      .selectAll("keys")
      .data(arcData)
      .join("p")
      .text((_, i) => `${categoryPercentages[i]}% - ${categories[i]}`)
      .style("grid-row-start", (_, i) => String(i + 1))
      .attr("class", "col-start-2 text-xs lg:text-sm")

    return () => {
      pieChartContainer.selectAll("svg").remove()
      legend.html("")
    }
  }, [vw])

  // choropleth, copied from my work at: https://codepen.io/black-ram/pen/PoLpLpp
  useEffect(() => {
  const container = d3.select("#choropleth")

  const svg = container
    .append("svg")
    .attr("width", 900)
    .attr("height", 600)

  const pathGenerator = d3.geoPath()
  const map = svg.append("g")

  const color = d3.scaleQuantize()
    .domain(d3.extent(usaEducation.map(county => county["bachelorsOrHigher"])))
    .range(d3.schemeGreens[9])

  const get = (fips, info = "bachelorsOrHigher") => {
    return usaEducation.find(c => c["fips"] == fips)[info]
  }
  
  const geojson = topojson.feature(usaTopology, usaTopology.objects.counties)
  
  map.selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", pathGenerator)
    .attr("fill", d => color(get(d["id"])))
    .attr("class", "county")
    .attr("data-fips", d => d["id"])
    .attr("data-education", d => get(d["id"]))

  // state borders
  svg.append("path")
    .classed("stateBorder", true)
    .attr("fill", "none")
    .attr("stroke", "black")
    .datum(topojson.mesh(usaTopology, usaTopology.objects.states), (a, b) => a !== b)
    .attr('d', pathGenerator)

  return () => {
    container.html("")
  }
  }, [vw])

  return (
    <main>
      <header ref={headerRef} className="grid grid-cols-2 bg-center bg-cover" id="header-wrapper" style={{backgroundImage: `url(${mallBackground})`}}>
        <div className="overflow-hidden">
          <div id="header-container" className="h-full w-full flex items-center p-8 backdrop-blur">
            <h1 className="text-9xl text-right font-black uppercase">Let's Go Kart!</h1>
          </div>
        </div>

        <div className="relative overflow-hidden flex items-end">
          <div id="welcome-container" className="bg-zinc-50 bg-opacity-80 rounded-tr w-3/4 p-4 backdrop-blur-sm">
            <h2 className="text-3xl w-max p-2 font-bold text-slate-900 bg-zinc-50 shadow">Welcome to GoKart</h2>
            <p className="mt-2 text-lg font-semibold text-slate-800">
              Envision shopping as visceral as a 200 miles per hour race! Imagine the scent of fresh leather, the sound of engines roaring, and the sight of sleek, shiny products zooming into your cart. Our deals are as sweet as victory champagne, and our variety as wide as a racetrack. Ready to put the pedal to the metal? Buckle up, because at GoKart, we turn every shopping spree into a Grand Prix of savings and smiles!
            </p>
          </div>
        </div>
      </header>

      <section className="h-96 bg-fixed bg-cover bg-center" style={{backgroundImage: `url(${cuboids3DArt})`}}></section>

      <section className="sm:grid grid-rows-[min-content_min-content_1fr_1fr] grid-cols-3">
        <article className="row-span-2 col-span-2 bg-zinc-100 text-zinc-800 p-2">
          <h2 className="text-5xl font-black uppercase">Here are the <b className="text-blue-800">facts</b></h2>
          <div className="grid lg:grid-cols-[75%_25%] xl:grid-cols-[640px_1fr]">
            <figure ref={customerGrowthGraphRef}></figure>
            <div className="flex flex-col justify-center p-4">
              <h3 className="text-lg capitalize underline">Unprecedented customer <b>growth</b></h3>
              <p>Our customer base has surged from zero to 25,000 in just 20 years. Join thousands of satisfied shoppers and experience why GoKart is the go-to destination for all your needs.</p>
            </div>
          </div>
        </article>

        <article className="col-start-3 row-span-3 p-4 bg-blue-950">
          <h3 className="text-zinc-50 font-bold text-xl capitalize text-center">A wealth of product categories</h3>
          <div className="flex flex-wrap justify-center gap-x-4">
            <figure className="relative basis-[max(30vw,256px)] my-8">
              <div id="category-pie-chart"></div>
              <div className="absolute inset-0 grid justify-center items-center">
                <caption id="category-pie-chart-legend" className="grid grid-cols-[min-content_1fr] gap-x-1 justify-center text-zinc-400 text-left"></caption>
              </div>
            </figure>
            <div className="flex items-center basis-64 grow">
              <p className="text-zinc-200 text-center">Understand the variety of products we offer by exploring the distribution of items across different categories. This breakdown highlights our diverse inventory, ensuring something for everyone.</p>
            </div>
          </div>
        </article>

        <article className="col-start-1 col-span-2 row-start-3 row-span-2 p-2 bg-slate-800">
          <h3 className="text-3xl text-slate-100 font-bold capitalize">Nation-wide adoption</h3>
          <figure id="choropleth"></figure>
        </article>

        <article className="col-start-3 row-start-4 bg-zinc-900"></article>
      </section>
      
      <section className="h-96 bg-fixed bg-cover bg-center" style={{backgroundImage: `url(${squarePrisms3DArt})`}}></section>

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

      <section ref={ctaRef} className="bg-gradient-to-br from-slate-200 to-red-200" id="cta">
        <div className="flex flex-col justify-around px-4 min-h-80 overflow-hidden" style={{backgroundImage: `url(${logo})`}}>
          <p className="text-bubble left">Ready to experience the thrill of seamless online shopping?</p>
          <p className="text-bubble right">Start your engines and shop at GoKart today for unbeatable speed, service, and quality!</p>
        </div>
      </section>
    </main>
  )
}

export default LandingPage
