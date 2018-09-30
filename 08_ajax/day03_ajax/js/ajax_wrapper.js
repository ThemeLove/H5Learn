var ajax_wrapper=function (option) {
    var xmlHttp;
    if(window.XMLHttpRequest){
        xmlHttp=new XMLHttpRequest();
    }else{//兼容ie
        xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    //格式化请求字符串
    var formatStr="";
    if(option.data){
        for(var item in option.data){
            formatStr+=item;//拼接key
            formatStr+="=";
            formatStr+=option.data[item];//拼接value
            formatStr+="&";
        }
        //  删除最后一个&
        formatStr=formatStr.slice(0,-1);
    }

    console.log("formatStr=>"+formatStr);
    if(option.method=="get"){//如果是get请求
        xmlHttp.open(option.method,option.url+"?"+formatStr,true);
        formatStr="";
    }else if(option.method=="post"){//如果是post请求
        xmlHttp.open(option.method,option.url,true);
        //添加header要放在open的后面
        xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    }

    xmlHttp.send(formatStr);

    xmlHttp.onreadystatechange=function () {
        if(xmlHttp.readyState==4&&xmlHttp.status==200){//请求成功
            if(option.success){
                if(option.dataType=="xml"){
                    option.success(xmlHttp.responseXML);
                }else{
                    option.success(xmlHttp.responseText);
                }
            }
        }else{
            if(option.fail){
                option.fail("request fail");
            }
        }
    }
};
