import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

export default ({ data }) => {
  const { page, blogPosts } = data; 

  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: page.html }} />

      <div>
        {blogPosts.edges.map(({ node }) => (
          <Link to={node.fields.slug}>
            <h3>
              {node.frontmatter.title} <span> - {node.frontmatter.date}</span>
            </h3>

            <p>{node.excerpt}</p>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

// Get index page and blog posts 
export const query = graphql`
  query($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      id
      html
    }
    blogPosts: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;