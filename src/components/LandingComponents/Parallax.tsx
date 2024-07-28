import { FC } from "react"

const Parallax: FC<{img: string}> = ({img}) => 
  <section className="h-96 bg-fixed bg-cover bg-center" style={{backgroundImage: `url(${img})`}}></section>

export default Parallax