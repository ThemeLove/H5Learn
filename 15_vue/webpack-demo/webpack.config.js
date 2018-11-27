var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:'./src/app.js',
  output:{
      path:'E:\\Learn\\H5Learn\\15_vue\\webpack-demo\\dist',
      filename:'js/[name].bundle.js'
  },
  module:{
    loaders:[
        {
           test:/\.js$/,
           loader:'babel'
        }
    ]
  },
  plugins:[
      new htmlWebpackPlugin({
          filename:'index.html',
          template:'index.html',
          inject:'body'
      }),
  ],

};