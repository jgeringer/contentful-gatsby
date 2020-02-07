import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const Post = styled.article`
  margin-bottom: 2rem;
`

const PostImage = styled.div`
  margin-right: 1rem;
`

const PostText = styled.div`
  
`

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.german.edges

  return (
    <Layout data={data} title={siteTitle}>
      <SEO title="All posts" />
      <h3>{window.location.pathname}</h3>

      {posts.map(({ node }) => {
        const title = node.title || node.slug
        return (
          <Post key={node.slug}>
            <header>
              <PostImage>
                <Img fluid={node.image.fluid} />
              </PostImage>
              <PostText>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4), 
                    marginTop: 0
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={`/${node.node_locale}/${node.slug}`}>
                    {title}
                  </Link>
                </h3>
              </PostText>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.subtitle,
                }}
              />
            </section>
          </Post>
        )
      })}

      <Bio />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query PageDeQuery {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    german: allContentfulPost(filter: { node_locale: { eq: "de" } }) {
      edges {
        node {
          title
          subtitle
          image {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
          author
          slug
          id
          contentful_id
          node_locale
        }
      }
    }
  }
`
