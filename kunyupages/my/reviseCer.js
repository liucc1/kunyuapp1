mui.init();

mui.plusReady(function(){
	var self = plus.webview.currentWebview();
	$("#name").val(self.name);
	$("#idNo").val(self.idNo);
})

$("#oBtn").on('tap',function(){
	var name = $("#name").val();
	var idNo = $("#idNo").val();
	var cardNo = $("#cardNo").val();
	var phone = $("#phone").val();
	var depositBank = $("#depositBank").val();
	if(isNullVal(cardNo)){
		mui.toast("银行卡号不能为空！");
		return false;
	}
	if(isNullVal(phone)) {
		mui.toast("手机号码不能为空！");
		return false;
	}
	if(!eg.phone.test(phone)) {
		mui.toast("手机号码格式不正确！");
		return false;
	}
	if(isNullVal(depositBank)) {
		mui.toast("开户行不能为空！");
		return false;
	}
	var params = {
		idNo:idNo,
		name:name,
		mobile:phone,
		cardNo:cardNo,
		depositBank:depositBank,
		city:"北京"
	}
	eg.postAjax2("user/data", params, function(data){
		if(data.status == 1){
			mui.toast("更换银行卡成功");
			plus.webview.currentWebview().opener().reload();
			plus.webview.currentWebview().close();
		}else{
			mui.toast(data.message);
		}
	},function(){
		
	})
})
