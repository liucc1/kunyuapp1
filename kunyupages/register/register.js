//mui初始化
mui.init({ swipeBack:false });
//遮罩
var mask = mui.createMask(function(){
	$(".dis_show").hide();
});
//城市选项弹出框的设计
mui.plusReady(function() {
	var userPicker = new mui.PopPicker();
	userPicker.setData(Json.citys);
	$("#cityCode").on("tap",function(){
		document.activeElement.blur();
		var $this = $(this);
		userPicker.show(function(items) {
			$this.val( items[0].text );
			$this.attr("data-key", items[0].value )
		});
	});
	//获取token(每次进入该页面均重新获取)
	eg.getCsrf();
	//不存在则重新获取
 	//if (!localStorage.getItem("csrf")) {eg.getCsrf();}	
});

/**点击获取验证码**/
$("#getcode").on("tap",function(){
	var phoneNum = $("#phone").val();
	if(!eg.phone.test(phoneNum)) {
		mui.toast("手机号码格式不正确！");
		return;
	};
	var csrf=localStorage.getItem("csrf");
 	getSms(csrf);
});
function getSms(csrf){
	eg.postAjax("captCha", {
		"_csrf":csrf,
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
}
/**用户协议书打开、关闭**/
$("#alertBtn").on("tap",function(){
	mask.show();
	$(".dis_show").show();
});
$(".close-img").on("tap",function(){
	mask.close();
	$(".dis_show").hide();
});
/**点击同意协议事件**/
$("#checkbox").on("tap",function(){
	if($(this).hasClass("icon-selected")){
		$(this).addClass("icon-xuanzekuang");
		$(this).removeClass("icon-selected");
	}else{
		$(this).removeClass("icon-xuanzekuang");
		$(this).addClass("icon-selected");
	}	
});
/**注册按钮置可以点击状态**/
function istoregister(){
	if(!$("#phone").val().trim()) {
		plus.nativeUI.toast("手机号码不能为空！", {
			duration: "short"
		});
		return false;
	};
	if(!$("#pwd1").val().trim()) {
		plus.nativeUI.toast("密码不能为空！", {
			duration: "short"
		});
		return false;
	};
	if(!$("#pwd2").val().trim()) {
		plus.nativeUI.toast("再次输入密码不能为空！", {
			duration: "short"
		});
		return false;
	};
	if(!$("#smscode").val().trim()) {
		plus.nativeUI.toast("验证码不能为空！", {
			duration: "short"
		});
		return false;
	};
	if(!eg.phone.test($("#phone").val())) {
		$("#phone").val("");
		plus.nativeUI.toast("手机号格式不正确！", {
			duration: "short"
		});
		return false;
	}
	if(!eg.passwd.test($("#pwd1").val())) {
		$("#pwd1").val("");
		$("#pwd2").val("");
		plus.nativeUI.toast("密码不符合规则！", {
			duration: "short"
		});
		return false;
	}
	if($("#pwd1").val()!=$("#pwd2").val()) {
		$("#pwd2").val("");
		plus.nativeUI.toast("您两次输入的密码不一致！", {
			duration: "short"
		});
		return false;
	}
	if(!$("#checkImg").hasClass("icon-xuanzekuang")) {
		plus.nativeUI.toast("请先同意用户协议", {
			duration: "short"
		});
		return false;
	}
	return true;
}
/**6.点击注册按钮**/
//var  ifPlusKeyBoard = false;
$("#oBtn").on("tap",function(){
	$("#oBtn").attr("disabled","disabled")
 	if(!istoregister()){
 		$("#oBtn").removeAttr("disabled");
 		return
 	};
 	//获取本地存储的token
 	var csrf=localStorage.getItem("csrf");
 	goRegister(csrf);
});
function goRegister(csrf){
	var params = {
		"_csrf":csrf,
		"mobile":$("#phone").val().trim(),
		"code":$("#smscode").val().trim(),
		"password":$("#pwd1").val().trim(),
		"city":$("#cityCode").val().trim()
	}
	eg.postAjax("register", params, function(data) {
		$("#oBtn").removeAttr("disabled");
		var status=data.status;
		if(status=='1'){
			mui.alert("注册成功！");
			plus.webview.currentWebview().close();//关闭注册页，回到登录页。
			mui.back();
		}else if(status=='-2'){
			mui.alert("注册失败，用户已经存在！");
		}else if(status=='-6'){
			mui.alert("验证码输入错误！");
		}else{
			mui.alert("注册失败！");
		}
	},function(data){
		$("#oBtn").removeAttr("disabled");
		//alert(data);
		if(data=="403") eg.getCsrf();
	});
}


//-----------------上线要用的密码键盘-------------------------------
var regPwdVal;
var repeatRegPwdVal;
//硬件监听
//document.addEventListener( "plusready", onPlusReady, false );
function onPlusReady() {   
	//加载用户协议
	eg.postAjax("local/queryProtocol.do", {
			"protType": "01",
			"serviceId": "02000002"
		}, function(data) {
			$(".agreement").html(data.protText);
		});
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
	ifPlusKeyBoard = true;
	plus.pluginPGKeyboard.hideKeyboard();
	$("#pwd").val("");
	regPwdVal="";
	plus.pluginPGKeyboard.clearKeyboard("regPwd");	
	plus.pluginPGKeyboard.openMD5Keyboard("regPwd", "false", 1,20,"false","true","false","^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$","",
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
								regPwdVal = obj.cipherText==null?"":obj.cipherText;
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
	repeatRegPwdVal="";
	plus.pluginPGKeyboard.clearKeyboard("rereatRegPwd");	
	plus.pluginPGKeyboard.openMD5Keyboard("rereatRegPwd", "false", 1,20,"false","true","false","","",
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
								repeatRegPwdVal = obj.cipherText==null?"":obj.cipherText;
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

