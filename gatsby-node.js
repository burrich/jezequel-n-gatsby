const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  // TODO: Filter templates ?
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
  
  // filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
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

      const id = node.id
      createPage({
        path: node.fields.slug,
        component: path.resolve(
          `./src/templates/${String(node.frontmatter.templateKey)}.js`
        ),
        context: {
          // Data passed to context is available in page queries as GraphQL variables.
          id
        }
      })
    });
  })
};