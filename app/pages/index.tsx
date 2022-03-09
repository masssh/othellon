/* eslint-disable @next/next/no-img-element */

import Image from "next/image"


const StaticPage = () => {
  return (
    <div>
      <h1>This page is SSG</h1>
      <Image
        src="https://heuristic-babbage-09414e.netlify.app/.netlify/functions/ipx/w_300,h_300/https://3.bp.blogspot.com/-hRiScUsWZHk/VA7mVasETMI/AAAAAAAAmOg/OHTyO2Zjxck/s800/othello_game.png"
        alt="othello"
        width={300}
        height={300}
      />
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {}
  }
}

export default StaticPage
