# 每日总结

标签（空格分隔）： 不那么正经的程序员笔记

---
曾经用张无忌学太极拳的例子来调侃自己：学完忘得飞快的特质，现在发现再不好好精炼总结记录是真滴药丸。所以还是笔记走起
---
## 一、事件流和DOM
```
    1.在本质是字符串的HTML解析后形成的一个有很多节点的对象，其下的节点也都是对象
    2.DOM的最顶层是document，事件模型里的DOM事件流捕获起点和冒泡终点都是是document
    3.nodeType（节点类型-->返回数字[1-9]）、 nodeName(节点名字-->返回字符串)、 nodeValue（节点值-->返回字符串，没有返回null） -----> 这仨活宝在 console.dir(document)后控制台的document对象里（万物皆对象？？[可是为啥这么难找]）
    4.新建节点，插入节点，删除节点，替换节点，克隆节点----file:1.DOM
    5.事件模型-----file：1.DOM
```
## 二、webpack   
顺着简书的文章梳理（http://www.jianshu.com/p/42e11515c10f）[我是二道贩子]
1. webpack是基于node环境的
2. 初始化  npm init 
3. 安装  webpack  npm install --save-dev webpack
4. 打包时输入命令  webpack {entry file(入口文件如app/main.js)} {destination for bundled file(输出文件如bulid/foo.js)}
5. 非全局安装执行打包输出命令要改为  node_modules/.bin/webpackk {entry file(入口文件如app/main.js)} {destination for bundled file(输出文件如bulid/foo.js)}
6. 对package.json 中的“scripts”进行修改其实就是直接再json中做运行webpack文件的引导工作，代替了4.5这两步
```
"scripts": {
    "start": "webpack" // 修改的是这里，JSON文件不支持注释，引用时请清除
  },
```
7.**__dirname** 是node.js中的一个全局变量，指向当前执行脚本所在目录
8. 要配置source maps 来找到报错位置，用来调试提高开发效率 就要配置webpack中的devtool，其有4中种选项，中小型项目用 eval-source-map
```
module.exports = {
  devtool: 'eval-source-map',//配置 source maps
  entry:  __dirname + "/app/main.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  }
}
```

9.配置devServer来实现热加载
```
module.exports = {
  devtool: 'eval-source-map',

  entry:  __dirname + "/app/main.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },

  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录（我理解的是监听这里的文件？）
    historyApiFallback: true,//不跳转
    inline: true//实时刷新(热加载)
  } 
}
```
package.json文件中在scripts里加入 
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack",
    "server": "webpack-dev-server --open"
  },
```
10.**Loaders**：通过使用不同的loader，webpack有能力调用外部的脚本或工具，实现对不同格式的文件的处理，比如说分析转换scss为css，或者把下一代的JS文件（ES6，ES7)转换为现代浏览器兼容的JS文件，对React的开发而言，合适的Loaders可以把React的中用到的JSX文件转换为JS文件。
    >loader需要单独安装
    loader要在webpack.config.js中的models里进行配置其下有4个关键字
    test：一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
loader：loader的名称（必须）
include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
query：为loaders提供额外的设置选项（可选）

同一个文件引入多个loader
```
module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [   //就是这里
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    }
```

