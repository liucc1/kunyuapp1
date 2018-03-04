mui.init({
	swipeBack: false
});
$(function() { 
	$('#idNo').blur(function(){
		var custName = $('#name').val();
		var idNo = $('#idNo').val();
		if(isNullVal(custName)){
			mui.toast("姓名不能为空！");
			return;
		}
		if(!eg.name.test(custName)){
			mui.toast("姓名格式不正确！");
			return;
		}
		if(isNullVal(idNo)){
			mui.toast("身份证不能为空！");
			return false;
		}
		if(!eg.identity.test(idNo)){
			mui.toast("身份证格式不正确！");
			return;
		}	
		eg.getCsrf();
		var csrf = localStorage.getItem("csrf");
		var params = {
			"_csrf":csrf,
			"value":idNo
		}
		eg.postAjax("customer/valid/idNo",params, function(data) {
			if(data.status!="1"){
				mui.toast(data.message);
				$('#idNo').val("");
				return;
			}
		},function(data){
			if(data=="403") eg.getCsrf();
		});
	})
}) 
mui.plusReady(function(){
	
})
/**点击获取验证码**/
//$("#getcode").on("tap",function(){
//	var phoneNum = $("#phone").val();
//	if(!eg.phone.test(phoneNum)) {
//		mui.toast("手机号码格式不正确！");
//		return;
//	};
//	var csrf=localStorage.getItem("csrf");
// 	getSms(csrf);
//});
//function getSms(csrf){
//	eg.postAjax("captCha", {
//		"_csrf":csrf,
//		"mobile":$("#phone").val().trim()
//		}, function(data) {
//			if(data.status=="1"){
//				$("#smscode").val(data.message);
//			}
//	},function(data){
//		if(data=="403") eg.getCsrf();
//	});
//}
/**点击提交按钮**/
$("#oBtn").on("tap",function(){	
	$(":input").blur();
	var custName = $('#name').val();
	var idNo = $('#idNo').val();
	var phoneNum = $("#phone").val();
//	var nation = $('#nation').val();
//	var address = $('#address').val();
//	var issueAuthority = $('#issued_by').val();
//	var avalDate = $('#valid_date').val();
//	if(isNullVal(custName)){
//		mui.toast("姓名不能为空！");
//		return;
//	}
//	if(!eg.name.test(custName)){
//		mui.toast("姓名格式不正确！");
//		return;
//	}
//	if(isNullVal(idNo)){
//		mui.toast("身份证不能为空！");
//		return false;
//	}
//	if(!eg.identity.test(idNo)){
//		mui.toast("身份证格式不正确！");
//		return;
//	}
//	if(isNullVal(address)){
//		mui.toast("住址不能为空！");
//		return false;
//	}
//	if(!eg.address.test(address)){
//		mui.toast("住址格式不正确！");
//		return;
//	}
//	if(isNullVal(issueAuthority)){
//		mui.toast("身份证签发机关不能为空！");
//		return false;
//	}
//	var  singerIDReg =  /^[\u4E00-\u9FA5]{2,30}$/;//
//	if(!singerIDReg.test(issueAuthority)){
//		mui.toast("身份证签发机关格式不正确！");
//		return;
//	}
//	if(isNullVal(avalDate)){
//		mui.toast("身份证有效日期不能为空！");
//		return false;
//	}
//	var dateReg = /^\d{4}.(0|1)\d.(0|1|2|3)\d-(\d{4}.(0|1)\d.(0|1|2|3)\d)|长期$/;
//	if(!dateReg.test(avalDate)){		
//		mui.toast("身份证有效日期格式不正确！");
//		return ;
//	}
//	if(!eg.phone.test(phoneNum)) {
//		mui.toast("手机号码格式不正确！");
//		return;
//	};
	var uploadField = {
		"name":custName,
		"idNo":idNo,
		"mobile":phoneNum
	}
	localStorage.setItem("uploadField",JSON.stringify(uploadField));
	mui.openWindow({
		url: "./moreInformation.html",
		id: "moreInformation"
	})
});