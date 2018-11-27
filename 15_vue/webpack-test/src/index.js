require('./js/hello.js')
require('style-loader!css-loader!./css/style.css')

function helloWebpack(str){
    alert(str+"say:hello-webpack");
}

helloWebpack();