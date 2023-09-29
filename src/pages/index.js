import React from "react"
import { graphql } from "gatsby"
import { injectIntl, FormattedMessage } from "gatsby-plugin-intl"

import Layout from "../components/Layout"
import Menu from "../components/Menu"
import LangSwitcher from "../components/LangSwitcher"
import {useSiteMetadata} from "../hooks/use-site-metadata";
import {Meta} from "../components/Meta/index";

const IndexPage = ({ data }) => {

  const chapters = data.allContentfulChapter.nodes
  return (
    <Layout page="home">

      <aside className="panel panel--home-cover">
        {/* <figure className="figure--bg" style={{ backgroundImage: "url('/images/home-bg.jpg')" }}>
            <img src="/images/home-bg.jpg" alt="" />
        </figure> */}
      </aside>

      <main className="panel panel--home-main">

        <section className="intro-group">

          <img src="/images/nebenan-monogram.svg" alt="Brand Guide" />
          <h1 className="heading1"><FormattedMessage id="short_name" /></h1>
          <blockquote><p><FormattedMessage id="description" /></p></blockquote>

          <LangSwitcher />

        </section>

        <Menu chapters={chapters} home={true} />

      </main>
    </Layout>
  )
}

export const Head = () => {
    const siteMetadata = useSiteMetadata();

    const meta = {
        title: siteMetadata.title,
        link: siteMetadata.siteUrl,
        description: siteMetadata.description,
        image: '/images/meta-image.jpg'
    }

    return <Meta {...meta} />
}

export const query = graphql`query HomePageQuery($locale: String) {
  allContentfulChapter(filter: {node_locale: {eq: $locale}}, sort: {date: ASC}) {
    nodes {
      title
      slug
      node_locale
      section
      id
    }
  }
}`
export default injectIntl(IndexPage)
