import React from "react"
import { graphql, Link } from "gatsby"
import { Helmet } from "react-helmet"
import Sidebar from "../components/Sidebar"
import NextButton from "../components/NextButton"

export default function Template({data, location, pageContext}) {

    const { markdownRemark, site } = data
    const { frontmatter, html } = markdownRemark
    const pageUrl = site.siteMetadata.siteUrl + location.pathname

    return (
        <div className="main">

            <Helmet>
                <title>{frontmatter.title} - {site.siteMetadata.title}</title>
                <link rel="canonical" href={pageUrl} />
            </Helmet>

            <Sidebar />

            <aside className="panel panel--right">
                <figure className="figure--bg" style={{ backgroundImage: "url('/images/story.jpg')" }}><img src="/images/story.jpg" alt="" /></figure>
            </aside>
            
            <main className="panel panel--left">

                <Link to="/" className="heading-logo">
                    <img src="/images/nebenan-monogram.svg" alt="" />
                    <h2>Brand Guide</h2>
                </Link>

                <h2 className="heading3">UNDERSTANDING THE BRAND</h2>
                <h1 className="heading2">{frontmatter.title}</h1>

                <div
                    className="page-content"
                    dangerouslySetInnerHTML={{ __html: html }}
                    />

                {pageContext.next !== null && (
                  <NextButton node={pageContext.next} />
                )}

            </main>
            
        </div>
    )
}

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "DD MMMM YYYY")
        slug
        title
      }
    }
  }
`
