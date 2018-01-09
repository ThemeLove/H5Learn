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
 * 水平方向匀速运动
 * @param ele       执行动画元素
 * @param target    动画运动到的目标
 * @param speed     执行动画的步长，速度
 * @param interval  定时器的频率
 */
function animate_hor(ele,target,speed,interval){
    clearInterval(ele.timer);
    var diff=target-ele.offsetLeft;
    var speed=diff>0?Math.abs(speed):-Math.abs(speed);
    ele.timer=setInterval(function () {
        ele.style.left=ele.offsetLeft+speed+"px";
        if(Math.abs(diff)<=Math.abs(speed)){
            ele.style.left=target+"px";
            clearInterval(ele.timer);
        }
    },Math.abs(interval));
}

/**
 * 竖直方向匀速运动
 * @param ele       执行动画元素
 * @param target    动画运动到的目标
 * @param speed     执行动画的步长，速度
 * @param interval  定时器的频率
 */
function animate_ver(ele,target,speed,interval){
    clearInterval(ele.timer);
    var diff=target-ele.offsetLeft;
    var speed=diff>0?Math.abs(speed):-Math.abs(speed);
    ele.timer=setInterval(function () {
        ele.style.top=ele.offsetTop+speed+"px";
        if (Math.abs(diff)<Math.abs(speed)){
            ele.style.top=target+"px";
            clearInterval(ele.timer);
        }
    },Math.abs(interval))
}

/**
 * 水平方向缓速运动
 * @param ele       执行动画元素
 * @param target    动画运动到的目标
 * @param factor    步长因子,用来动态改变速度
 * @param interval  定时器的频率
 */
function animate_hor_slow(ele,target,factor,interval){
    clearInterval(ele.timer);
    ele.timer=setInterval(function () {
        var diff=target-ele.offsetLeft;
        var speed=diff>0?Math.ceil(diff/Math.abs(factor)):Math.floor(diff/Math.abs(factor));
        ele.style.left=ele.offsetLeft+speed+"px";
        if (Math.abs(diff)<=Math.abs(speed)){
            ele.style.left=target+"px";
            clearInterval(ele.timer);
        }
    },Math.abs(interval));
}

/**
 * 竖直方向缓速运动
 * @param ele       执行动画元素
 * @param target    动画运动到的目标
 * @param factor    步长因子,用来动态改变速度
 * @param interval  定时器的频率
 */
function animate_ver_slow(ele,target,factor,interval){
    clearInterval(ele.timer);
    ele.timer=setInterval(function () {
        var diff=target-ele.offsetTop;
        var speed=diff>0?Math.ceil(diff/Math.abs(factor)):Math.floor(diff/Math.abs(factor));
        ele.style.top=ele.offsetTop+speed+"px";
        if (Math.abs(diff)<=Math.abs(speed)){
            ele.style.top=target+"px";
            clearInterval(ele.timer);
        }
    },Math.abs(interval));
}

/**
 * window竖直方向的缓速滚动到指定位置
 * @param target      滚动到的目标位置
 * @param factor      步长因子，用来动态改变速度
 * @param interval    定时器的频率
 */
function animate_window_ver_slow(target,factor,interval){
    clearInterval(window.timer);
    window.timer=setInterval(function () {
        var scrollLeft=getScroll().left;
        var scrollTop=getScroll().top;
        console.log("scrollTop="+scrollTop);
        var diff=target-scrollTop;
        var speed=diff>0?Math.ceil(diff/10):Math.floor(diff/10);
        window.scrollTo(scrollLeft,scrollTop+speed);
        if(Math.abs(diff)<=Math.abs(speed)){
            window.scrollTo(scrollLeft,target);
            clearInterval(window.timer);
        }
    },Math.abs(interval));
}


/**
 * window水平方向的缓速滚动到指定位置
 * @param target      滚动到的目标位置
 * @param factor      步长因子，用来动态改变速度
 * @param interval    定时器的频率
 */
function animate_window_hor_slow(target,factor,interval){
    clearInterval(window.timer);
    window.timer=setInterval(function () {
        var scrollLeft=getScroll().left;
        var scrollTop=getScroll().top;
        console.log("scrollLeft="+scrollLeft);
        var diff=target-scrollLeft;
        var speed=diff>0?Math.ceil(diff/10):Math.floor(diff/10);
        window.scrollTo(scrollLeft+speed,scrollTop);//数值方向不变
        if(Math.abs(diff)<=Math.abs(speed)){
            window.scrollTo(target,scrollTop);
            clearInterval(window.timer);
        }
    },Math.abs(interval));
}
