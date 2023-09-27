import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/Layout"
import Sidebar from "../components/Sidebar"
import NextButton from "../components/NextButton"

export default function NotFound({data}) {

  const { allContentfulChapter, site } = data
  const chapters = allContentfulChapter.nodes
  const MESSAGES = [
    "We seem to have reached a dead end",
    "Hmm... something went wrong",
    "This courtyard doesn't exist",
    "Looking for another building?"
  ];
  const randomMessage = MESSAGES[Math.floor(Math.random()*MESSAGES.length)];

  return (
    <Layout page="404">

      <Sidebar chapters={chapters} />

      <main className="panel panel--full">

        <Link to="/" className="heading-logo">
            <img src="/images/nebenan-monogram.svg" alt="" />
            <h2>{site.siteMetadata.short_name}</h2>
        </Link>

        <br />
        <h1 className="heading2" style={{marginBottom: "1rem"}}>{randomMessage}</h1>
        <h2 className="heading3">The page you are looking for could not be found.</h2>

        <p style={{maxWidth: "40rem"}}>Maybe it's us, maybe it's you... happens to everyone from time to time. But we can fix this! Turn to the navigation menu to select your topic, or simply return home:</p>

        <br /><br />

        <NextButton />

      </main>

    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        short_name
        description
        siteUrl
      }
    }
    allContentfulChapter(filter: {node_locale: { eq: "en" } }) {
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
