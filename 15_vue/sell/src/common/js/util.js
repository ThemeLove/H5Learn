/**
 * 解析url参数
 * @example ?id=123456&a=b
 * return Object{id:123456,a:b}
 */
export function urlParse (){
  let urlParamStr = window.location.search;
  console.log("urlParamStr=" + urlParamStr);
  let obj = {};
  let paramArr=urlParamStr.substring(1).split("&");
  if(paramArr&&paramArr.length>0){
    paramArr.forEach((paramStr) =>{
      let param=paramStr.split("=");
      let key=decodeURIComponent(param[0]);
      let value=decodeURIComponent(param[1]);
      obj[key]=value;
    });
  }
  return obj;
}
