mui.init({
	swipeBack: true //启用右滑关闭功能
});
/***
 * 点击获取验证码
 */
$("#getcode").on("tap",function(){
	alert("fff");
	var phoneNum = $("#phone").val().trim();
	eg.getCsrf();
	var csrf=localStorage.getItem("csrf");
	plus.nativeUI.showWaiting();
	eg.postAjax("captCha", {
		"_csrf":csrf,
		"mobile": phoneNum
		}, function(data) {
//		if(data.resCode !== "0") {
			plus.nativeUI.closeWaiting();
//			return;
//		}else{											
//			eg.postAjax("safe/sendVerificateMessage.do", {
//					"mobile": $("#phone").val(),
//					"serviceId": "02009001",
//					"smsType":"REGIST"
//				}, function(data) {
//					plus.nativeUI.closeWaiting();
//					Countdown("getcode");
//					mui.toast("验证码已发送");
//			});
//		}
	});
});
//$('#oBtn').click(function() {
//	var beforPwd = $('#beforPwd').val();
//	var afterPwd = $('#afterPwd').val();
//	var afterPwd2 = $('#afterPwd2').val();
//	var ok = plus.pluginPGKeyboard.checkMatch("afterPwd");
//	if(!ok){
//		mui.toast("密码格式错误");
//		return false;
//	}
//	if(afterPwdVal != afterPwdVal2){
//		mui.toast("两次密码不一致", { duration: "short" });
//		return;
//	}
//	if(beforPwd == afterPwd){
//		mui.toast("新密码与旧密码不能相同",{ duration: "short" });
//		return false;
//	}
//	if(plus.os.name == 'iOS'){
//		beforPwdVal = beforPwdVal.toUpperCase();
//		afterPwdVal = afterPwdVal.toUpperCase();
//	}
//	
//	var parameters = {
//		"serviceId": "03001010",
//  		"beforPwd": beforPwdVal,
//  		"afterPwd": afterPwdVal
//	};
//	plus.nativeUI.showWaiting();
//	//调取提交接口
//	var url = "custManager/modifyPassword.do";
//	eg.postAjax(url, parameters, function(data) {
//
//			var parameters2 = {
//				"serviceId": "03001011"
//			};
//	
//		var url = "custManager/custManagerExit.do";
//			eg.postAjax(url, parameters2, function(data) {
//				plus.nativeUI.closeWaiting();
//				mui.toast("密码修改成功，请重新登录!");
//				eg.toLoginPage();
//			});			
//	});
//	
//});


///***
// * 退出登录
// */
//$('#exitBtn').click(function() {
//	
//		var parameters = {
//			"serviceId": "03001011"
//		};
//	
//	var url = "custManager/custManagerExit.do";
//	eg.postAjax(url, parameters, function(data) {			
//		 localStorage.clear();	
//	});	
//	
//});

//----------------上线要用的密码键盘代码start-------------------
//var  beforPwdVal;
//var afterPwdVal;
//var afterPwdVal2;
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
//$("#beforPwd").click(function(){
//	plus.pluginPGKeyboard.hideKeyboard();
//	$("#beforPwd").val("");
//	plus.pluginPGKeyboard.openMD5Keyboard("beforPwd", "false", 0,16,"true","true","true","","",
//			function(result) {
//					if (result) {
//						if (result.status) {
//							var json=result.payload;
//							var obj =  $.parseJSON(json);
//							var tag;
//							if(typeof result.message =='string'){
//								message = $.parseJSON(result.message);
//								tag = message.tag;
//							}else{
//								tag = result.message.tag;
//							}					
//							if(tag !== "done"){
//								document.getElementById('beforPwd').value = obj.text==null?"":obj.text;
//								beforPwdVal = obj.cipherText==null?"":obj.cipherText;
//							}	
//						} else {
//							alert(result.message);
//						}
//					} else {
//						alert("调用插件时发生异常。");
//					}
//				}, function(result) {
//					alert(result);
//				});
//});

//$("#afterPwd").click(function(){
//	plus.pluginPGKeyboard.hideKeyboard();
//	$("#afterPwd").val("");
//	plus.pluginPGKeyboard.openMD5Keyboard("afterPwd", "false", 0,12,"true","true","true","^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$","",
//			function(result) {
//					if (result) {
//						if (result.status) {
//							var json=result.payload;
//							var obj =  $.parseJSON(json);
//							var tag;
//							if(typeof result.message =='string'){
//								message = $.parseJSON(result.message);
//								tag = message.tag;
//							}else{
//								tag = result.message.tag;
//							}					
//							if(tag !== "done"){
//								document.getElementById('afterPwd').value = obj.text==null?"":obj.text;
//								afterPwdVal = obj.cipherText==null?"":obj.cipherText;
//							}	
//						} else {
//							alert(result.message);
//						}
//					} else {
//						alert("调用插件时发生异常。");
//					}
//				}, function(result) {
//					alert(result);
//				});
//});

//$("#afterPwd2").click(function(){
//	plus.pluginPGKeyboard.hideKeyboard();
//	$("#afterPwd2").val("");
//	plus.pluginPGKeyboard.openMD5Keyboard("afterPwd2", "false", 0,12,"true","true","true","","",
//			function(result) {
//					if (result) {
//						if (result.status) {
//							var json=result.payload;
//							var obj =  $.parseJSON(json);
//							var tag;
//							if(typeof result.message =='string'){
//								message = $.parseJSON(result.message);
//								tag = message.tag;
//							}else{
//								tag = result.message.tag;
//							}					
//							if(tag !== "done"){
//								document.getElementById('afterPwd2').value = obj.text==null?"":obj.text;
//								afterPwdVal2 = obj.cipherText==null?"":obj.cipherText;	
//							}
//						} else {
//							alert(result.message);
//						}
//					} else {
//						alert("调用插件时发生异常。");
//					}
//				}, function(result) {
//					alert(result);
//				});
//});