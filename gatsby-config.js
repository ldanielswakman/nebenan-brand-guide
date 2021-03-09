/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Nebenan Brand Guide`,
    short_name: `Brand Guide`,
    siteUrl: `https://brand-guide.nebenan.de/`,
    description: `Knowing how to communicate the nebenan.de brand — inside the company and outwards.`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-HV013D124Q",
        ],
      },
    },
  ],
}
