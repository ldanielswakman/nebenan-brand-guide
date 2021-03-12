import React from "react"
import { graphql, Link } from "gatsby"
import { Helmet } from "react-helmet"
import Sidebar from "../components/Sidebar"
import NextButton from "../components/NextButton"
import Layout from "../components/Layout"

export default function Template({data, location, pageContext}) {

    const { markdownRemark, site } = data
    const { frontmatter, html, excerpt } = markdownRemark
    const pageUrl = site.siteMetadata.siteUrl + location.pathname
    const meta = {
      title: (frontmatter.title + " - " + site.siteMetadata.title),
      link: pageUrl,
      description: (excerpt.length > 0 && excerpt.length < 500) ? excerpt : site.siteMetadata.description,
      image: frontmatter.coverimage ? (frontmatter.coverimage) : ('/images/meta-image.jpg')
    };

    return (
        <Layout page={frontmatter.slug}>

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

          <Sidebar />

            {frontmatter.layout === 'split' && (
              <aside className="panel panel--right">
                  <figure className="figure--bg" style={{ backgroundImage: "url('" + frontmatter.coverimage + "')" }}><img src={frontmatter.coverimage} alt={frontmatter.title} /></figure>
              </aside>
            )}
            
            <main className={`panel panel--${frontmatter.layout === 'split' ? 'left' : 'full'}`}>

                <Link to="/" className="heading-logo">
                    <img src="/images/nebenan-monogram.svg" alt="" />
                    <h2>{frontmatter.short_name}</h2>
                </Link>

                <h2 className="heading3">{frontmatter.section} THE BRAND</h2>
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
        short_name
        description
        siteUrl
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      excerpt(format: MARKDOWN)
      frontmatter {
        date(formatString: "DD MMMM YYYY")
        slug
        title
        section
        layout
        coverimage
      }
    }
  }
`
