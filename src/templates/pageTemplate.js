import React from "react"
import { graphql, Link } from "gatsby"
import { injectIntl, FormattedMessage } from "gatsby-plugin-intl"
import { BLOCKS } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"

import Layout from "../components/Layout"
import Sidebar from "../components/Sidebar"
import NextButton from "../components/NextButton"
import ColourSwatch from "../components/ColourSwatch"
import {useSiteMetadata} from "../hooks/use-site-metadata";
import {Meta} from "../components/Meta/index";

const Template = ({ data, location, pageContext }) => {

  const { allContentfulChapter, contentfulChapter } = data
  const chapters = allContentfulChapter.nodes
  const page = contentfulChapter

  const siteMetadata = useSiteMetadata();

  const options = {
    renderNode: {
      [BLOCKS.HEADING_3]: (node, children) => <h3 className="heading4">{children}</h3>,
      [BLOCKS.HEADING_4]: (node, children) => <h4 className="heading5">{children}</h4>,
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { title, description, file } = node.data.target;
        return (
          <figure className={description}>
            <img src={file.url} alt={title} />
          </figure>
        )
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const { name, colour, description } = node.data.target;
        return <ColourSwatch name={name} colour={colour} description={description} />
      },
    }
  }

  return (
    <Layout page={page.slug}>
      <Sidebar chapters={chapters} />

      {(process.env.NODE_ENV !== "development" && page.underConstruction === true) ? (
        <main className="panel panel--full" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>

          <Link to="/" className="heading-logo">
            <img src="/images/nebenan-monogram.svg" alt="" />
            <h2>{siteMetadata.short_name}</h2>
          </Link>

          <div className="badge-green">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 5.5L26.5 26.5M16 8C9.75068 8 5.0954 14.3762 4.16881 15.7437C4.06156 15.902 4.06156 16.098 4.16881 16.2563C5.0954 17.6238 9.75068 24 16 24C22.2493 24 26.9046 17.6238 27.8312 16.2563C27.9384 16.098 27.9384 15.902 27.8312 15.7437C26.9046 14.3762 22.2493 8 16 8ZM16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11Z" stroke="#201649" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>

          <h2 className="heading2" style={{marginBottom: 0, textAlign: 'center'}}><FormattedMessage id="underconstruction_title" /></h2>
          <p><FormattedMessage id="underconstruction_description" /></p>
          
        </main>
      ): (
        <>

          {page.layout === 'split' && (
            <aside className="panel panel--right">
              <figure className="figure--bg" style={{ backgroundImage: "url('" + page.coverImage.file.url + "')" }}><img src={page.coverImage} alt={page.title} /></figure>
            </aside>
          )}

          <main className={`panel panel--${page.layout === 'split' ? 'left' : 'full'}`}>

            <Link to="/" className="heading-logo">
              <img src="/images/nebenan-monogram.svg" alt="" />
              <h2>{siteMetadata.short_name}</h2>
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
          
        </>
      )}

    </Layout>
  )
}

export const Head = ({ data, location, pageContext }) => {
  const { contentfulChapter } = data
  const page = contentfulChapter
  const siteMetadata = useSiteMetadata();
  const pageUrl = siteMetadata.siteUrl + location.pathname

  const meta = {
    ...siteMetadata,
    title: (page.title + " - " + siteMetadata.title),
    link: pageUrl,
    image: page.coverImage ? (page.coverImage.file.url) : ('/images/meta-image.jpg')
  };
  return <Meta {...meta} />
}

export const pageQuery = graphql`query pageQuery($slug: String, $locale: String) {
  contentfulChapter(slug: {eq: $slug}) {
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
    underConstruction
    content {
      raw
      references {
        ... on ContentfulAsset {
          contentful_id
          __typename
          title
          description
          file {
            url
          }
        }
        ... on ContentfulColourSwatch {
          contentful_id
          name
          colour
          description
        }
      }
    }
  }
  allContentfulChapter(sort: {date: ASC}, filter: {node_locale: {eq: $locale}}) {
    nodes {
      title
      slug
      node_locale
      section
      id
      underConstruction
    }
  }
}`
export default injectIntl(Template)
