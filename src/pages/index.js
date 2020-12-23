import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import Menu from "../components/menu"
import LangSwitcher from "../components/lang-switcher"

export default function Home({data}) {
  console.log(data);
  return (
    <div className="main main--half">

      <Helmet>
        <meta charSet="utf-8" />
        <title>Nebenan Brand Guide</title>
        <link rel="canonical" href={data.site.siteMetadata.siteUrl} />
      </Helmet>

      <aside className="panel panel--home-cover">
        <figure className="figure--bg" style={{ backgroundImage: "url('/images/home-bg.jpg')" }}><img src="/images/home-bg.jpg" alt="" /></figure>
      </aside>

      <main className="panel panel--home-main">

        <section className="intro-group">

          <img src="/images/nebenan-monogram.svg" alt="Brand Guide" />
          <h1 className="heading1">Brand Guide</h1>
          <blockquote><p>{data.site.siteMetadata.description}</p></blockquote>

          <LangSwitcher />

        </section>

        <Menu home={true} />

      </main>
    </div>
  )
}

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        description
        siteUrl
      }
    }
    allSitePage(sort: {fields: path, order: ASC}) {
      edges {
        node {
          id
          path
        }
      }
    } 
  }
`
