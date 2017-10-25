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
## 二、作用域、作用域链、闭包、预解析
## 三、webpack   
顺着简书的文章梳理（我是知识的二道贩子）  http://www.jianshu.com/p/42e11515c10f
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

9.配置devServer
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
    inline: true//实时刷新
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
11.babel-loader
```

```
**注意分割babel配置和webpack配置时候要创建的.babelrc文件在windows环境下会有 文件需要名字的问题 用webstrom可以搞定**
12.CSSloader
```

```
**注意**module中的test后面跟的字段没有引号

**注意：Loaders和Plugins常常被弄混，但是他们其实是完全不同的东西，可以这么来说，loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个，插件并不直接操作单个文件，它直接对整个构建过程其作用。**

13.plugins  --->有些是webpack内置的  有些要安装

Hot Module Replacement（HMR）【热加载】
>1.在webpack配置文件中添加HMR插件；
2.在Webpack Dev Server中添加“hot”参数；
```
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');  // npm install --save-dev ....
module.exports = {
...
devServe:{
    contentBase: "./public",//本地服务器所加载的页面所在的目录（我理解的是监听这里的文件？）
    historyApiFallback: true,//不跳转
    hot:true;  //热加载
    inline: true//实时刷新
}

plugins:[
        new webpack.BannerPlugin('版权所有，翻版必究'),   //注意都是new出来的    
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"}),
        new webpack.HotModuleReplacementPlugin()//热加载插件  
    ]
}
```




14.生产环境

关于**开发环境的webpack.config.js和生产环境的webpack.production.config.js文件之间的区别**感觉主要在插件部分，生产环境会安装进行 压缩 分离js和css 还有给模块分配id的plugins

json文件设置build后npm run build提示错误：NODE_ENV不是内部或外部命令，也不是可运行的程序
或批处理文件。
解决：
>"build": "set NODE_ENV=production && webpack -p --progress --profile --colors"


缓存有点云里雾里的，不知道具体其什么作用
```
module.exports = {
..
    output: {
        path: __dirname + "/build",
        filename: "bundle-[hash].js" //bundle--->bundle-[hash].js
    },
   ...
};
```

## 四、generator
关键点：分清generator和iterator | iterator对象的值 | iterator的.next()方法传参 | 执行过程  | 理解无回调的**异步**流程控制
1.function后面带*的函数是generator函数
```
function* genFunc () {
    console.log('step 1')
    yield 1
    console.log('step 2')
    yield 2
    console.log('step 3')
    return 3
}
```
2.调用generator时，会获得一个iterator对象
```
var gen = genFunc()
console.log(gen)  
```
3.这个对象有个方法叫next(),每当你调用 next() 的时候，generator函数内部就会执行直到遇到下一个 yield 语句，然后暂停在那里，并返回一个对象。这个对象含有被 yield 的值和generator函数的运行状态。
```
var ret = gen.next() // 输出: 'step 1'
ret   //Object {value: [yield的值] ,done:[true/false], }
console.log(ret.value) // 1
console.log(ret.done) // false
```
**注意：函数执行完之后，再调用 next 方法会产生异常。**

可以看到，只输出了 'step 1'。这意味着直到你运行下一次 next() 之前，generator内部的状态处于暂停之中，但是却不影响generator外部的代码继续运行。
4.直到generator函数内部不再有 yield 语句存在了，这时你再调用 next()，获得的就会是该函数的常规返回值 (return 的值)：
```
ret = gen.next() // 输出 'step 3'
console.log(ret.value) // 3
console.log(ret.done) // true
```
5.同时，iterator对象的 next() 方法是可以传递一个参数的。这个参数将会成为generator函数内对应 yield 语句的返回值：
```
function* genFunc () {
    var result = yield 1
    console.log(result)
}
var gen = genFunc()
gen.next() // 此时generator内部执行到 yield 1 并暂停，但还未对result赋值！
// 即使异步也可以！
setTimeout(function () {
    gen.next(123) // 给result赋值并继续执行，输出: 123
}, 1000)
```
**注意：不要把iterator传参和generator传参搞混了**

6.很有意思的一个例子  斐波那契数列
```
function* fab(max) {
    var count = 0, last = 0, current = 1;

    while(max > count++) {
        yield current;
        var tmp = current;
        current += last;
        last = tmp;
    }
}

var o = fab(10), ret, result = [];

while(!(ret = o.next()).done) {
    result.push(ret.value);
}

console.log(result); // [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
```
##面向对象
1.参考阮大师的面向对象的文章[http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html]

