let htmlWebpackPlugin=require('html-webpack-plugin');

module.exports={
    //entry:'./src/index.js',//单入口写法
    //entry:['./index.js','./index2.js'] //数组模式
    entry:{//对象模式
      main:'./src/index.js',
      testA:'./src/js/testA.js',
      testB:'./src/js/testB.js',
      testC:'./src/js/testC.js'
    },
    output:{
        path:'E:\\Learn\\H5Learn\\15_vue\\webpack-test\\dist',
        //filename:'bundle.js',//如果是单个入口文件的话可以写死一个名称
        filename:'./js/[name]-[hash].js',//如果是多个入口文件的话，可以使用这样的配置，生成的打包文件时入口文件的名称【name】+当前入口文件的hash值【hash】
        // filename:'./js/index.js',
        // publicPath:'http://www.themelove.com'//一般项目上线时配置
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./src/index.html',//使用指定的模板进行生成文件
            filename:'index.html',//生成的文件名
            // inject:'head',//生成文件时script存放的位置，这里表示存放于head标签中
            inject: false,//生成文件时script存放的位置，这里表示存放于head标签中
            chunks:['main'],//引用哪一个js
            minify:{
                removeComments:true,//是否删除注释
                caseSensitive:false,//是否大小写敏感
                collapseBooleanAttributes:true,////是否简写boolean格式的属性如：disabled="disabled" 简写为disabled
                collapseWhitespace: false //是否去除空格
            },
            title:'this is custom data of title from index',//自定义数据，可以再模板中获取
        }),
        new htmlWebpackPlugin({
            template:'./src/test.html',//使用指定的模板进行生成文件
            filename:'testA.html',//生成的文件名
            // inject:'head',//生成文件时script存放的位置，这里表示存放于head标签中
            inject:false,//生成文件时script存放的位置，这里表示存放于head标签中
            // chunks:['main','testA'],
            excludeChunks:['main','testB','testC']
        }),
        new htmlWebpackPlugin({
            template:'./src/test.html',//使用指定的模板进行生成文件
            filename:'testB.html',//生成的文件名
            // inject:'head',//生成文件时script存放的位置，这里表示存放于head标签中
            inject:false,//生成文件时script存放的位置，这里表示存放于head标签中
            // chunks:['main','testB'],
            excludeChunks:['main','testA','testC']
        }),
        new htmlWebpackPlugin({
            template:'./src/test.html',//使用指定的模板进行生成文件
            filename:'testC.html',//生成的文件名
            // inject:'head',//生成文件时script存放的位置，这里表示存放于head标签中
            inject:false,//生成文件时script存放的位置，这里表示存放于head标签中
            // chunks:['main','testC'],
            excludeChunks:['main','testA','testB']
        })
    ],
};