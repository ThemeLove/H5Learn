$(function(){
    $('#dowebok').fullpage({
        //设置每一屏的背景色
        sectionsColor : ['#0da5d6', '#2AB561', '#DE8910', '#16BA9D', '#0DA5D6'],
        //滑动到某一屏幕之后的回调函数
        afterLoad:function (link, index) {
            console.log("index="+index);
            //current类加给谁，谁就做动画，相当于1个开关
            $('.section').removeClass('current');
            //延迟100毫秒执行
            setTimeout(function () {
                $('.section').eq(index-1).addClass('current');
            },100);
        }
    });
});