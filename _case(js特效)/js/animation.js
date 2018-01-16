function animate(ele,json,fn){
//    要用定时器先清定时器
    clearInterval(ele.timer);
    ele.timer=setInterval(function () {
        //开闭原则
        var isClear=true;
        for(var k in json){
            var target;
            var step;
            //获取目标值
            if ("opacity"===k){//如果是透明度
                target=parseInt(json[k])*100;
            //  兼容IE678
            }else{
                target=json[k];
            }

        //  获取步长
            var diff;
            diff=target-ele.style[k];
            step=diff>0?Math.ceil(diff/10):Math.floor(diff/10);

        //  赋值
            if("opacity"===k){
                ele.style[k]=ele.style[k]*100+diff;
            }else{
                ele.style[k]=ele.style[k]+diff;
            }

        //  所有属性都到达目标值，清除定时器
            if (ele.style[k]!==json[k]){
                isClear=false;
            }
        }

        if (isClear){
            clearInterval(ele.timer);
        }
    },50);
}

/**
 * 获取指定元素指定属性
 * @param ele           元素
 * @param attr          将要获取的元素属性
 * @returns {string}
 */
function getStyle(ele,attr){
    return ele.style[attr];
}