封装  
```

function Cat(name,color){
　　　　this.name = name;
　　　　this.color = color;
　　}
　　Cat.prototype.type = "猫科动物";
　　Cat.prototype.eat = function(){alert("吃老鼠")};
　　
//使用new操作符 生成实例化对象
　　var cat1 = new Cat("大毛","黄色");
　　var cat2 = new Cat("二毛","黑色");
　　alert(cat1.type); // 猫科动物
　　cat1.eat(); // 吃老鼠
```
**验证方法：**
```
//isPrototypeOf():这个方法用来判断，某个proptotype对象和某个实例之间的关系。
    alert(Cat.prototype.isPrototypeOf(cat1)); //true
　　alert(Cat.prototype.isPrototypeOf(cat2)); //true

//hasOwnProperty():每个实例对象都有一个hasOwnProperty()方法，用来判断某一个属性到底是本地属性，还是继承自prototype对象的属性。
    alert(cat1.hasOwnProperty("name")); // true
　　alert(cat1.hasOwnProperty("type")); // false

//in操作符:in运算符可以用来判断，某个实例是否含有某个属性，[不管是不是本地属性]
    alert("name" in cat1); // true
　　alert("type" in cat1); // true
　　
　　//in用来遍历属性  （注意alert后面的写法）
　　for(var prop in cat1) {alert("cat1["+prop+"]="+cat1[prop]); }

```

继承
```
//原型继承
function extend(Child, Parent) {

　　　　var F = function(){};
　　　　F.prototype = Parent.prototype;
　　　　Child.prototype = new F();
　　　　Child.prototype.constructor = Child;
　　　　Child.uber = Parent.prototype;
　　}
```
**Child.uber = Parent.prototype;**意思是为子对象设一个uber属性，这个属性直接指向父对象的prototype属性
```
//拷贝继承
function extend2(Child, Parent) {
　　　　var p = Parent.prototype;
　　　　var c = Child.prototype;
　　　　for (var i in p) {
　　　　　　c[i] = p[i];
　　　　　　}
　　　　c.uber = p;
　　}
```
由非构造函数的继承引申出来的深浅拷贝(原因无法使用拷贝继承和原型继承)【JQuery库使用的继承方法】

```
    var Chinese = {
　　　　nation:'中国'
　　};
　　var Doctor ={
　　　　career:'医生'
　　}
　　//现在要生成一个"中国医生"的对象了
　　
    //浅拷贝  p:parent  c:child
    funciton extendCopy(p){
        var c = {};
        for(var i in p){
            c[i] = p[i];
        }
        c.uber = p;
        return c
    }
    
    var Doctor = extendCopy(chinese);
    Doctor.career = "医生"
    alert(Doctor.nation) //中国
    
    //深拷贝
    function deepCopy(p,c){   //参数写成 (p,c)原因是使用时
        var c = c || {};   //c有值则为 c undefine的话为 {}
        for(var i in p){
            if(typeof p[i] === 'object'){  //对象内有子对象时
                c[i] = (p[i].constructor === Array)?[]:{}; //注意这个判断方式
                deepCopy(p[i],c[i]);   //递归
            }else{
                c[i] = p[i];
            }
        }
        
        return c
    }
    
    var Doctor =  deepCopy(chinese)  //使用时 参数直传parent
    chinese.birthday = ['bj','sh','hz'];
    Doctor.birthday.push('xm');
    
    alert(Doctor.birthPlaces); //['bj','sh','hz','xm'];
　　alert(Chinese.birthPlaces); //['bj','sh','hz'];
    
    
    //简单粗暴深拷贝之JSON解决方法（来自知乎）有局限性：
    局限性：1.无法复制函数 2.原型链没了，对象就是object，所属的类没了。(what??)
    var test ={
	  	name:{
	  	 xing:{ 
	  	     first:'张',
	  	     second:'李'
	  	},
	  	ming:'老头'
	  },
	  age :40,
	  friend :['隔壁老王','宋经纪','同事']
	 }
	  var result = JSON.parse(JSON.stringify(test))  //核心
	  result.age = 30
	  result.name.xing.first = '往'
	  result.friend.push('fdagldf;ghad')
	  console.dir(test)
	  console.dir(result)
```
2.blog三张图搞懂JavaScript的原型对象与原型链:[http://www.cnblogs.com/shuiyi/p/5305435.html]



引申：**typeof** | **instanceof** | **Object.prototype.toString.call(...)**
>1.  typeof---->number、boolean、string、object、undefined、function       ||不能分辨Object, 对简单类型可以区分
2.  instanceof本意是用来判断 A 是否为 B 的实例对象表达式为：A instanceof B，如果A是B的实例，则返回true,否则返回false 所以{}和[]在instanceof Object时都为true无法区分
3.  Object.prototype.toString.call(...) ---->  [object ...]   超级好用，就是它了（哇哈哈）
