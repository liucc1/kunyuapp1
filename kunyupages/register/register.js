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
});
/**1.手机号码聚焦离焦**/
$("#phone").focus(function(){//获得焦点
	$("#i1").css("display","none");
});
$("#phone").blur(function(){//失去焦点
	var phoneNum = $("#phone").val();
	if(eg.phone.test(phoneNum)) {
		$("#i1").css("display","none");
		$("#getcode").removeAttr("disabled");
//		$("#getcode").css("border","1px solid #F3213C");
//		$("#getcode").css("background-color","#F3213C");
	}else{
//		$("#getcode").css("border","1px solid #C0C0C0");
//		$("#getcode").css("background-color","#C0C0C0");
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
$("#pwd2").focus(function(){//获得焦点
	$("#i3").css("display","none");
});
$("#pwd2").blur(function(){//失去焦点
	var pwd1 = $("#pwd1").val();
	var pwd2 = $("#pwd2").val();
	if(pwd1==pwd2) {
		$("#i3").css("display","none");
	}else{
		mui.toast("您两次输入密码不一致！");
		$("#i3").css("display","block");
		document.getElementById('pwd2').value="";
	}
});
/**4.点击获取验证码**/
$("#getcode").on("tap",function(){
	var phoneNum = $("#phone").val();
	if(!eg.phone.test(phoneNum)) {
		mui.toast("手机号码格式不正确！");
		return;
	};
	plus.nativeUI.showWaiting();
	eg.postAjax("user/checkMobile.do", {
		"mobile": phoneNum,
		"serviceId": "02001001"
		}, function(data) {
		if(data.resCode !== "0") {
			plus.nativeUI.closeWaiting();
			return;
		}else{											
			eg.postAjax("safe/sendVerificateMessage.do", {
					"mobile": $("#phone").val(),
					"serviceId": "02009001",
					"smsType":"REGIST"
				}, function(data) {
					plus.nativeUI.closeWaiting();
					Countdown("getcode");
					mui.toast("验证码已发送");
			});
		}
	});
});
/**5.注册按钮置可以点击状态**/
function istoregister(){
	var t1=eg.phone.test($("#phone").val());
	var t2=eg.passwd.test($("#pwd1").val());
	var t3=$("#pwd1").val()==$("#pwd2").val();
	var t4=$("#smscode").val().trim();
	if(t1&&t2&&t3&&t4) {
		return true;
	}
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
	if($("#checkImg").hasClass("nocheck")){
		$("#checkImg").attr("src","../../images/checkbox_empty.png");//lcc选中图片的颜色应该调整？？
		$("#checkImg").removeClass("nocheck");
	}else{
		$("#checkImg").attr("src","../../images/checkbox_chexk.png");
		$("#checkImg").addClass("nocheck");
		if (istoregister()) {
			$("#oBtn").removeAttr("disabled");
		}else{
			$("#oBtn").attr("disabled","disabled");
		}
	}	
})
/**6.点击注册按钮**/
var  ifPlusKeyBoard = false;
$("#oBtn").on("tap",function(){
	if(!$("#phone").val().trim()) {
		plus.nativeUI.toast("手机号码不能为空", {
			duration: "short"
		});
		return;
	};
	if(!$("#smscode").val().trim()) {
		plus.nativeUI.toast("验证码不能为空", {
			duration: "short"
		});
		return;
	};
//  if(!ifPlusKeyBoard){//点击了密码控件
//      mui.toast("请输入密码");
//      return;
//	}
//	var ok = plus.pluginPGKeyboard.checkMatch("regPwd");
//	if(!ok){
//		mui.toast("密码格式不正确");
//		return;
//	}
//	if(regPwdVal !== repeatRegPwdVal) {
//		plus.nativeUI.toast("两次密码输入不一致", {
//			duration: "short"
//		});
//		return;
//	}
//	if(plus.os.name == 'iOS'){
//		regPwdVal = regPwdVal.toUpperCase();
//		repeatRegPwdVal = repeatRegPwdVal.toUpperCase();
//	}
	if(!$("#pwd2").val().trim()) {
		plus.nativeUI.toast("第二次密码不能为空", {
			duration: "short"
		});
		return;
	};
	if($("#checkImg").hasClass("nocheck")) {
		plus.nativeUI.toast("请先同意用户协议", {
			duration: "short"
		});
		return;
	}
	var params = {
		serviceId: "02001002",
		mobile: $("#phone").val().trim(),
		password: regPwdVal,
		passwordConfirm: $("#doublePwd").val().trim(),
		verifyCode: $("#queryCode").val().trim(),
		serviceProtNo: "gggh"
	}
	plus.nativeUI.showWaiting(); //增加等待框
	eg.postAjax("user/userRegister.do", params, function(data) {
		plus.nativeUI.closeWaiting(); //关闭等待框
		var user = JSON.stringify(data);
		localStorage.setItem("user", user);
		localStorage.setItem("mobileAccount", data.mobile);
		var userList = localStorage.getItem("userList");
		userList = JSON.parse(userList);
		//存储历史账户
		if(!userList){
			userList = [];
			userList.push($("#phone").val());
		}
		$(userList).each(function(key, val) {
			if(val == $("#phone").val()){					
				userList.splice(key, 1);
			}
		});
		userList.unshift($("#phone").val());
		if(userList.length>3){//最多保留最近3条历史记录
			userList.pop();
		}
		localStorage.setItem("userList",JSON.stringify(userList));//历史users信息存入本地				
		eg.toPersonalInformationHome();	//回到首页
	});
});


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

