require('./js/hello.js')
require('style-loader!css-loader!./css/style.css')

function helloWebpack(){
    alert("hello-webpack");
}

helloWebpack();