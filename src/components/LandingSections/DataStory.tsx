import { useEffect, useRef } from "react"
import * as Plot from "@observablehq/plot"
import * as d3 from "d3"
import * as topojson from "topojson-client"
import customerGrowthData from "../../assets/customerGrowth.json"
import productCategories from "../../assets/productCategories.json"
import usaTopology from "../../assets/counties-10m.json"
import marketSharesCSV from "../../assets/broadband_long2000-2018rev.csv?raw"
import useVW from "../../hooks/useVW"

const DataStory = () => {
  const vw = useVW()

  // customer growth area graph
  const customerGrowthGraphRef = useRef<HTMLElement>(null)
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

  // choropleth
  const choroplethRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const marketSharesJSON = d3.csvParse(marketSharesCSV)
    const marketShare2018 = marketSharesJSON.filter(county => +county.year === 2018)
    // const marketShare2018Array = 
    const marketShare2018Map = new Map(marketShare2018.map(({cfips, market_share}) => [cfips, +market_share]))

    // @ts-expect-error because vite imports files as strings
    const counties = topojson.feature(usaTopology, usaTopology.objects.counties)
    // @ts-expect-error because vite imports files as strings
    const states = topojson.feature(usaTopology, usaTopology.objects.states)

    const map = Plot.plot({
      width: 60 * vw,
      projection: "albers-usa",
      marks: [
        Plot.geo(counties, {
          fill: (d) => marketShare2018Map.get(d.id),
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
  }, [vw])

  return (
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
        <h3 className="text-3xl text-center text-slate-100 font-bold capitalize">Nation-wide adoption</h3>
        <figure ref={choroplethRef} className="flex justify-center"></figure>
      </article>

      <article className="col-start-3 row-start-4 bg-zinc-900"></article>
    </section>
  )
}

export default DataStory