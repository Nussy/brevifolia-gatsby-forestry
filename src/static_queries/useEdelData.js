import { graphql, useStaticQuery } from "gatsby"

export default function useEdelData() {
  const data = useStaticQuery(graphql`
    query getEdelData {
      allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }, filter: {fields: {sourceName: {eq: "edels"}}}) {
        edges {
          node {
            id
            frontmatter {
              title
              repeater {
                img
                repeat_1
                temp_img
              }
              edel_block {
                block_image
                tile_image
              }
            }
            excerpt(pruneLength: 200)
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  return data.allMarkdownRemark.edges
}