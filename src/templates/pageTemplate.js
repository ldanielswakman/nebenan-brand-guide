import React from "react"
import { graphql, Link } from "gatsby"
import { Helmet } from "react-helmet"

export default function Template({data}) {
    const { markdownRemark } = data
    const { frontmatter, html } = markdownRemark
    return (
        <div className="main">

            <Helmet>
                <meta charSet="utf-8" />
                <title>Nebenan Brand Guide</title>
                <link rel="canonical" href="https://brand-guide.nebenan.de/" />
            </Helmet>

            <aside class="panel panel--right">
                <figure class="figure--bg" style={{ backgroundImage: "url('/images/story.jpg')" }}><img src="/images/story.jpg" alt="" /></figure>
            </aside>

            <main class="panel panel--left">

                <Link to="index.html" class="heading-logo">
                    <img src="/images/nebenan-monogram.svg" alt="" />
                    <h2>Brand Guide</h2>
                </Link>

                <h2 class="heading3">UNDERSTANDING THE BRAND</h2>
                <h1 class="heading2">{frontmatter.title}</h1>

            </main>
            
        </div>
    )
}

export const pageQuery = graphql`
  query($slug: String!) {
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
