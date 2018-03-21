mui.init();

mui.plusReady(function(){
	var self = plus.webview.currentWebview();
	$("#name").val(self.name);
	$("#phone").val(localStorage.getItem("phone").replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'));
})

/**点击获取验证码**/
$("#getcode").on("tap",function(){
	var phoneNum = localStorage.getItem("phone");
	eg.postAjax("captCha", {
		"mobile":phoneNum
	}, function(data) {
		if(data.status=="1"){
			Countdown("getcode");
			mui.toast("短信发送成功",{duration: 'short'});
		}else{
			mui.toast(data.message,{duration: 'short'});
		}
	},function(data){
		
	});
})

$("#oBtn").on('tap',function(){
	var name = $("#name").val();
	var idNo = $("#idNo").val();
	var cardNo = $("#cardNo").val();
	var phone = $("#phone").val();
	var smscode = $("#smscode").val();
	var depositBank = $("#depositBank").val();
	if(isNullVal(cardNo)){
		mui.toast("银行卡号不能为空！",{duration: 'short'});
		return false;
	}
	if(isNullVal(smscode)) {
		mui.toast("验证码不能为空！",{duration: 'short'});
		return false;
	}
	if(isNullVal(depositBank)) {
		mui.toast("开户行不能为空！",{duration: 'short'});
		return false;
	}
	var params = {
		idNo:idNo,
		name:name,
		cardNo:cardNo,
		depositBank:depositBank,
		validCode:smscode
	}
	eg.postAjax2("user/data", params, function(data){
		if(data.status == 1){
			mui.toast("更换银行卡成功",{duration: 'short'});
			plus.webview.currentWebview().opener().reload();
			plus.webview.currentWebview().close();
		}else{
			mui.toast(data.message,{duration: 'short'});
		}
	},function(){
		
	})
})
