jQuery.fn.extend({
    waterFall:function (option) {
        console.log("我是自定义插件方法：wallFall");
    //    获取父控件的总宽度
        var totalWidth=this.width();
    //    获取每个item的宽度
        var items=this.children(".item");
        var itemWidth=items.width();
        console.log("totalWidth="+totalWidth);
        console.log("itemWidth="+itemWidth);

    //    根据totalWidth和itemWidth计算每行可以容纳的列数
        var columnNum=Math.floor(totalWidth/itemWidth);
    //    计算每行剩余的宽度
        var margin=Math.floor((totalWidth-itemWidth*columnNum)/(columnNum+1));

        console.log("columnNum="+columnNum);
        console.log("margin="+margin);

    //    定义一个空数组，用来保存最后一行的高度,并初始化为margin(可以为其他值，影响第一行的上边距)
        var highArr=[];
        //初始化
        for(var i=0;i<columnNum;i++){
            highArr[i]=margin;
        }

    //    循环每个item，动态的改变他们的left和top值，实现瀑布流效果。
    //    步骤1：循环highArr数组，找出最小值和对应索引
    //    步骤2：根据最小值，计算出item应当放置的位置，设置item的left和top值
    //    步骤3：根据item的位置，更新highArr数组
    //    步骤4：每个item位置设置完毕后，找出highArr中的最大值，设置父布局的高度
        var minHigh=margin;
        var minIndex=0;
        items.each(function (index, item) {//注意这里的item 是DOM中的对象，要用$(item)包装一下才能用jq中的方法
            //找出highArr中的最小值和索引
            for(var i=0;i<highArr.length;i++){
                if(highArr[i]<minHigh){
                    minHigh=highArr[i];
                    minIndex=i;
                }
            }
            //根据最小值，计算出item应当放置的位置，设置item的left和top值
            var left=$(item).width()*minIndex+margin*(minIndex+1);
            var top=minHigh;
            console.log("highArr="+highArr);
            console.log("left="+left);
            console.log("top="+top);
            $(item).css({
                "left":left,
                "top":top,
                "padding-bottom":"10px"
            });
            // 根据item的位置，更新highArr数组
            minHigh+=$(item).height()+margin+10;
            highArr[minIndex]=minHigh;
            console.log("itemWidth="+$(item).width());
            console.log("itemHeight="+$(item).height());
        });

        //    找到highArr中的最大值，设置给items ，这样动态改变items 的高度，将加载跟多按钮顶到最下面去
        var maxHigh=0;
        for(var i=0;i<highArr.length;i++){
            if (highArr[i]>maxHigh){
                maxHigh=highArr[i];
            }
        }
        this.height(maxHigh);
    }
});