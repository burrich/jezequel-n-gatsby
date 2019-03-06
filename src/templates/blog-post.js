import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

export default ({ data }) => {
  const post = data.markdownRemark;
  
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>

      <Link to={"/"}>
        <h3>Retour</h3>
      </Link>
    </Layout>
  );
};

export const query = graphql`
  query BlogPostById($id: String!) {
    markdownRemark(id: { eq: $id}) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`;