mui.init({
	swipeBack: true //启用右滑关闭功能
});
var phone = localStorage.getItem("phone");
//硬件监听
document.addEventListener( "plusready", onPlusReady, false );
function onPlusReady() {
    console.log("plusready");
}
$('#oBtn').click(function() {
//	var oldPwd = $('#oldPwd').val();
//	var newPwd1 = $('#newPwd1').val();
//	var newPwd2 = $('#newPwd2').val();
	if(!beforPwdVal) {
		mui.toast("旧登录密码不能为空！");
		return false;
	};
	if(!afterPwdVal) {
		mui.toast("新登录密码不能为空！");
		return false;
	};
	var ok = plus.pluginPGKeyboard.checkMatch("afterPwd");
	if(!ok){
    	mui.toast("您输入的新密码格式不正确");
    	return false;
   	}
	if(beforPwdVal == afterPwdVal){
		mui.toast("新密码与旧密码不能相同！");
		return false;
	}
	if(afterPwdVal != afterPwdVal2){
		mui.toast("两次密码不一致", { duration: "short" });
		return;
	}
	var params = {	
		"oldPass":beforPwdVal,
		"newPass":afterPwdVal,
		"repeatNewPass":afterPwdVal2
	}
	eg.postAjax2("chgpass",params, function(data) {
		if(data.status == "1" ){
			mui.toast("密码修改成功，请重新登录");
			plus.webview.currentWebview().close();
			plus.webview.getElementById("my").reload();
		}
	},function(data){
		
	});
})

//----------------上线要用的密码键盘代码start-------------------
var beforPwdVal;
var afterPwdVal;
var afterPwdVal2;

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
$("#oldPwd").click(function(){
	plus.pluginPGKeyboard.hideKeyboard();
	$("#oldPwd").val("");
	plus.pluginPGKeyboard.openMD5Keyboard("beforPwd", "false", 0,20,"true","true","true","","",
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
							if(tag !== "done"){
								document.getElementById('oldPwd').value = obj.text==null?"":obj.text;
								beforPwdVal = obj.cipherText==null?"":obj.cipherText;
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

$("#newPwd1").click(function(){
	plus.pluginPGKeyboard.hideKeyboard();
	$("#newPwd1").val("");
	plus.pluginPGKeyboard.openMD5Keyboard("afterPwd", "false", 0,20,"true","true","true","^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$","",
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
							if(tag !== "done"){
								document.getElementById('newPwd1').value = obj.text==null?"":obj.text;
								afterPwdVal = obj.cipherText==null?"":obj.cipherText;
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

$("#newPwd2").click(function(){
	plus.pluginPGKeyboard.hideKeyboard();
	$("#newPwd2").val("");
	plus.pluginPGKeyboard.openMD5Keyboard("afterPwd2", "false", 0,20,"true","true","true","","",
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
							if(tag !== "done"){
								document.getElementById('newPwd2').value = obj.text==null?"":obj.text;
								afterPwdVal2 = obj.cipherText==null?"":obj.cipherText;	
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