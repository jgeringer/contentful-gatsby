const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post-contentful.js`)
  const result = await graphql(
    `
      {
        allContentfulPost {
          edges {
            node {
              slug
              title
              id
              contentful_id
              node_locale
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allContentfulPost.edges

  posts.forEach((post, index) => {
    // We need a common ID to cycle between locales.
    const commonId = post.node.contentful_id
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      // path: post.node.slug,
      path: `/${post.node.node_local}/${post.node.slug}`,
      component: blogPost,
      context: {
        slug: post.node.slug,
        previous,
        next,
        id: post.node.id,
        contentful_id: post.node.contentful_id
      },
    })
  })
}
