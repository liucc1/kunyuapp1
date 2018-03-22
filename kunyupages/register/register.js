mui.init({ swipeBack:false });
//遮罩
var mask = mui.createMask(function(){
	$(".dis_show").hide();
});
var  ifPlusKeyBoard = false;
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
/*点击获取验证码*/
$("#getcode").on("tap",function(){
	var phoneNum = $("#phone").val();
	if(!eg.phone.test(phoneNum)) {
		mui.toast("手机号码格式不正确！",{duration: 'short',type: 'div'});
		return;
	};
	eg.postAjax("search/mobile",{"mobile":phoneNum}, function(data) {
		if(data.status == "1"){
   			getSms();
		}else{
			mui.toast("手机号已存在，不可重复注册！",{duration: 'short',type: 'div'});
			return false;
		}
	});
}); 
function getSms(){
	eg.postAjax("captCha", {
		"mobile":$("#phone").val().trim()
	}, function(data) {
		if(data.status=="1"){
			Countdown("getcode");
			mui.toast("短信发送成功",{duration: 'short',type: 'div'});
		}
	},function(data){
		
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
	if(!ifPlusKeyBoard){//点击了密码控件
        mui.toast("请输入密码",{duration: 'short',type: 'div'});
        return;
    }	
	var ok = plus.pluginPGKeyboard.checkMatch("regPwd");
	if(!ok){
		mui.toast("密码格式不正确",{duration: 'short',type: 'div'});
		return;
	}		
	if(regPwdVal !== repeatRegPwdVal) {
		plus.nativeUI.toast("两次密码输入不一致", {
			duration: "short"
		});
		return;
	}
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
	if($("#checkbox").hasClass("icon-xuanzekuang")) {
		plus.nativeUI.toast("请先同意用户协议", {
			duration: "short"
		});
		return false;
	}
	return true;
}
/**6.点击注册按钮**/
$("#oBtn").on("tap",function(){
	$("#oBtn").attr("disabled","disabled")
 	if(!istoregister()){
 		$("#oBtn").removeAttr("disabled");
 		return
 	};
 	goRegister();
});
function goRegister(){
	var params = {
		"mobile":$("#phone").val().trim(),
		"code":$("#smscode").val().trim(),
		"password":regPwdVal,
		"city":$("#cityCode").val().trim()
	}
	eg.postAjax("register", params, function(data) {
		$("#oBtn").removeAttr("disabled");
		var status=data.status;
		if(status=='1'){
			mui.toast("注册成功！",{duration: 'short',type: 'div'});
			var curr = plus.webview.currentWebview();
			setTimeout(function(){
				curr.close();
			},800);
		}else if(status=='-2'){
			mui.toast("注册失败，用户已经存在！",{duration: 'short',type: 'div'});
		}else if(status=='-6'){
			mui.toast("验证码输入错误！",{duration: 'short',type: 'div'});
		}else{
			mui.toast("注册失败！",{duration: 'short',type: 'div'});
		}
	},function(data){
		$("#oBtn").removeAttr("disabled");
	});
}


//-----------------上线要用的密码键盘-------------------------------
var regPwdVal;
var repeatRegPwdVal;
//硬件监听
document.addEventListener( "plusready", onPlusReady, false );
function onPlusReady() {   

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
$("#pwd1").click(function(){
	ifPlusKeyBoard = true;
	plus.pluginPGKeyboard.hideKeyboard();
	$("#pwd1").val("");
	regPwdVal="";
	plus.pluginPGKeyboard.clearKeyboard("regPwd");	
	plus.pluginPGKeyboard.openMD5Keyboard("regPwd", "false", 0,20,"false","true","false","^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$","",
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
								document.getElementById('pwd1').value = obj.text==null?"":obj.text;
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

$("#pwd2").click(function(){
	plus.pluginPGKeyboard.hideKeyboard();
	$("#pwd2").val("");
	repeatRegPwdVal="";
	plus.pluginPGKeyboard.clearKeyboard("rereatRegPwd");	
	plus.pluginPGKeyboard.openMD5Keyboard("rereatRegPwd", "false", 0,20,"false","true","false","","",
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

