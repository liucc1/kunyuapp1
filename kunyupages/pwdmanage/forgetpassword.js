mui.init({ swipeBack:false });
/**1.手机号码聚焦离焦**/
$("#phone").focus(function(){//获得焦点
	$("#i1").css("display","none");
});
$("#phone").blur(function(){//失去焦点
	var phoneNum = $("#phone").val();
	if(eg.phone.test(phoneNum)) {
		$("#i1").css("display","none");
		$("#getcode").removeAttr("disabled");
	}else{
		$("#getcode").attr({"disabled": "disabled"})
		$("#i1").css("display","block");
	}
});
/**2.密码聚焦离焦**/
$("#pwd1").focus(function(){//获得焦点
	$("#i2").css("display","none");
});
$("#pwd1").blur(function(){//失去焦点
	var pwd1 = $("#pwd1").val();
	if(eg.passwd.test(pwd1)) {
		$("#i2").css("display","none");
	}else{
		$("#i2").css("display","block");
	}
});
/**3.再次输入密码聚焦离焦**/
$("#pwd2").blur(function(){//失去焦点
	var pwd1 = $("#pwd1").val();
	var pwd2 = $("#pwd2").val();
	if(pwd1!=pwd2) {
		$("#oBtn").attr("disabled","disabled");
		mui.toast("您两次输入密码不一致！");
		document.getElementById('pwd2').value="";
	}else{
		if(canSubmit()){
			$("#oBtn").removeAttr("disabled");
		}else{
			$("#oBtn").attr("disabled","disabled");
		}
	}
});
function canSubmit(){
	var t1=eg.phone.test($("#phone").val());
	var t2=eg.passwd.test($("#pwd1").val());
	var t3=$("#smscode").val().trim();
	if(t1&&t2&&t3) {
		return true;
	}
}
/**点击获取验证码**/
$("#getcode").on("tap",function(){
	var phoneNum = $("#phone").val();
	if(!eg.phone.test(phoneNum)) {
		mui.toast("手机号码格式不正确！");
		return;
	};
	plus.nativeUI.showWaiting();
	eg.generalPostAjax("user/checkMobile.do", {//1.首先查询该手机号是否已注册
		"mobile": phoneNum,
		"serviceId": "02001001"
		}, function(data) {
		if(data.resCode == "0") {//未注册
				mui.toast("请输入已注册手机号！");
				plus.nativeUI.closeWaiting();
				return;
		}else{//已注册											
			eg.postAjax("safe/sendVerificateMessage.do", {
				"mobile": $("#phone").val(),
				"serviceId": "02009001",
				"smsType":"REGET_PWD"
				}, function(data) {
				plus.nativeUI.closeWaiting();
				Countdown("getcode");
				mui.toast("验证码已发送");
			});
		}
	});
});
/**点击提交按钮**/
$("#oBtn").on("tap",function(){
	var params = {
		"serviceId": "02001004",
		"mobile": $("#phone").val().trim(),
		"password": forgetPasswordVal,
		"passwordConfirm": ReForgetPasswordVal,
		"verifyCode": $("#queryCode").val().trim()
	};
	plus.nativeUI.showWaiting();
	eg.postAjax("user/resetPassword.do", params, function(data) {
		plus.nativeUI.closeWaiting();
		plus.nativeUI.toast("密码修改成功！", {
			duration: "short"
		});
//			mui.openWindow({
//				"url": "login.html",
//				"id": "login"
//			});
		mui.back();
	});
});

//----------------上线要用的密码键盘代码start-------------------
var  forgetPasswordVal;
var  ReForgetPasswordVal;
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
$("#newPwd").click(function(){
	plus.pluginPGKeyboard.hideKeyboard();
	$("#newPwd").val("");
	forgetPasswordVal="";
	plus.pluginPGKeyboard.clearKeyboard("newPwd");	
	plus.pluginPGKeyboard.openMD5Keyboard("newPwd", "false", 1,20,"false","true","false","^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$","",
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
								var  pwdVal = obj.text==null?"":obj.text;
								$("#newPwd").val(pwdVal);
//								passwordVal = obj.cipherText==null?"":obj.cipherText;
//								document.getElementById('pwd').value = obj.text==null?"":obj.text;
								forgetPasswordVal = obj.cipherText==null?"":obj.cipherText;
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

$("#doublePwd").click(function(){
	plus.pluginPGKeyboard.hideKeyboard();
	$("#doublePwd").val("");
	ReForgetPasswordVal ="";
	plus.pluginPGKeyboard.clearKeyboard("doublePwd");	
	plus.pluginPGKeyboard.openMD5Keyboard("doublePwd", "false", 1,20,"false","true","false","","",
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
								document.getElementById('doublePwd').value = obj.text==null?"":obj.text;
								ReForgetPasswordVal = obj.cipherText==null?"":obj.cipherText;
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