window.onload=function (ev) {

    left_scroll();
};
/**
 * 左侧菜单滑动
 */
function left_scroll(){
//    先获取必要的权限
    var mainLeft=document.querySelector(".main_left");
    var leftUl=document.querySelector(".main_left ul");
    var liArr=document.querySelectorAll(".main_left ul li");
    var liHeight=liArr[0].offsetHeight;

    // console.log("header="+header);
    // console.log("leftUl="+leftUl);
    //
    // console.log("mainLeft.height="+mainLeft.offsetHeight);
    // console.log("leftUl.height="+leftUl.offsetHeight);
    //
    // console.log("leftUl.offsetTop="+leftUl.offsetTop);

    var leftUlOffsetTop=leftUl.offsetTop;

    var startY=0;
    var moveY=0;

    var minMoveDistance=mainLeft.offsetHeight-leftUl.offsetHeight;//定义最小移动距离
    var maxMoveDistance=0;//定义最大移动距离

    var translateYDistance=0;//记录Y轴的偏移距离

    var scrollDistance=80;//定义伸缩距离

//    给leftUl添加touch事件
    leftUl.addEventListener("touchstart",function (event) {
        // console.log("touchstart");
        startY=event.touches[0].clientY;
        // console.log("startY="+startY);
    });

    leftUl.addEventListener("touchmove",function (event) {
        // console.log("touchmove");
        moveY=event.touches[0].clientY-startY;
        // console.log("moveY=" +moveY);

    //  做好滑动到最大最小值的边界判断。
        if((translateYDistance+moveY)<=minMoveDistance-leftUlOffsetTop-scrollDistance){
            moveY=0;
            translateYDistance=minMoveDistance-leftUlOffsetTop-scrollDistance;
        }

        if((translateYDistance+moveY)>=maxMoveDistance+scrollDistance){
            moveY=0;
            translateYDistance=maxMoveDistance+scrollDistance;
        }
        //关闭过渡
        stopTransition();
        setTranslateY(translateYDistance+moveY);
    });

    leftUl.addEventListener("touchend",function (event) {
        // console.log("touchend");

    //    在touchend里做吸附拉回效果
        //    开启过渡
        startTranslation();
        //  做好滑动到最大最小值的边界判断。
        if((translateYDistance+moveY)<=minMoveDistance-leftUlOffsetTop){
            moveY=0;
            translateYDistance=minMoveDistance-leftUlOffsetTop;
            //注意这里一定要用（）括起来
            setTranslateY(translateYDistance+moveY);
        }

        if((translateYDistance+moveY)>=maxMoveDistance){
            moveY=0;
            translateYDistance=maxMoveDistance;
            setTranslateY(translateYDistance+moveY);
        }
        translateYDistance+=moveY;
    });




    //定义left_main中的ul li 的点击事件
    for (var i = 0; i < liArr.length; i++) {
        var li = liArr[i];
        li.dataset["index"]=i;
    }

    tap_click(leftUl,function (event) {
        console.log("我被点击了");
        // 清空所有li的样式
        for (var i = 0; i < liArr.length; i++) {
            var li = liArr[i];
            li.className="";
        }
        event.target.parentNode.className="current";

        //
        var liIndex=event.target.parentNode.dataset["index"];

        translateYDistance=liHeight*liIndex*-1;

        if(translateYDistance>=maxMoveDistance){
            translateYDistance=maxMoveDistance;
        }else if(translateYDistance<=minMoveDistance-leftUlOffsetTop){
            translateYDistance=minMoveDistance-leftUlOffsetTop;
        }

        startTranslation();
        setTranslateY(translateYDistance);
    },function (event) {
        console.log("我被长按了");
    });




    function startTranslation(){
        leftUl.style.transition="all 0.5s";
    }

    function stopTransition(){
        leftUl.style.transition="";
    }

    function setTranslateY(distance){
        leftUl.style.transform="translateY("+distance+"px)";
    }



}
