const path = require("path")

module.exports.onCreateNode = ({ node, actions, getNode }) => {
  // Transform the new node here and create a new node or
  // create a new node field.
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = path.basename(node.fileAbsolutePath, ".md")
    const parent = getNode(node.parent);

    if (parent.internal.type === "File") {
      createNodeField({
        name: `sourceName`,
        node,
        value: parent.sourceInstanceName
      });

      createNodeField({
        node,
        name: "slug",
        value: slug,
      })
    } else {
      createNodeField({
        //same as node: node
        node,
        name: "slug",
        value: slug,
      })
    }
  }
}

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  //dynamically create pages here
  //get path to template
  const blogTemplate = path.resolve("./src/templates/blog.js")
  //get slugs
  const response = await graphql(`
    query {
      allMarkdownRemark(filter: {fields: {sourceName: {eq: "posts"}}}) {
        edges {
          node {
            fields {
              slug
              sourceName
            }
          }
        }
      }
    }
  `)
  //create new pages with unique slug
  response.data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
      component: blogTemplate,
      path: `/blog/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug,
        type: edge.node.fields.sourceName
      },
    })
  })

  //get path to template
  const edelTemplate = path.resolve("./src/templates/edel.js")
  //get slugs
  const edelResponse = await graphql(`
    query {
      allMarkdownRemark(filter: {fields: {sourceName: {eq: "edels"}}}) {
        edges {
          node {
            fields {
              slug,
              sourceName
            }
          }
        }
      }
    }
  `)
  //create new pages with unique slug
  edelResponse.data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
      component: edelTemplate,
      path: `/edel/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug,
        type: edge.node.fields.sourceName
      },
    })
  })
}
