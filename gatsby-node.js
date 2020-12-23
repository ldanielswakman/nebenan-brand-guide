exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions
    const pageTemplate = require.resolve(`./src/templates/pageTemplate.js`)
    const result = await graphql(`
      {
        allMarkdownRemark(
          sort: { order: ASC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                slug
                title
              }
            }
          }
        }
      }
    `)
    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }

    const chapters = result.data.allMarkdownRemark.edges
    chapters.forEach(({node}, index) => {
      createPage({
        path: node.frontmatter.slug,
        component: pageTemplate,
        context: {
          // additional data can be passed via context
          slug: node.frontmatter.slug,
          next: index === (chapters.length - 1) ? null : chapters[index + 1].node
        },
      })
    })
  }
