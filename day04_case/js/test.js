function onClick(text) {
	/*	alert("我是js中的alert");
		prompt("人是不是还要有点理想？说点什么吧");
		confirm("请选择确定或者取消");
		window.console.log("我是js中的console输出的log")*/
	// alert("你点击了按钮");	
	// alert(text);
	// confirm("爱或不爱","love");
	prompt("人是不是还要有点理想？说点什么吧","咸鱼才没有理想");
}

function writeToBrowse(){
	var message=document.getElementById("message").value;
	document.getElementById("input_message").innerHTML=message;
	document.write(message+"\\"+message);
}
