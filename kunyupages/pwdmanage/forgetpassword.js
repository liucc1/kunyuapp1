mui.init({ swipeBack:false });
mui.plusReady(function(){
	//获取token
	eg.getCsrf();
	//不存在则重新获取
 	//if (!localStorage.getItem("csrf")) {eg.getCsrf();}
});
/**校验输入项**/
function canSubmit(){
	if(!$("#phone").val().trim()) {
		mui.toast("手机号码不能为空！");
		return false;
	};
	if(!$("#smscode").val().trim()) {
		mui.toast("验证码不能为空！");
		return false;
	};
	if(!$("#pwd1").val().trim()) {
		mui.toast("新输入密码不能为空！");
		return false;
	};
	if($("#pwd1").val()!=$("#pwd2").val()) {
		mui.toast("两次输入的密码不一致！");
		$("#pwd2").val("");
		return false;
	};
	if(!eg.phone.test($("#phone").val())) {
		mui.toast("手机号格式不正确！");
		$("#phone").val("");
		return false;
	}
	if(eg.passwd.test($("#pwd1").val())) {
		mui.toast("密码设置不符合要求！");
		$("#pwd1").val("");
		$("#pwd2").val("");
		return false;
	}
}
/**点击获取验证码**/
$("#getcode").on("tap",function(){
	var phoneNum = $("#phone").val();
	if(!eg.phone.test(phoneNum)) {
		mui.toast("手机号码格式不正确！");
		return;
	};
	eg.postAjax("search/mobile", {//1.首先验证该手机号是否已注册
		"_csrf":localStorage.getItem("csrf"),
		"mobile":$("#phone").val().trim()
		}, function(data) {
		if(data.status != "1") {//已注册--发送短信验证码
			eg.postAjax("captCha", {
				"_csrf":localStorage.getItem("csrf"),
				"mobile":$("#phone").val().trim()
				}, function(data) {
					if(data.status=="1"){
						$("#smscode").val(data.message);
					}
		//		if(data.resCode !== "0") {
		//			return;
		//		}else{											
		//			eg.postAjax("safe/sendVerificateMessage.do", {//发送短信
		//					"mobile": $("#phone").val(),
		//					"serviceId": "02009001",
		//					"smsType":"REGIST"
		//				}, function(data) {
		//					Countdown("getcode");
		//					mui.toast("验证码已发送");
		//			});
		//		}
			},function(data){
				if(data=="403") eg.getCsrf();
			});
		}else{//未注册
			mui.toast("请输入已注册手机号！");
			return;
		}
	},function(data){
		if(data=="403") eg.getCsrf();
	});
});
/**点击提交按钮**/
$("#oBtn").on("tap",function(){
	var params = {
		"_csrf":localStorage.getItem("csrf"),
		"mobile":$("#phone").val().trim(),
		"code":$("#smscode").val().trim(),
		"password":$("#pwd1").val().trim()
	};
	eg.postAjax("forget", params, function(data) {
		plus.nativeUI.toast("密码修改成功！", {
			duration: "short"
		});
//			mui.openWindow({
//				"url": "login.html",
//				"id": "login"
//			});
		mui.back();
	},function(data){
		if(data=="403") eg.getCsrf();
	});
});

//----------------上线要用的密码键盘代码start-------------------
var  forgetPasswordVal;
var  ReForgetPasswordVal;
//硬件监听
//document.addEventListener( "plusready", onPlusReady, false );
//function onPlusReady() { console.log("plusready");}

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