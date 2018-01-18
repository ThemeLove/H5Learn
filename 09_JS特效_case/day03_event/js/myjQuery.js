/**
 * 获取单一元素属性的兼容写法
 * @param ele      元素
 * @param attr     属性名称
 * @returns {*}    返回值
 */
function getStyle(ele,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele,null)[attr];
    }
    return ele.currentStyle[attr];
}

/**
 * 获取系统分辨率
 * @returns {{width, height}}
 */
function getScreenPix( ){
    return {
        "width":window.screen.width ,
        "height":window.screen.height
    }
}

/**
 *  阻止事件冒泡
 * @param event
 */
function stopEventBubble(event){
    event=event||window.event;
    if(event.stopPropagation()){
        event.stopPropagation();
    }else{
        event.cancelBubble=true;
    }
}

/**
 * 获取事件源头id
 * @param event          事件对象
 * @returns {string}     事件源id
 */
function getEventTargetId(event){
    event=event||window.event;
    return event.target?event.target.id:event.srcElement.id;
}

/**
 * 获取事件源
 * @param event     事件对象
 * @returns {any}   事件源
 */
function getEventTarget(event){
    event=event||window.event;
    return event.target?event.target:event.srcElement;
}

/**
 * 获取屏幕可视区域宽高
 * @returns {{width: number, height: number}} 宽高以json格式返回
 */
function getScreen(){
    if(window.innerWidth!=undefined){
        return {
            "width":window.innerWidth,
            "height":window.innerHeight
        }
    }else if(window.compatMode==="CSS1Compat"){
        return {
            "width":window.documentElement.clientWidth,
            "height":window.documentElement.clientHeight
        }
    }else{
        return {
            "width":window.body.clientWidth,
            "height":window.body.clientHeight
        }
    }
}

/**
 * 获取竖直方向和水平方向滚动条滚动的距离，以json格式返回
 * @returns {{top: number, left: number}}
 */
function getScroll(){
    if (window.pageYOffset!=null){// ie9+ 高版本浏览器
        // 因为 window.pageYOffset 默认的是  0  所以这里需要判断
        return{"top":window.pageYOffset,
            "left":window.pageXOffset
        }
    }else if(document.compatMode==="CSS1Compat"){// 标准浏览器   来判断有没有声明DTD
        return{"top":document.documentElement.scrollTop,
            "left":document.documentElement.scrollLeft
        }
    }else{// 未声明 DTD
        return{"top":document.body.scrollTop,
            "left":document.body.scrollLeft
        }
    }
}


/**
 * 带回调函数的属性缓动动画
 * @param ele       目标元素
 * @param json      属性值:json格式
 * @param fn        动画结束后的回调函数
 */
function animate_slow(ele,json,fn){
//    要用定时器，先清定时器
    clearInterval(ele.timer);
    ele.timer=setInterval(function () {
        var isClear=true;//是否清除定时器
        for(var k in json){
        //1.根据k值获取当前的属性值
            var curAttr;
        //    兼容opacity属性
            if("opacity"===k){
                curAttr=parseInt(getStyle(ele,k)*100)||10;//如果没有获取到，默认为1
                console.log("opacity="+curAttr);
            }else{
                curAttr=parseInt(getStyle(ele,k))||0;//如果没有获取到默认为0
            }
        //2.获取步长,处理步长
            var diff=json[k]-curAttr;
            if(isNaN(diff)){
                console.log("k="+k);
            }
            console.log("diff="+diff);
            var step=diff>0?Math.ceil(diff/10):Math.floor(diff/10);
            var lastAttr=curAttr+step;//本次处理步长之后元素属性要到达到的最新值

        //3.赋值，根据特殊属性值做兼容
            if("opacity"===k){
                ele.style[k]=lastAttr/100;
                console.log("lastOpacity="+lastAttr/100);
            //  兼容IE678
                ele.style.filter="alpha(opacity="+lastAttr+")";
            }else if("zIndex"===k){
                ele.style[k]=json[k];
            }else{//正常一般属性赋值
                ele.style[k]=lastAttr+"px";
            }

            if(Math.abs(diff)<=Math.abs(step)){
                if("opacity"===k){
                    ele.style[k]=json[k]/100;
                    //兼容IE678
                    ele.style.filter="alpha(opacity="+json[k]+")";
                }else if("zIndex"===k){
                    ele.style[k]=json[k];
                }else{
                    ele.style[k]=json[k]+"px";
                }
            }

            if(json[k]!==lastAttr){//只要有一个属性值没有达到目标值，就不能清除定时器，将isClear置为false
                isClear=false;
            }
        }

        if (isClear){//所有属性都达到目标值，清除定时器,执行回调函数
            console.log("animate_slow:clearTimer");
            clearInterval(ele.timer);
            if(fn){
                fn();
            }
        }
    },10);
}