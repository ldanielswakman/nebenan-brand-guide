import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import Menu from "../components/Menu"
import LangSwitcher from "../components/LangSwitcher"

export default function Home({data}) {
  // const chapters = data.allMarkdownRemark.edges;
  return (
    <div className="main">

      <Helmet>
        <meta charSet="utf-8" />
        <title>{data.site.siteMetadata.title}</title>
        <link rel="canonical" href={data.site.siteMetadata.siteUrl} />
        <link id="favicon" rel="shortcut icon" href="/images/app-icon.png" />
      </Helmet>

      <aside className="panel panel--home-cover">
        <figure className="figure--bg" style={{ backgroundImage: "url('/images/home-bg.jpg')" }}><img src="/images/home-bg.jpg" alt="" /></figure>
      </aside>

      <main className="panel panel--home-main">

        <section className="intro-group">

          <img src="/images/nebenan-monogram.svg" alt="Brand Guide" />
          <h1 className="heading1">{data.site.siteMetadata.short_name}</h1>
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
        title
        short_name
        description
        siteUrl
      }
    }
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            slug
            title
            section
          }
        }
      }
    } 
  }
`
