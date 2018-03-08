mui.init();
$(function(){
	$('#idNo').blur(function(){
		var custName = $('#name').val();
		var idNo = $('#idNo').val();
		if(isNullVal(idNo)){
			mui.toast("身份证不能为空！");
			return false;
		}
		if(!eg.userIdCode(idNo)){
			mui.toast("身份证格式不正确！");
			return false;
		}	
		var params = {
			"value":idNo
		}
		plus.nativeUI.showWaiting();
		eg.postAjax("customer/valid/idNo",params, function(data) {
			plus.nativeUI.closeWaiting();
			if(data.status!="1"){
				mui.toast(data.message);
				return false;
			}
		});
	})
	$('#phone').blur(function(){
		var phone = $("#phone").val();
		var params = {
			"value":phone
		}
		plus.nativeUI.showWaiting();
		eg.postAjax("customer/valid/mobile",params, function(data) {
			plus.nativeUI.closeWaiting();
			if(data.status!="1"){
				mui.toast(data.message);
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
		mui.toast("姓名不能为空！");
		return false;
	}
	if(!eg.name.test(custName)){
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
	if(isNullVal(address)){
		mui.toast("住址不能为空！");
		return false;
	}
	if(!eg.address.test(address)){
		mui.toast("住址格式不正确！");
		return false;
	}
	if(isNullVal(issueAuthority)){
		mui.toast("身份证签发机关不能为空！");
		return false;
	}
	var  singerIDReg =  /^[\u4E00-\u9FA5]{2,30}$/;//
	if(!singerIDReg.test(issueAuthority)){
		mui.toast("身份证签发机关格式不正确！");
		return false;
	}
	if(isNullVal(avalDate)){
		mui.toast("身份证有效日期不能为空！");
		return false;
	}
	var dateReg = /^\d{4}.(0|1)\d.(0|1|2|3)\d-(\d{4}.(0|1)\d.(0|1|2|3)\d)|长期$/;
	if(!dateReg.test(avalDate)){		
		mui.toast("身份证有效日期格式不正确！");
		return false;
	}
	if(isNullVal(phone)) {
		mui.toast("手机号码不能为空！");
		return false;
	};
	if(!eg.phone.test(phone)) {
		mui.toast("手机号码格式不正确！");
		return false;
	};
	if(isNullVal(validityCode)) {
		mui.toast("验证码不能为空！");
		return false;
	};
	var uploadField = {
		"name":custName,
		"idNo":idNo,
		"mobile":phone,
		"validCode":validityCode
	}
	var params = {
		"value":idNo
	}
	plus.nativeUI.showWaiting();
	eg.postAjax("customer/valid/idNo",params, function(data) {
		plus.nativeUI.closeWaiting();
		if(data.status!="1"){
			mui.toast(data.message);
		}else{
			var params = {
				"value":phone
			}
			plus.nativeUI.showWaiting();
			eg.postAjax("customer/valid/mobile",params, function(data) {
				plus.nativeUI.closeWaiting();
				if(data.status!="1"){
					mui.toast(data.message);
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
		mui.toast("手机号码不能为空！");
		return false;
	};
	if(!eg.phone.test(phoneNum)) {
		mui.toast("手机号码格式不正确！");
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
                mui.toast("验证码已发送至您的手机");
			}
			if(data.status=="-9"){
                mui.toast("已经发送成功");
			}

	});
}
//OCR
$(".afterInput").on('tap',function(){
	$("#inputBtn").click();
	var inputBtn=document.getElementById("inputBtn");
	var picType = inputBtn.value.split(".")[1];
	inputBtn.onchange=function(){
        var reader = new FileReader();
        reader.readAsDataURL(this.files[0]);
        reader.onload = function(e) {
        	var canvas=document.createElement("canvas");  
	        var ctx=canvas.getContext("2d");  
	        var image=new Image();  
            image.src=e.target.result;  
            image.onload=function(){ 
                var w=image.width/2;  
                var h=image.height/2;  
                canvas.width=w;  
                canvas.height=h;  
                ctx.drawImage(image,0,0,w,h);  
                var base64 = canvas.toDataURL("image/jpeg",0.5);  
                plus.nativeUI.showWaiting();
                eg.postAjax("wechat/identify", {
					"idCardImg": base64.split(',')[1],
					"mimetype":picType
				}, function(data) {
					plus.nativeUI.closeWaiting();
					if(data.side == "front"){
						$("#name").val(data.name);
						$("#idNo").val(data.idCardNumber);
						$('#nation').val(data.race);
						$("#address").val(data.address);
						var btnArray = ['确定'];
						mui.confirm('请继续拍反面！', '提示', btnArray, function(e) {
							if (e.index == 0) {
								scanReverse();						
							}
						})
					}else{
						mui.toast("请扫描身份证正面！");
						return false;
					}
				});
            }
        }
	}
})
//扫反面
function scanReverse(){
	$("#inputBtn1").click();
	var inputBtn=document.getElementById("inputBtn1");
	var picType = inputBtn.value.split(".")[1];
	inputBtn.onchange=function(){
		var reader = new FileReader();
	    reader.readAsDataURL(this.files[0]);
	    reader.onload = function(e) {
	    	var canvas=document.createElement("canvas");  
	        var ctx=canvas.getContext("2d");  
	        var image=new Image();  
	        image.src=e.target.result;  
	        image.onload=function(){ 
	            var w=image.width/2;  
	            var h=image.height/2;  
	            canvas.width=w;  
	            canvas.height=h;  
	            ctx.drawImage(image,0,0,w,h);  
	            var base64 = canvas.toDataURL("image/jpeg",0.5); 
	            plus.nativeUI.showWaiting();
	            eg.postAjax("wechat/identify", {
					"idCardImg": base64.split(',')[1],
					"mimetype":picType
				}, function(data) {
					plus.nativeUI.closeWaiting();
					$('#issued_by').val(data.issuedBy);
					$('#valid_date').val(data.validDate);
				})
			}
	    }
	}
}



