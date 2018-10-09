
//带回调函数自定义插件方法
jQuery.fn.extend({
   diyPrint:function (data,fn) {
       console.log("ThemeLove的专属打印----->"+data);
       if(fn){
           fn(data)
       }
       return this
   }
});

//带回调函数的自定义插件方法
jQuery.extend({
    diyAlert:function (data,fn) {
        console.log("ThemeLove的专属弹窗----->"+data);
        alert("ThemeLove的专属弹窗----->"+data);
        if(fn){
            fn(data)
        }
        return this;
    }
});