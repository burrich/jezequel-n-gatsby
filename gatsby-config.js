module.exports = {
  siteMetadata: {
    title: 'Data title'
  },
  plugins: [
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-netlify-identity-widget',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`
      },
    },
    'gatsby-transformer-remark'
  ]
};