var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    // entry:'./src/index.js'     //单个入口文件配置
    // entry:['./index.js','./index2.js']   //多个入口文件配置，数组模式
    entry:{//对象模式
      index:  './src/index.js',
      hello: './src/js/hello.js'
    },
    output:{
        path: 'E:\\WorkSpace\\Sublime\\H5Learn\\15_vue\\webpack-test\\dist',//打包后的目录
        // path: '/dist/js',
        // filename:'bundle.js',//如果是单个入口文件的话可以写死一个名称
        filename:'./js/[name]-[hash].js',//如果是多个入口文件的话，可以使用这样的配置，生成的打包文件时入口文件的名称【name】+当前入口文件的hash值【hash】
        publicPath:'http://www.baidu.com',//一般上线时设置
    },
    plugins:[
        new htmlWebpackPlugin({
            filename:'index.html',//定义输出html的名字
            template:'./src/index.html',//定义绑定的模板html
            // inject:'head',//定义将js放到输出html的位置标签
            inject:false,
            title:'webpack is good',
            date:new Date(),
            minify:{
                removeComments:true,//去除注释
                // collapseWhitespace:true//去除多余空格
            }
        })
    ]
};