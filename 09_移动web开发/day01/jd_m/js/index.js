window.onload=function () {
    headerScroll();
    countDown();
    banner();
};

/**
 * 实现顶部通栏jd_header跟随页面滚动改变透明度，当滚动到jd_nav的时候，透明度从0变为1，从jd_nav回滚到0的时候，透明度从1变为0
 */
function headerScroll(){
   var jdHeader= document.querySelector(".jd_header");
   var jdNav=document.querySelector(".jd_nav");

   var scrollTop=jdNav.offsetTop;//jd_nav到顶部的距离
   var offsetHeight=jdNav.offsetHeight;//jd_nav自身的距离

    // console.log("offsetHeight="+offsetHeight);
    // console.log("scrollTop="+scrollTop);

    var maxInstance=offsetHeight+scrollTop;//

   //当屏幕滚动的时候
   window.onscroll=function() {
       var scrollDistance=getScroll().top;
       var percent=scrollDistance/maxInstance;
       if(percent>1){
          percent=1;
       }
       jdHeader.style.backgroundColor="rgba(201, 21, 35,"+percent+")";
       console.log("scrollInstance="+ scrollDistance);
   }
}

/**
 * 实现第一个content_top总的倒计时功能
 * 指定一个倒计时时间，然后开始时分秒倒计时，用setInterver实现
 */
function countDown(){
    //获取要设置的li
    var liArr=document.querySelectorAll(".jd_main .main_content:nth-child(1) .content_top ul li");
    var totalSecond=3*60*60;

    var timer=setInterval(function () {
        totalSecond--;
        if(totalSecond<0){//当小于0的时候清除定时器
            clearInterval(timer);
            return;
        }
        var hour=Math.floor(totalSecond/3600);
        var minute=Math.floor(totalSecond%3600/60);
        var second=totalSecond%60;
        //
        // console.log("totalSecond=" + totalSecond);
        // console.log("hour=" + hour);
        // console.log("minute=" + minute);
        // console.log("second=" + second);

        liArr[0].innerHTML=Math.floor(hour/10);
        liArr[1].innerHTML=hour%10;
        liArr[3].innerHTML=Math.floor(minute/10);
        liArr[4].innerHTML=minute%10;
        liArr[6].innerHTML=Math.floor(second/10);
        liArr[7].innerHTML=second%10;
    },1000);
}

/**
 * 实现轮播图滚动，由于ul的li的是浮动的，ul的父盒子设置了overflow：hidden,只需要用定时器平移ul的位置即可,同时改变banner_index的状态
 * 1.平移ul我们用C3中的translateX
 * 2.注意banner_images和banner_index的边界判断
 * 3.给translateX加上过渡效果transiform
 */
function banner(){
//    获取banner_image
    var bannerImages=document.querySelector(".jd_banner .banner_images");
    var bannerIndexArr=document.querySelectorAll(".jd_banner .banner_index li");
    console.log(bannerIndexArr);

    var imageWidth=bannerImages.offsetWidth*10/100;
    console.log("imageWidth=" + imageWidth);

//    定义初始索引为index=1
    var index=1;

    var timer=setInterval(function (args) {
        bannerImages.style.transition="all 0.3s";
        index++;
        console.log("index=" + index);
        bannerImages.style.transform="translateX("+ -imageWidth*(index) +"px)";
    },2000);

//    给bannerImages添加过渡结束监听，解决最有一张过渡页面过大的bug
    bannerImages.addEventListener("webkitTransitionEnd",function () {
        if(index>8){
            index=1;
            bannerImages.style.transition="";//
            console.log("index="+index);
        }
        if(index<1){
            bannerImages.style.transition="";//
            index=8;
        }

        bannerImages.style.transform="translateX("+ (-imageWidth*index) +"px)";

        //    先清空bannerIndexArr的所有状态，再根据索引为当前index添加样式
        for (var i = 0; i < bannerIndexArr.length; i++) {
            var bannerIndex = bannerIndexArr[i];
            bannerIndex.className="";
        }

        //    给当前所有添加current选中样式
        bannerIndexArr[index-1].className="current";
    });

//    给轮播滚动添加触摸事件：触摸开始，暂停自动轮播；触摸中，改为响应触摸滚动；触摸后，根据触摸移动位置设置滚动位置，然后重新开启自动轮播
    /**
     * 触摸开始事件
     * 1.触摸开始清楚定时器，停止轮播滚动
     * 2.记录开始触摸时的位置
     */

    var startX=0;
    bannerImages.addEventListener("touchstart",function (event) {
        console.log("touchstart");
    //    清楚定时器
        clearInterval(timer);
    //    关闭过渡效果
        bannerImages.style.transition="";
    //    记录触摸的的水平位置
        startX=event.touches[0].clientX;
    });

    var moveX;
    /**
     * 触摸中事件
     */
    bannerImages.addEventListener("touchmove",function (event) {
        console.log("touchmove");
    //    记录移动中的位置
        moveX=event.touches[0].clientX-startX;

        console.log("moveX=" + moveX);
        console.log("index=" + index);
        console.log("aaa="+(-index*imageWidth+moveX));

        bannerImages.style.transform="translateX("+ (-imageWidth*index+moveX) +"px)";
    });

    /**
     * 触摸结束事件
     */
    bannerImages.addEventListener("touchend",function (event) {
        console.log("touchend");
        var maxScrollDistance=imageWidth/2;
        //记录结束时的位置
        // var endX=event.touches[0].clientX;//注意结束时没有clientX,会报错


        if(Math.abs(moveX)>maxScrollDistance){
            if(moveX>0){
                index--;
            }else{
                index++;
            }
        }
        bannerImages.style.transition="all 0.3s";
        bannerImages.style.transform="translateX("+ (-imageWidth*index) +"px)";

    //  重新开启定时器
        timer=setInterval(function () {
            bannerImages.style.transition="all 0.3s";
            index++;
            console.log("index=" + index);
            bannerImages.style.transform="translateX("+ (-imageWidth*index) +"px)";

        },2000);

    });
}