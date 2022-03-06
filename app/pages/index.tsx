
const StaticPage = () => {
  return (
    <h1>This page is SSG</h1>
  )
}

export async function getStaticProps() {
  return {
    props: {}
  }
}

export default StaticPage
