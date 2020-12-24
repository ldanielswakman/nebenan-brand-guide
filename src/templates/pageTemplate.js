import React from "react"
import { graphql, Link } from "gatsby"
import { Helmet } from "react-helmet"
import Sidebar from "../components/Sidebar"
import NextButton from "../components/NextButton"
import Layout from "../components/Layout"

export default function Template({data, location, pageContext}) {

    const { markdownRemark, site } = data
    const { frontmatter, html } = markdownRemark
    const pageUrl = site.siteMetadata.siteUrl + location.pathname

    return (
        <Layout page={frontmatter.slug}>

            <Helmet>
                <meta charSet="utf-8" />
                <title>{frontmatter.title} - {site.siteMetadata.title}</title>
                <link rel="canonical" href={pageUrl} />
                <link id="favicon" rel="shortcut icon" href="/images/app-icon.png" />
            </Helmet>

            <Sidebar />

            {frontmatter.layout === 'split' && (
              <aside className="panel panel--right">
                  <figure className="figure--bg" style={{ backgroundImage: "url('" + frontmatter.coverimage + "')" }}><img src={frontmatter.coverimage} alt={frontmatter.title} /></figure>
              </aside>
            )}
            
            <main className={`panel panel--${frontmatter.layout === 'split' ? 'left' : 'full'}`}>

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
            
        </Layout>
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
        layout
        coverimage
      }
    }
  }
`
