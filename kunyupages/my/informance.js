mui.init();

mui.plusReady(function(){
	$("#phone").val(localStorage.getItem("phone"));
})

//保存
$("#oBtn").on('tap',function(){
	var name = $("#name").val();
	var idNo = $("#idNo").val();
	var cardNo = $("#cardNo").val();
	var phone = $("#phone").val();
	var depositBank = $("#depositBank").val();
	if(isNullVal(name)){
		mui.toast("姓名不能为空！");
		return false;
	}
	if(!eg.name.test(name)){
		mui.toast("姓名格式不正确！");
		return false;
	}
	if(isNullVal(idNo)){
		mui.toast("身份证不能为空！");
		return false;
	}
	if(!eg.userIdCode(idNo)){
		mui.toast("身份证格式不正确！");
		return false;
	}
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
		depositBank:depositBank
	}
	eg.postAjax2("user/data", params, function(data){
		if(data.status == 1){
			mui.toast("已绑卡成功");
			plus.webview.currentWebview().close();
		}else{
			mui.toast(data.message);
		}
	},function(){
		
	})
})
