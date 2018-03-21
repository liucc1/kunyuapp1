mui.init();
$(function(){
	$('#idNo').blur(function(){
		var custName = $('#name').val();
		var idNo = $('#idNo').val();
		if(isNullVal(idNo)){
			mui.toast("身份证不能为空！",{
						duration: 'short',
						type: 'div'
					});
			return false;
		}
		if(!eg.userIdCode(idNo)){
			mui.toast("身份证格式不正确！",{
						duration: 'short',
						type: 'div'
					});
			return false;
		}	
		var params = {
			"value":idNo
		}
		eg.postAjax("customer/valid/idNo",params, function(data) {
			if(data.status!="1"){
				mui.toast(data.message,{
						duration: 'short',
						type: 'div'
					});
				return false;
			}
		});
	})
	$('#phone').blur(function(){
		var phone = $("#phone").val();
		var params = {
			"value":phone
		}
		eg.postAjax("customer/valid/mobile",params, function(data) {
			if(data.status!="1"){
				mui.toast("该手机号已注册！",{
						duration: 'short',
						type: 'div'
					});
				return false;
			}
		});
	})
})
mui.plusReady(function(){
	
})
//下一步
$("#oBtn").on('tap',function(){
	var custName = $('#name').val();
	var idNo = $('#idNo').val();
	var nation = $('#nation').val();
	var address = $('#address').val();
	var issueAuthority = $('#issued_by').val();
	var avalDate = $('#valid_date').val();
	var phone = $("#phone").val();
	var validityCode = $("#validityCode").val();
	if(isNullVal(custName)){
		mui.toast("姓名不能为空！",{
						duration: 'short',
						type: 'div'
					});
		return false;
	}
	if(!eg.name.test(custName)){
		mui.toast("姓名格式不正确！",{
						duration: 'short',
						type: 'div'
					});
		return false;
	}
	if(isNullVal(idNo)){
		mui.toast("身份证不能为空！",{
						duration: 'short',
						type: 'div'
					});
		return false;
	}
	if(!eg.userIdCode(idNo)){
		mui.toast("身份证格式不正确！",{
						duration: 'short',
						type: 'div'
					});
		return false;
	}
	if(isNullVal(address)){
		mui.toast("住址不能为空！",{
						duration: 'short',
						type: 'div'
					});
		return false;
	}
	if(!eg.address.test(address)){
		mui.toast("住址格式不正确！",{
						duration: 'short',
						type: 'div'
					});
		return false;
	}
	if(isNullVal(issueAuthority)){
		mui.toast("身份证签发机关不能为空！",{
						duration: 'short',
						type: 'div'
					});
		return false;
	}
	var  singerIDReg =  /^[\u4E00-\u9FA5]{2,30}$/;//
	if(!singerIDReg.test(issueAuthority)){
		mui.toast("身份证签发机关格式不正确！",{
						duration: 'short',
						type: 'div'
					});
		return false;
	}
	if(isNullVal(avalDate)){
		mui.toast("身份证有效日期不能为空！",{
						duration: 'short',
						type: 'div'
					});
		return false;
	}
	var dateReg = /^\d{4}.(0|1)\d.(0|1|2|3)\d-(\d{4}.(0|1)\d.(0|1|2|3)\d)|长期$/;
	if(!dateReg.test(avalDate)){		
		mui.toast("身份证有效日期格式不正确！",{
						duration: 'short',
						type: 'div'
					});
		return false;
	}
	if(isNullVal(phone)) {
		mui.toast("手机号码不能为空！",{
						duration: 'short',
						type: 'div'
					});
		return false;
	};
	if(!eg.phone.test(phone)) {
		mui.toast("手机号码格式不正确！",{
						duration: 'short',
						type: 'div'
					});
		return false;
	};
	var uploadField = {
		"name":custName,
		"idNo":idNo,
		"mobile":phone
	}
	var params = {
		"value":idNo
	}
	plus.nativeUI.showWaiting();
	eg.postAjax("customer/valid/idNo",params, function(data) {
		plus.nativeUI.closeWaiting();
		if(data.status!="1"){
			mui.toast(data.message,{
						duration: 'short',
						type: 'div'
					});
		}else{
			var params = {
				"value":phone
			}
			plus.nativeUI.showWaiting();
			eg.postAjax("customer/valid/mobile",params, function(data) {
				plus.nativeUI.closeWaiting();
				if(data.status!="1"){
					mui.toast(data.message,{
						duration: 'short',
						type: 'div'
					});
				}else{
					localStorage.setItem("uploadField",JSON.stringify(uploadField));
					mui.openWindow({
						url: "./moreInformation.html",
						id: "moreInformation"
					})
				}
			});
		}
	});
})
/**点击获取验证码**/
$("#getcode").on("tap",function(){
	var phoneNum = $("#phone").val();
	if(isNullVal(phoneNum)) {
		mui.toast("手机号码不能为空！",{
						duration: 'short',
						type: 'div'
					});
		return false;
	};
	if(!eg.phone.test(phoneNum)) {
		mui.toast("手机号码格式不正确！",{
						duration: 'short',
						type: 'div'
					});
		return false;
	};
    Countdown('getcode');
   	getSms();
});
function getSms(){
	plus.nativeUI.showWaiting();
	eg.postAjax("captCha", {
		"mobile":$("#phone").val().trim()
		}, function(data) {
			plus.nativeUI.closeWaiting();
			if(data.status=="1"){
                mui.toast("验证码已发送至您的手机",{
						duration: 'short',
						type: 'div'
					});
			}
			if(data.status=="-9"){
                mui.toast("已经发送成功",{
						duration: 'short',
						type: 'div'
					});
			}

	});
}
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
					$('#nation').val(data.race);
					$("#address").val(data.address);
					scanImage('1');
				}else{
					$('#issued_by').val(data.issuedBy);
					$('#valid_date').val(data.validDate);
				}					
			});
		} else {
			alert("调用插件时发生异常。");
		}
	}, function(result) {
		alert(result);
	});
}



