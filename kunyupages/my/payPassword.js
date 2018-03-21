mui.init();
mui.plusReady(function(){
	$("#phone").val(localStorage.getItem("phone"));
})
$("#getcode").on('tap',function(){
	eg.postAjax("captCha", {
		"mobile":$("#phone").val().trim()
	}, function(data) {
		if(data.status=="1"){
			Countdown("getcode");
			mui.toast("短信发送成功");
		}
	},function(data){
		
	});
})
$("#oBtn").on('tap',function(data){
	if(!$("#smscode").val().trim()){
		mui.toast("验证码不可为空！");
		return false;
	}
	var ok = plus.pluginPGKeyboard.checkMatch("myPassword");
	if(!ok){
    	mui.toast("您输入的支付密码格式不正确");
    	return false;
   }	
	if(payPasswdVal != repeatPasswordVal){
		mui.toast("两次支付密码设置不一致");
		return false;
	}
//	if(!$("#pwd").val().trim()){
//		mui.toast("请输入支付密码！");
//		return false;
//	}
//	if(!$("#pwd2").val().trim()){
//		mui.toast("请再次输入支付密码！");
//		return false;
//	}
//	if($("#pwd2").val().trim()!= $("#pwd").val().trim()){
//		mui.toast("两次输入密码不一致！");
//		return false;
//	}
	var param = {
		"validCode":$("#smscode").val().trim(),
		"password":payPasswdVal
	}
	eg.postAjax2("user/payment/pwd",param,function(data){
		alert(JSON.stringify(data));
	})
})

//-----------------上线要用的密码键盘-------------------------------
var payPasswdVal;//上线支付密码
var repeatPasswordVal;//上线支付密码
//硬件监听
document.addEventListener( "plusready", onPlusReady, false );
function onPlusReady() {
    console.log("plusready");
}

/***
 *调用密码控件     上线用
 *  * 
 * md5加密
 * openMD5Keyboard ： function
 * @param showId 密码键盘输入框的ID值
 * @param isNumber 是否仅使用数字键盘；true为仅使用数字键盘，false为使用字母和数字全键盘（默认）。
 * @param confuse 设置键盘是否乱序。
 * @param maxLength 设置键盘可输入的最大长度
 * @param showEditText 键盘是否显示edittext
 * @param watchOutside 点击空白区域关闭密码键盘
 * @param buttonPress 键盘按下效果
 * @param regex 密码设置的正则表达式--可以设置为"",表示不设置密码正则表达式--demo仅提供测试，具体的设置方式根据业务规则去走
 * @param inputregex设置键盘输入正则规则--可以设置为""无限制--demo仅提供测试，具体的设置方式根据业务规则去走
 */
$("#pwd").click(function(){
	plus.pluginPGKeyboard.hideKeyboard();
	$("#pwd").val("");
	payPasswdVal="";
	plus.pluginPGKeyboard.clearKeyboard("myPassword");	
	plus.pluginPGKeyboard.openMD5Keyboard("myPassword", "true", 0,6,"false","true","false","^[0-9]{6}$","",
			function(result) {
					if (result) {
						if (result.status) {
							var json=result.payload;
							var obj =  $.parseJSON(json);
							var tag;
							if(typeof result.message =='string'){
								message = $.parseJSON(result.message);
								tag = message.tag;
							}else{
								tag = result.message.tag;
							}					
							if(tag == "done"){
								plus.webview.currentWebview().setStyle({
									bottom:"0px"
								})
							}else{
								document.getElementById('pwd').value = obj.text==null?"":obj.text;
								payPasswdVal = obj.cipherText==null?"":obj.cipherText;
							}
						} else {
							alert(result.message);
						}
					} else {
						alert("调用插件时发生异常。");
					}
				}, function(result) {
					alert(result);
				});
});

$("#pwd2").click(function(){
	plus.pluginPGKeyboard.hideKeyboard();	
	$("#pwd2").val("");
	repeatPasswordVal="";
	plus.pluginPGKeyboard.clearKeyboard("repeatPassword");	
	plus.pluginPGKeyboard.openMD5Keyboard("repeatPassword", "true", 0,6,"false","true","false","^[0-9]{6}$","",
			function(result) {
					if (result) {
						if (result.status) {
							var json=result.payload;
							var obj =  $.parseJSON(json);
							var tag;
							if(typeof result.message =='string'){
								message = $.parseJSON(result.message);
								tag = message.tag;
							}else{
								tag = result.message.tag;
							}					
							if(tag == "done"){
								plus.webview.currentWebview().setStyle({
									bottom:"0px"
								})
							}else{
								document.getElementById('pwd2').value = obj.text==null?"":obj.text;
								repeatPasswordVal = obj.cipherText==null?"":obj.cipherText;
							}
						} else {
							alert(result.message);
						}
					} else {
						alert("调用插件时发生异常。");
					}
				}, function(result) {
					alert(result);
				});
});