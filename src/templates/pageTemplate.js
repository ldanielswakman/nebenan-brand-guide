import React from "react"
import { graphql, Link } from "gatsby"
import { injectIntl, FormattedMessage } from "gatsby-plugin-intl"
import { Helmet } from "react-helmet"
import { BLOCKS } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"
// import rehypeReact from 'rehype-react'

import Layout from "../components/Layout"
import Sidebar from "../components/Sidebar"
import NextButton from "../components/NextButton"
// import ColourSwatch from "../components/ColourSwatch"

const Template = ({ data, location, pageContext }) => {

  const { allContentfulChapter, contentfulChapter, site } = data
  const chapters = allContentfulChapter.nodes
  const page = contentfulChapter
  const pageUrl = site.siteMetadata.siteUrl + location.pathname
  const meta = {
    title: (page.title + " - " + site.siteMetadata.title),
    link: pageUrl,
    description: site.siteMetadata.description,
    image: page.coverImage ? (page.coverImage.file.url) : ('/images/meta-image.jpg')
  };

  const H3 = ({ children }) => <h3 className="heading4">{children}</h3>
  const H4 = ({ children }) => <h4 className="heading5">{children}</h4>

  const options = {
    renderNode: {
      [BLOCKS.HEADING_3]: (node, children) => <H3>{children}</H3>,
      [BLOCKS.HEADING_4]: (node, children) => <H4>{children}</H4>
    }
  }


  // const renderAst = new rehypeReact({
  //   createElement: React.createElement,
  //   components: {
  //     "colour-swatch": ColourSwatch,
  //   }
  // }).Compiler

  return (
    <Layout page={page.slug}>

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

      <Sidebar chapters={chapters} />

      {page.layout === 'split' && (
        <aside className="panel panel--right">
          <figure className="figure--bg" style={{ backgroundImage: "url('" + page.coverImage.file.url + "')" }}><img src={page.coverImage} alt={page.title} /></figure>
        </aside>
      )}

      <main className={`panel panel--${page.layout === 'split' ? 'left' : 'full'}`}>

        <Link to="/" className="heading-logo">
          <img src="/images/nebenan-monogram.svg" alt="" />
          <h2>{site.siteMetadata.short_name}</h2>
        </Link>


        <h2 className="heading3"><FormattedMessage id="section_1_title" /></h2>
        <h1 className="heading2">{page.title}</h1>

        <div className="page-content">
          {renderRichText(page.content, options)}
        </div>

        {pageContext.next !== null && (
          <NextButton node={pageContext.next} />
        )}

      </main>

    </Layout>
  )
}

export const pageQuery = graphql`
  query pageQuery($slug: String, $locale: String) {
    site {
      siteMetadata {
        title
        short_name
        description
        siteUrl
      }
    }
    contentfulChapter(slug: { eq: $slug }) {
      id
      slug
      title
      node_locale
      section
      layout
      coverImage {
        id
        file {
          url
        }
      }
      content {
        raw
      }
    }
    allContentfulChapter(filter: {node_locale: { eq: $locale } }) {
      nodes {
        title
        slug
        node_locale
        section
        id
      }
    }
  }
`
export default injectIntl(Template)
