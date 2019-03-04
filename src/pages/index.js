import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
// import Intro from '../components/intro';
// import About from '../components/about';
import Hello from '../components/hello';

export default ({ data }) => (
  <Layout>
    {/* <h1>{ data.site.siteMetadata.title }</h1> */}
    {/* <Intro /> */}

    {/* <Hello /> */}

    <div>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Link to={node.fields.slug}>
          <h3>
            {node.frontmatter.title} <span> - {node.frontmatter.date}</span>
          </h3>

          <p>{node.excerpt}</p>
        </Link>
      ))}
    </div>

    {/* <About /> */}
  </Layout>
);

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
