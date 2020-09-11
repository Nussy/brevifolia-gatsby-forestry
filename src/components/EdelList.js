import React from "react"
import { Link } from "gatsby"
import useEdelData from "../static_queries/useEdelData"
import blogListStyles from "../styles/components/bloglist.module.scss"
import Img from 'gatsby-image'

export default function BlogList() {
  const edelData = useEdelData()
  function renderEdelData() {
    return (
      <div>
        {edelData
          .filter(post => post.node.frontmatter.title !== "")
          .map(post => {
            return (
              <Link to={`/edel/${post.node.fields.slug}`} key={post.node.id}>
                <li className={blogListStyles.li} key={post.node.fields.slug}>
                  <div className={blogListStyles.list__hero}>
                    {/* <Img
                      fluid={
                        post.node.frontmatter.hero_image.childImageSharp.fluid
                      }
                      alt={post.node.frontmatter.title}
                    /> */}
                  </div>
                  <div className={blogListStyles.list__info}>
                    <h2>{post.node.frontmatter.title}</h2>
                  </div>
                </li>
              </Link>
            )
          })}
      </div>
    )
  }
  return (
    <section>
      <ul className={blogListStyles.list}>{renderEdelData()}</ul>
    </section>
  )
}

