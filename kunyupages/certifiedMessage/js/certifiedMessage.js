mui.init({
	swipeBack: false
});
mui.plusReady(function(){
	
})

/**点击提交按钮**/
$("#oBtn").on("tap",function(){	
	var custName = $('#name').val();
	var idNo = $('#idNo').val();
	var nation = $('#nation').val();
	var address = $('#address').val();
	var issueAuthority = $('#issued_by').val();
	var avalDate = $('#valid_date').val();
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
	if(isNullVal(address)){
		mui.toast("住址不能为空！");
		return false;
	}
//	if(!eg.address.test(address)){
//		mui.toast("住址格式不正确！");
//		return;
//	}
	if(isNullVal(issueAuthority)){
		mui.toast("身份证签发机关不能为空！");
		return false;
	}
	var  singerIDReg =  /^[\u4E00-\u9FA5]{2,30}$/;//
	if(!singerIDReg.test(issueAuthority)){
		mui.toast("身份证签发机关格式不正确！");
		return;
	}
	if(isNullVal(avalDate)){
		mui.toast("身份证有效日期不能为空！");
		return false;
	}
	var dateReg = /^\d{4}.(0|1)\d.(0|1|2|3)\d-(\d{4}.(0|1)\d.(0|1|2|3)\d)|长期$/;
	if(!dateReg.test(avalDate)){		
		mui.toast("身份证有效日期格式不正确！");
		return ;
	}
	mui.openWindow({
		url: "./uploadImages.html",
		id: "uploadImages",
		extras:	{
			"name":custName,
			"idNo":idNo
		}
	})
//	var params = {
//		"_csrf":localStorage.getItem("csrf"),
//		"mobile":$("#phone").val().trim(),
//		"code":$("#smscode").val().trim(),
//		"password":$("#pwd1").val().trim()
//	};
//	eg.postAjax("forget", params, function(data) {
//		plus.nativeUI.toast("密码修改成功！", {
//			duration: "short"
//		});
//	},function(data){
//		if(data=="403") eg.getCsrf();
//	});
});