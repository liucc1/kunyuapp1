mui.init();

mui.plusReady(function(){
	eg.ajax(eg.jrURL + "user/data.json", {}, 'get', function(data){
		var info = data.rows;
		$("#custName").val(info.name);
		$("#idNo").val(info.idNo);
		$("#cardNo").val(info.cardNo);
		$("#depositBank").val(info.depositBank);
		$("#phone").val(localStorage.getItem("phone").replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'));
		$("#city").val(info.city);
		$("#telephone").val(info.serviceTel);
		$("#telRow").on('tap',function(){
			var phoneNum = $(this).children("input").val();
			plus.device.dial(phoneNum);
		})
	})	
})

//更换银行卡号
$("#changeCardNo").on('tap',function(){
	mui.openWindow({
		url: "reviseCer.html",
		id: "reviseCer",
		extras:{
			name:$("#custName").val(),
			idNo:$("#idNo").val()
		}
	})
})

//更换手机号-暂时先不允许更换
//$("#changePhone").on('tap',function(){
//	mui.openWindow({
//		url: "revisePhone.html",
//		id: "revisePhone"
//	})
//})
