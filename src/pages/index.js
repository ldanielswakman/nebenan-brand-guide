import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../components/Layout"
import Menu from "../components/Menu"
import LangSwitcher from "../components/LangSwitcher"

export default function Home({ data }) {

  const meta = {
    title: data.site.siteMetadata.title,
    link: data.site.siteMetadata.siteUrl,
    description: data.site.siteMetadata.description,
    image: '/images/meta-image.jpg'
  };

  return (
    <Layout page="home">

      <Helmet>
        <meta charSet="utf-8" />
        <title>{meta.title}</title>
        <link rel="canonical" href={meta.link} />
        <link id="favicon" rel="shortcut icon" href="/images/app-icon.png" />
        <meta name="description" content={meta.description} />
        <meta name="keywords" content="" />
        <meta name="author" content="L Daniel Swakman, https://sincere.studio" />

        <meta property="og:image" content={meta.image} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ldanielswakman" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Helmet>

      <aside className="panel panel--home-cover">
        <figure className="figure--bg" style={{ backgroundImage: "url('/images/home-bg.jpg')" }}><img src="/images/home-bg.jpg" alt="" /></figure>
      </aside>

      <main className="panel panel--home-main">

        <section className="intro-group">

          <img src="/images/nebenan-monogram.svg" alt="Brand Guide" />
          <h1 className="heading1">{data.site.siteMetadata.short_name}</h1>
          <blockquote><p>{data.site.siteMetadata.description}</p></blockquote>

          {data.allContentfulChapter.nodes.map(post => {
            return (
              <div key={post.id}>{post.title}</div>
            )
          })}

          <LangSwitcher />

        </section>

        <Menu home={true} />

      </main>
    </Layout>
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
    allContentfulChapter {
      nodes {
        id
        title
        node_locale
      }
    } 
  }
`
