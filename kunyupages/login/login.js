(function() {
	mui.init({
		swipeBack: false//右滑退出
	});
	//0.预加载历史账户信息
	mui.plusReady(function(){
	 	//获取历史账号
		$("#phone").val(localStorage.getItem("phone"));
		
		//点击空白处页面下移
		$("body").on("tap",function(){
			plus.webview.currentWebview().setStyle({
				bottom: "0px" // 弹出软键盘时自动改变webview的高度
			});
		});
		//改变图标
		$("#phone").focus(function(){
			$("#phonePic").attr("src","../../images/person_blue.png")
		})
		$("#phone").blur(function(){
			$("#phonePic").attr("src","../../images/person_grey.png")
		})
		$("#pwd").focus(function(){
			$("#pwdPic").attr("src","../../images/lock_blue.png")
		})
		$("#pwd").blur(function(){
			$("#pwdPic").attr("src","../../images/lock_grey.png")
		})
	});
	/**登录之前校验**/
	function canLogin(){
		if(!$("#phone").val()) {
			mui.toast("手机号码不能为空");
			return false;
		};
		if(!$("#pwd").val()) {
			mui.toast("密码不能为空");
			return false;
		};
//		if(!eg.phone.test($("#phone").val())) {
//			mui.toast("手机号输入有误！");
//			return false;
//		};
//		if(!eg.passwd.test($("#pwd").val())) {
//			mui.toast("密码输入有误！");
//			return false;
//		};
		return true;
	}
	//1.点击登录按钮
	$("#oBtn").on("tap",function(){
		if(canLogin()){//初步校验通过，允许走登录逻辑
			eg.getToken("68720a30",function(data) {
				var s=data.split('"');
				var csrf=s[s.length-2];
				console.log("未登录时获取_csrf==="+csrf);
				isToLogin(csrf);
			});
		}
	});
	//2.点击忘记密码
	$("#forgetPassword").on("tap",function(){	
		mui.openWindow({
			url: "../pwdmanage/forgetpassword.html",
			id: "forgetpassword"
		});
	});
	//3.点击立即注册
	$("#register").on("tap",function(){	
		var custName = localStorage.getItem("user");
		if(!custName) {
			mui.openWindow({
				url: "../register/register.html",
				id: "register"
			})
		} else {
			mui.toast("您已经登录！");
		}
	}); 
	
	function isToLogin(csrf){ 
		var params = {
			"_csrf":csrf,
			"username": $("#phone").val().trim(),
			"password": $("#pwd").val().trim()
		}
		eg.postAjax("login",params, function(data) {
			if (JSON.stringify(data).indexOf('html')!='-1') {//返回页面信息
				mui.alert("您输入的用户名或密码不正确，或您未注册！");
			} else if(data.resCode==0){//mui.alert("登陆成功");
				//eg.tohomeindex();	//进入首页
				localStorage.setItem("phone",$("#phone").val().trim());
				mui.openWindow({
	                url:"../home/home.html",
	                id:"home"
	           	});
//				setTimeout(function(){
//	       	 		plus.webview.getWebviewById("login").close();
//	       	 	},500);
			}
		},function(data){
			alert("err==="+data);
		});
	}

})()

//-----------------上线要用的密码键盘-------------------------------
var passwordVal;
//硬件监听
//document.addEventListener( "plusready", onPlusReady, false );
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
$("#pwd1").click(function(){
	$("#dis_nubmer").hide();
	plus.pluginPGKeyboard.hideKeyboard();	
	$("#pwd").val("");
	passwordVal="";
	plus.pluginPGKeyboard.clearKeyboard("pwd");	
	plus.pluginPGKeyboard.openMD5Keyboard("pwd", "false", 0,20,"false","true","false","","",
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
								passwordVal = obj.cipherText==null?"":obj.cipherText;
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
	plus.webview.currentWebview().setStyle({
		bottom:"150px"
	})
});

