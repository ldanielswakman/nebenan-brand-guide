/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `Nebenan Brand Guide`,
    short_name: `Brand Guide`,
    siteUrl: `https://brand-guide.nebenan.de/`,
    description: `Knowing how to communicate the nebenan.de brand — inside the company and outwards.`,
  },
  plugins: [
    `gatsby-plugin-sass`,
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
        accessToken: process.env.CONTENTFUL_TOKEN,
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
    'gatsby-plugin-image',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Nebenan Brand Guide`,
        short_name: `Brand Guide`,
        start_url: `/`,
        background_color: `#b2ca06`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: `static/images/app-icon.png`
      },
    },
    `gatsby-plugin-offline`
  ],
}
