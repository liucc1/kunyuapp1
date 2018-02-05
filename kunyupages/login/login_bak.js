(function() {
	mui.init({
		swipeBack: false//右滑退出
	});
	//0.预加载历史账户信息
	mui.plusReady(function(){
		historyUser();
		// 下拉账号
		$("#historyNub").on("tap",function(){		
			$(".historyList").show();
			if($(".historyList li").length > 0){
				$(".disbl").removeClass("dis_bor_top");
			}
		});
		//点击空白处页面下移
		$("body").on("tap",function(){
			plus.webview.currentWebview().setStyle({
				bottom: "0px" // 弹出软键盘时自动改变webview的高度
			});
		});
		//改变图标
		$("#phone").focus(function(){
			$("#phonePic").attr("src","../images/person_blue.png")
		})
		$("#phone").blur(function(){
			$("#phonePic").attr("src","../../images/person_grey.png")
		})
		$("#pwd").focus(function(){
			$("#pwdPic").attr("src","../images/lock_blue.png")
		})
		$("#pwd").blur(function(){
			$("#pwdPic").attr("src","../../images/lock_grey.png")
		})
	});
	
	//1.当输入账号密码完成后，登录按钮可点击
	$("#phone").blur(function(){
		var t1=$("#phone").val().trim();
		var t2=$("#pwd").val().trim();
		if(t1&&t2){
			$("#oBtn").removeAttr("disabled");
		}else{
			$("#oBtn").attr("disabled","disabled");
		}
	});
	$("#pwd").blur(function(){
		var t1=$("#phone").val().trim();
		var t2=$("#pwd").val().trim();
		if(t1&&t2){
			$("#oBtn").removeAttr("disabled");
		}else{
			$("#oBtn").attr("disabled","disabled");
		}
	});
	//3.点击登录按钮
	$("#oBtn").on("tap",function(){
		if(canLogin()){//初步校验通过，允许走登录逻辑
			alert(1);
		}
	});
	//4.点击忘记密码
	$("#forgetPassword").on("tap",function(){	
		mui.openWindow({
			url: "../pwdmanage/forgetpassword.html",
			id: "forgetpassword"
		});
	});
	//5.点击立即注册
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
	/**历史账户**/
	var userList = localStorage.getItem("userList");
		userList = JSON.parse(userList);
	/**加载登录过的客户账号**/
	function historyUser(){
		$("#usersList").html("");
		if(userList){
			$("#phone").val(userList[0]);
			var ul = $("#usersList");
			$(userList).each(function(key, val) {
				var html = '<li><span class="nub">'+val+'</span><span class="move_this">x</span></li>'
					ul.append(html);
			});
			$(".nub").on("tap",function(event){
				event.stopPropagation();
				var thistext = $(this).text();
				$("#phone").val(thistext);
				$("#dis_nubmer").hide();
			});
			$(".move_this").on("tap",function(event){
				event.stopPropagation();
				var thistext = $(this).siblings("span")[0].innerText;
				$(userList).each(function(key, val) {
					if(val == thistext){
						userList.splice(key,1);
						localStorage.setItem("userList",JSON.stringify(userList));
						return false;
					}
				});
				historyUser();			
			});
		}
	}
	/**图片验证码,暂未用**/
	function getImageCode(){
		var timestamp = (new Date()).valueOf();
		var  srcUrl = eg.jrURL+"safe/verifyImage.do?clientId="+plus.device.uuid+"&time="+timestamp;
		$("#imgCode").attr("src",srcUrl);
	}
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
		if(!eg.phone.test($("#phone").val())) {
			mui.toast("手机号输入有误！");
			return false;
		};
		if(!eg.passwd.test($("#pwd").val())) {
			mui.toast("密码输入有误！");
			return false;
		};
	}
	/**登录逻辑**/
	var num;
    function toLogin(){
    	//1.用户输入检索输错密码几次
		var parameters = {
			"serviceId": "02001011",
			"mobile": $("#phone").val()
		};
		var url = "user/queryFailLoginCount.do";
		plus.nativeUI.showWaiting();
		eg.postAjax(url, parameters, function(data) {
			plus.nativeUI.closeWaiting();
			num = data.failCount;				
			if(num >= 3) {
				mui.toast("您输入的密码次数已超3次！");				
			}else{
				isToLogin();
			}
		});
    }
	function isToLogin(){
		var params = {
			"mobile": $("#phone").val(),
			"password": passwordVal,
			"clientId":plus.device.uuid,
			"verifyCode": $("#yzm").val(),
			"serviceId": "02001003"
		}
		/** 登录*/
		plus.nativeUI.showWaiting();
		eg.generalPostAjax("user/userLogin.do",params, function(data) {
			plus.nativeUI.closeWaiting();	
				
				if(data.failCount > 2) {
						mui.toast(data.resMsg);
						getImageCode();
						$("#tuxinpho").show();
						return;
				}else{
					$("#tuxinpho").hide();
				}
				if(data.resCode !== "0") {
					mui.toast(data.resMsg);
					return;
				}
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
				if(userList.length>3){
					userList.pop();
				}
				localStorage.setItem("userList",JSON.stringify(userList));//历史users信息存入本地				
				localStorage.setItem("user", JSON.stringify(data));
				localStorage.setItem("mobileAccount", data.mobile);
				localStorage.setItem("gesturePasswordErrorCount","0");
				if(data.loginMark == "1"){
					//强制修改登录密码
	           		mui.openWindow({
						url : "../customerInfo/modifyLoginPassword.html",
						id: "modifyLoginPassword",
						extras:{
							force:true
						}
					});
					setTimeout(function(){
						plus.webview.currentWebview().close();
					},1000);
				}else{
					var personPage = plus.webview.getWebviewById("../customerInfo/personalInformationHome.html");
					if(personPage){
						personPage.reload();
					}	
					var gesturePasswordLogin = plus.webview.getWebviewById("gesturePasswordLogin");
					if(gesturePasswordLogin){
						gesturePasswordLogin.close();
					}
					if(pageId =="certification"){//特殊情况，如果是实名认证
							eg.postAjax("customer/queryAccountStatus.do", {
									"serviceId": "02005019"
									}, function(data) {
										setTimeout(function(){
															plus.webview.currentWebview().close();
														},1000);
										if(data.status != 90) {
											var details = plus.webview.getLaunchWebview();
											mui.fire(details,"trige",{});
										}else{
											
											mui.openWindow({
												"url": "../customerInfo/certification.html",
												"id": "certification"
											});	
										}
							});					
					}else if(pageId =="personalInformationHome"){//个人中心----目前修改手机号用
						eg.toPersonalInformationHome();
					}else{
													
								if(destinationPage.length>0){
									plus.webview.currentWebview().close();
									var  thisPage = plus.webview.getWebviewById(pageId);
									if(thisPage){
										thisPage.show();
										thisPage.reload();
									}else{								
										mui.openWindow({
											url : destinationPage,
											id: pageId
										});									
									}
								}else{
									var fatherPage = plus.webview.currentWebview().opener();
	                                if(fatherPage.id == "../customerInfo/myAcont.html"){
	                                	fatherPage.reload();
	                                }
									plus.webview.currentWebview().close();
								}
					
				}
			}
				
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

