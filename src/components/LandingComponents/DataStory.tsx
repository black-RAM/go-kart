import { useEffect, useRef, useState } from "react"
import * as Plot from "@observablehq/plot"
import * as d3 from "d3"
import * as topojson from "topojson-client"
import customerGrowthData from "../../assets/customerGrowth.json"
import productCategories from "../../assets/productCategories.json"
import usaTopology from "../../assets/counties-10m.json"
import marketSharesCSV from "../../assets/broadband_long2000-2018rev.csv?raw"
import useVW from "../../hooks/useVW"
import clickSound from "../../assets/mouseClick.mp3"
import usePlayer from "../../hooks/usePlayer"

const CustomerGrowth = () => {
  const customerGrowthGraphRef = useRef<HTMLElement>(null)

  // Area graph using Observable Plot
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

  return (
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
  )
}

const CategoryDistribution = () => {
  const vw = useVW()

  // pie chart using D3
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

  return (
    <article className="col-start-3 row-span-3 p-4 bg-blue-950">
      <h3 className="text-zinc-50 font-bold text-xl capitalize text-center">A wealth of product categories</h3>
      <div className="flex flex-wrap justify-center gap-x-4">
        <figure className="relative basis-[max(30vw,256px)] my-8">
          <div id="category-pie-chart"></div>
          <div className="absolute inset-0 grid justify-center items-center">
            <p id="category-pie-chart-legend" className="grid grid-cols-[min-content_1fr] gap-x-1 justify-center text-zinc-400 text-left"></p>
          </div>
        </figure>
        <div className="flex items-center basis-64 grow">
          <p className="text-zinc-200 text-center">Understand the variety of products we offer by exploring the distribution of items across different categories. This breakdown highlights our diverse inventory, ensuring something for everyone.</p>
        </div>
      </div>
    </article>
  )
}

const MarketShareChoropleth = () => {
  const choroplethRef = useRef<HTMLElement>(null)
  const [year, setYear] = useState(2024)
  const vw = useVW()
  const [playClickSound] = usePlayer(clickSound)
  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    playClickSound()
    setYear(Number(e.target.value))
  }

  // Choropleth using Observable Plot
  useEffect(() => {
    const marketSharesJSON = d3.csvParse(marketSharesCSV)
    const currentMarketShare = marketSharesJSON.filter(county => +county.year === (year - 6))
    const currentMarketShareMap = new Map(currentMarketShare.map(({cfips, market_share}) => [cfips, +market_share]))

    // @ts-expect-error because vite imports files as strings
    const counties = topojson.feature(usaTopology, usaTopology.objects.counties)
    // @ts-expect-error because vite imports files as strings
    const states = topojson.feature(usaTopology, usaTopology.objects.states)

    const map = Plot.plot({
      width: 60 * vw,
      projection: "albers-usa",
      marks: [
        Plot.geo(counties, {
          fill: (d) => currentMarketShareMap.get(d.id),
        }),
        Plot.geo(states, {
          stroke: "#f8fafc", // slate-50
          strokeWidth: 0.5,
        })
      ],
      color: {
        scheme: "spectral",
        unknown: "#334155", // slate-700
        type: "linear",
        legend: true,
        label: "% GoKart market share per US county",
        percent: true,
        domain: [0, 100]
      }
    })

    choroplethRef.current?.appendChild(map)
    return () => {
      map.remove()
    }
  }, [vw, year])

  return (
    <article className="col-start-1 col-span-2 row-start-3 row-span-2 p-2 bg-slate-800">
      <h3 className="text-3xl text-center text-slate-100 font-bold capitalize">Nation-wide adoption</h3>
      <figure ref={choroplethRef} className="relative grid justify-center m-2 shadow-lg shadow-slate-900">
        <label className="sm:absolute top-0 right-0 flex justify-center bg-gradient-to-b from-slate-600 to-slate-800 p-2 gap-2 shadow-sm shadow-slate-900 text-xs lg:text-base">
          <input type="range" min={2006} max={2024} value={year} onChange={changeHandler}  className="sm:max-w-[14vw] lg:w-64" />
          <h4 className="bg-gradient-to-b from-slate-500 to-slate-600 shadow-sm shadow-slate-700 p-1 rounded font-bold text-slate-300 w-12 text-center">{year}</h4>
        </label>
        <p className="text-slate-600 order-1 my-2 text-xs sm:text-base text-center">States that are not shaded were not included in the survey.</p>
      </figure>
      <p className="text-center text-slate-200 my-4">Explore our nationwide customer base with this interactive choropleth map, showcasing GoKart's reach across the United States. See how our products have been widely adopted from coast to coast, reflecting our growth and popularity.</p>
    </article>
  )
}

const TotalSales = () => {
  return <article className="col-start-3 row-start-4 bg-black flex flex-wrap items-center justify-center p-4">
    <h4 className="font-black text-white text-9xl underline h-min">1M</h4>
    <p className="text-slate-200 w-32 basis-32 h-min">Sales since we were founded.</p>
  </article>
}

const DataStory = () => 
  <section className="sm:grid grid-rows-[min-content_min-content_1fr_1fr] grid-cols-3">
    <CustomerGrowth />
    <CategoryDistribution />
    <MarketShareChoropleth />
    <TotalSales />
  </section>

export default DataStory