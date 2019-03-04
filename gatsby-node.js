const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode });
    console.log('\n', '[onCreateNode]', 'slug :', slug);

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  .then(result => {
    if (result.errors) {
      result.errors.forEach(err => console.error(err.toString()));
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      console.log('\n', '[createPages]', 'node.fields.slug :', node.fields.slug);

      createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/blog-post.js'),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      })
    });
  })
};