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

    console.log("offsetHeight="+offsetHeight);
    console.log("scrollTop="+scrollTop);

    var maxInstance=offsetHeight+scrollTop;//

   //当屏幕滚动的时候
   window.onscroll=function() {
       var scrollInstance=getScroll().top;
       var percent=scrollInstance/maxInstance;
       if(percent>1){
          percent=1;
       }
       jdHeader.style.backgroundColor="rgba(201, 21, 35,"+percent+")";
       console.log("scrollInstance="+ scrollInstance);
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

        console.log("totalSecond=" + totalSecond);
        console.log("hour=" + hour);
        console.log("minute=" + minute);
        console.log("second=" + second);

        liArr[0].innerHTML=Math.floor(hour/10);
        liArr[1].innerHTML=hour%10;
        liArr[3].innerHTML=Math.floor(minute/10);
        liArr[4].innerHTML=minute%10;
        liArr[6].innerHTML=Math.floor(second/10);
        liArr[7].innerHTML=second%10;
    },1000);
}

function banner(){

}