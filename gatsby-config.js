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
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        "excerpt_separator": `<!-- endexcerpt -->`,
        plugins: [
          {
            resolve: `gatsby-remark-component`,
            options: { components: ["colour-swatch"] }
          }
        ],
      }

    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-HV013D124Q",
        ],
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `xs6a8f4kp09q`,
        accessToken: `ZCUXTOEhheivs-pBnxQCoB647aLerSlzUQLP7CKv7Tw`,
      }
    },
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        path: `${__dirname}/src/locales`,
        languages: [`en`, `de`],
        defaultLanguage: `en`,
        redirect: false,
      },
    },
  ],
}
