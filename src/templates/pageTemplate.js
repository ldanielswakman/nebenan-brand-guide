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
        const { name, colour } = node.data.target;
        return <ColourSwatch name={name} colour={colour} />
      },
    }
  }

  return (
    <Layout page={page.slug}>
      <Sidebar chapters={chapters} />

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

export const pageQuery = graphql`
  query pageQuery($slug: String, $locale: String) {
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
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            title
            description
            file {
              url
            }
            fixed(width: 1600) {
              src
            }
          }
          ... on ContentfulColourSwatch {
            contentful_id
            name
            colour
          }
        }
      }
    }
    allContentfulChapter(
      sort: { order: ASC, fields: [date] }
      filter: {node_locale: { eq: $locale } }
    ) {
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
