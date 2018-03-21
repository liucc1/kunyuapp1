mui.init();

/**点击获取验证码**/
$("#getcode").on("tap",function(){
	var phoneNum = $("#phone").val();
	if(!eg.phone.test(phoneNum)) {
		mui.toast("手机号码格式不正确！",{duration: 'short'});
		return;
	};
	var params = {
		"mobile":phoneNum
	}
	eg.postAjax("search/mobile",params, function(data) {
		if(data.status!="1"){
			mui.toast("手机号已注册",{duration: 'short'});
		}else{
			getSms();
		}
	});
});
function getSms(){
	eg.postAjax("captCha", {
		"mobile":$("#phone").val().trim()
	}, function(data) {
		if(data.status=="1"){
			mui.toast("验证码已发送至您的手机",{duration: 'short'});
			Countdown('getcode');
		}
	},function(data){

	});
}

$("#oBtn").on('tap',function(){
	var phone = $("#phone").val();
	var smscode = $("#smscode").val();
	if(isNullVal(phone)) {
		mui.toast("手机号码不能为空！",{duration: 'short'});
		return false;
	}
	if(!eg.phone.test(phone)) {
		mui.toast("手机号码格式不正确！",{duration: 'short'});
		return false;
	}
	if(isNullVal(smscode)) {
		mui.toast("验证码不能为空！",{duration: 'short'});
		return false;
	}
	var params = {
		"mobile":phone
	}
	eg.postAjax("search/mobile",params, function(data) {
		if(data.status!="1"){
			mui.toast("手机号已注册",{duration: 'short'});
		}else{
			var param = {
				validCode:smscode,
				mobile:phone
			}
			eg.postAjax2("user/mobile", param, function(data){
				if(data.status == 1){
					mui.toast("手机号更换成功",{duration: 'short'});
					localStorage.setItem("phone",phone);
					plus.webview.getWebviewById("./my.html").reload();
					plus.webview.currentWebview().opener().reload();
					plus.webview.currentWebview().close();
				}
			})
		}
	});
})
