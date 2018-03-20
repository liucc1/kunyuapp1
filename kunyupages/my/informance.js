mui.init();
var ifFlag = false;
mui.plusReady(function(){
	$("#phone").val(localStorage.getItem("phone"));
})

//OCR
$(".afterInput").on('tap',function(){
	scanImage("0");
})
function scanImage(str){
	plus.pluginOpenIdcardScan.openIdcardScan(str, false, function(result) {
		if(result.status) {
			var message = result.message;
			var payload = result.payload;
			var url = "wechat/identify";
			var parameters = {
				"idCardImg": payload.picOne
			};	
			//调取OCR接口
			eg.postAjax(url, parameters, function(data) {
				//如果是0，填充信息后接着扫描身份证背面
				if(str == "0") {
					$("#name").val(data.name);
					$("#idNo").val(data.idCardNumber);
					scanImage('1');
				}else{
					ifFlag = true;
				}					
			});
		} else {
			alert("调用插件时发生异常。");
		}
	}, function(result) {
		alert(result);
	});
}

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
//	if(!ifFlag){
//		mui.toast("请拍摄身份证反面！");
//		return false;
//	}
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
