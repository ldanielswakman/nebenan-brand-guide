// pages folder
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  deletePage(page)
  // You can access the variable "locale" in your page queries now
  createPage({
    ...page,
    context: {
      ...page.context,
      locale: page.context.intl.language,
    },
  })
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const pageTemplate = require.resolve(`./src/templates/pageTemplate.js`)
  const result = await graphql(`
      {
        allContentfulChapter {
          edges {
            node {
              path
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

  const chapters = result.data.allContentfulChapter.edges
  chapters.forEach(({ node }, index) => {
    createPage({
      path: node.path,
      component: pageTemplate,
      context: {
        // additional data can be passed via context
        slug: path,
        next: index === (chapters.length - 1) ? null : chapters[index + 1].node
      },
    })
  })
}
