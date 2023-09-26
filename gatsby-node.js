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
  const result = await graphql(`{
  allContentfulChapter(sort: {date: ASC}, limit: 1000) {
    edges {
      node {
        slug
        node_locale
        section
        title
      }
    }
  }
}`)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const chapters = result.data.allContentfulChapter.edges
  chapterArray = [
    chapters.filter(chapter => chapter.node.node_locale == "en"),
    chapters.filter(chapter => chapter.node.node_locale == "de")
  ]

  chapterArray.forEach(chapters => {
    chapters.forEach(({ node }, index) => {
      createPage({
        path: node.section + '/' + node.slug,
        component: pageTemplate,
        context: {
          // additional data can be passed via context
          slug: node.slug,
          next: index === (chapters.length - 1) ? null : chapters[index + 1].node,
          locale: node.node_locale
        },
      })
    })
  })
}
