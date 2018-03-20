mui.init();
mui.plusReady(function(){
	$("#phone").val(localStorage.getItem("phone"));
})
$("#getcode").on('tap',function(){
	eg.postAjax("captCha", {
		"mobile":$("#phone").val().trim()
	}, function(data) {
		if(data.status=="1"){
			Countdown("getcode");
			mui.toast("短信发送成功");
		}
	},function(data){
		
	});
})
$("#oBtn").on('tap',function(data){
	if(!$("#smscode").val().trim()){
		mui.toast("验证码不可为空！");
		return false;
	}
	if(!$("#pwd").val().trim()){
		mui.toast("请输入支付密码！");
		return false;
	}
	if(!$("#pwd2").val().trim()){
		mui.toast("请再次输入支付密码！");
		return false;
	}
	if($("#pwd2").val().trim()!= $("#pwd").val().trim()){
		mui.toast("两次输入密码不一致！");
		return false;
	}
	var param = {
		"validCode":$("#smscode").val().trim(),
		"password":$("#pwd").val().trim()
	}
	eg.postAjax2("user/payment/pwd",param,function(data){
		alert(JSON.stringify(data));
	})
})