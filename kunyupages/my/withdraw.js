mui.init();
var totalMoney;
var k = document.getElementsByClassName("pwdDiv");
//遮罩
var mask = mui.createMask(function(){
	plus.webview.currentWebview().setStyle({
		bottom: "0px" // 弹出软键盘时自动改变webview的高度
	});
	$(".moni-alert").hide();
});
mui.plusReady(function(){
	totalMoney = plus.webview.currentWebview().totalMoney;
	$("#totalMoney").text(totalMoney);
	eg.ajax(eg.jrURL + "user/data.json", {}, 'get', function(data){
		var info = data.rows;
		$("#custName").val(info.name);
		$("#cutNo").val(info.cardNo);
		$("#address").val(info.depositBank);
	})	
})
/*全部提现*/
$(".span-footer").on('tap',function(){
	$("#money").val(totalMoney);
})
/*申请提现*/
$("#confirmBtn").on("tap",function(){
	var money = $("#money").val().trim();
	if(!money) {
		mui.toast("请输入提现金额",{duration: 'short',type: 'div'});
		return false;
	}
	if(money == "0"){
		mui.toast("提现金额不得等于零",{duration: 'long',type: 'div'});
		return false;
	}
	if(!eg.money.test(money)) {
		mui.toast("提现金额格式不正确",{duration: 'short',type: 'div'});
		return false;
	}
	if(parseInt(money) > parseInt(totalMoney)){
		mui.toast("申请提现金额不得大于全部金额！",{duration: 'short',type: 'div'});
		return false;
	}
	eg.postAjax2("user/query",{"type":"pmq"},function(data){
		if(data.status == "1"){
			if(data.data.pmq == "1"){
				withdraw();
			}else if(data.data.pmq == "0"){
				mui.toast("请先设置支付密码！",{duration: 'short',type: 'div'});
				mui.openWindow({
					url:"payPassword.html",
					id:"payPassword"
				})
			}
		}else{
			mui.toast(data.message,{duration: 'short',type: 'div'});
		}
	})
})

function withdraw(){
	/* 弹出框    */
	mask.show();
	$(".moni-alert").show().css("top","35%");	
	showKeyboard();
}

$("#sure").on("tap",function(){
	for(var i = 0; i < k.length; i++){
		k[i].innerHTML = "";
	}
	if(isNullVal(payPasswdVal)) {
		console_error("支付密码");
		return false;
	}
	var ok = plus.pluginPGKeyboard.checkMatch("payPassword");
	if(!ok){
    	mui.toast("支付密码格式不正确",{duration: 'short',type: 'div'});
    	return false;
   }	
	plus.webview.currentWebview().setStyle({
		bottom: "0px" // 弹出软键盘时自动改变webview的高度
	});
	mask.close();
	$(".moni-alert").hide();
	var params = {
		"amount":$("#money").val().trim(),
		"password": payPasswdVal
	}
	plus.nativeUI.showWaiting();
	payPasswdVal ="";
	eg.postAjax2("commission/extract",params,function(data){
			plus.nativeUI.closeWaiting();
			if(data.status == "1"){
				mui.toast("提现申请正在处理中，请耐心等待",{duration: 'short',type: 'div'});
				var curr = plus.webview.currentWebview();
				setTimeout(function(){
					curr.close();
				},800);
			}else{
				mui.toast(data.message,{duration: 'short',type: 'div'});
			}
	})
})

$("#cancel").on("tap",function(){
	plus.webview.currentWebview().setStyle({
		bottom: "0px" // 弹出软键盘时自动改变webview的高度
	});
	mask.close();
	$(".moni-alert").hide();
	for(var i = 0; i < k.length; i++){
		k[i].innerHTML = "";
	}
});

//-----------------上线要用的密码键盘-------------------------------
var payPasswdVal;//上线支付密码
//硬件监听
//document.addEventListener( "plusready", onPlusReady, false );
//function onPlusReady() {
//  console.log("plusready");
//}
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

function showKeyboard(){	
	plus.pluginPGKeyboard.hideKeyboard();	
	for(var i = 0; i < k.length; i++){
		k[i].innerHTML = "";
	}
	payPasswdVal="";
	plus.pluginPGKeyboard.clearKeyboard("payPassword");	
	plus.pluginPGKeyboard.openMD5Keyboard("payPassword", "true",0,6,"false","true","false","^[0-9]{6}$","",
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
								obj.text==null?"":obj.text;
								var afterLen = obj.text.length;
								for(var i = 0; i < k.length; i++){
									k[i].innerHTML = "";
								}
								for(var i = 0; i < afterLen; i++){
									k[i].innerHTML = "●";
								}
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
	plus.webview.currentWebview().setStyle({
		bottom:"0px"
	});
}

$("#payPassword").click(function(){
	showKeyboard();
});