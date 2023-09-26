import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
    const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          short_name
          description
          siteUrl
        }
      }
    }
  `)

    return data.site.siteMetadata
}
