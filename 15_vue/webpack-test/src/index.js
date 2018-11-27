require('style-loader!css-loader!./css/style.css');

function helloWebpack(str){
    alert("hello-webpack from"+ str);
}

helloWebpack("index");