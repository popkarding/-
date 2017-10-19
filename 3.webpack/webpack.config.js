
module.exports = {
    devtool:'eval-source-map',
    entry: __dirname + '/app/main.js',
    output:{
        path: __dirname + '/public',
        filename:'bundle.js'
    },
    devServer:{
        contentBase:"./public",
        historyApiFallback:true,
        inline:true//热加载
    },
    module:{
      rules:[
          {
              test:/(\.jsx|\.js)$/,
              use:{
                  loader:'babel-loader',
                  options:{
                      presets:[
                          "es2015","react"
                      ]
                  }

              },
              exclude:/node_modules/
          },
          {
              test:'/\.css$/',
              use:[
                  {
                      loader:"style-loader"
                  },
                  {
                      loader:"css-loader"
                  }
              ]
          }
      ]
    },

};