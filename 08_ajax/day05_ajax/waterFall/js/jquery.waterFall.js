jQuery.fn.extend({
    waterFall:function (option) {
        console.log("我是自定义插件方法：wallFall");
        var items=this.children();
        console.log("count="+items.length);
    //  获取最后五个元素，因为这里我们一排最多放5个
        var tempItemArr=[items.eq(-1),items.eq(-2),items.eq(-3),items[-4],items[-5]];
        console.log("eq(1)top="+items.eq(1).position().top+",eq(1)left="+items.eq(1).position().left);
        console.log("eq(-2)="+items.eq(-2).children("p").eq(0).text());
        console.log("eq(-3)="+items.eq(-3).width()+",height="+items.eq(-3).height());


        var tempFiveItemArr=[
            {
                left:items.eq(-1).position().left,
                top:items.eq(-1).position().top+items.eq(-1).height()
            },
            {
                left:items.eq(-2).position().left,
                top:items.eq(-2).position().top+items.eq(-2).height()
            },
            {
                left:items.eq(-3).position().left,
                top:items.eq(-3).position().top+items.eq(-3).height()
            },
            {
                left:items.eq(-4).position().left,
                top:items.eq(-4).position().top+items.eq(-4).height()
            },
            {
                left:items.eq(-5).position().left,
                top:items.eq(-5).position().top+items.eq(-5).height()
            }
        ];

        var orderFiveItemArr=tempFiveItemArr.sort(function (obj1,obj2) {
            if(Number(obj1.top)<Number(obj2.top)){
                return -1;
            }else if(Number(obj1.top)>Number(obj2.top)){
                return 1
            }else{
                return 0;
            }
        });



    }
});