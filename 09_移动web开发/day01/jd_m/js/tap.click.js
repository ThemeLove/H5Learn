/**
 * 根据touchstart、touchmove、touchend三个事件，来封装点击和长按事件
 * 封装逻辑：1.按下时记录系统时间startTime，抬起时记录结束时间endTime.
 *          2.计算endTime-startTime的差值diffTime
 *          3.如果diffTime<maxClickTime（预先定义好的点击事件触发时间间隔），算点击事件，给点击事件回调
 *          4.如果diffTime>maxPressTime（预先定义好的长按事件触发时间间隔），算长按事件，给长按事件回调
 *          5.如果在按下和弹起过程中有触发移动事件，则不处理，不给任何回调
 * @param element
 * @param clickCallback
 * @param pressCallback
 */
function tap_click(element,clickCallback,pressCallback){

    var startTime=0;
    var maxClickTime=200;
    var maxPressTime=1000;
    var isMove=false;
    element.addEventListener("touchstart",function (event) {
        console.log("touchStart");
        startTime=new Date().getTime();
        console.log("startTime=" + startTime);
    });

    element.addEventListener("touchmove",function () {
        console.log("touchmove");
        isMove=true;
    });

    element.addEventListener("touchend",function () {
        console.log("touchend");
        var endTime=new Date().getTime();
        console.log("endTime=" + endTime);
        var diffTime=endTime-startTime;
        console.log("diffTime=" + diffTime);

        if(!isMove&&diffTime<maxClickTime){
            clickCallback(event);
        }

        if(!isMove&&diffTime>maxPressTime){
            pressCallback(event);
        }

        isMove=false;
        console.log("isMove="+isMove);
    });
}