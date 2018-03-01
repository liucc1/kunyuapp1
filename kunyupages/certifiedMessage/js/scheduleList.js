mui.init({
	swipeBack: false
});
mui.plusReady(function(){
//	eg.getCsrf();
//	eg.getToken("68720a30",function(data) {
//		var s=data.split('"');
//		var csrf=s[s.length-2];
//		console.log("未登录时获取_csrf==="+csrf);
////		isToLogin(csrf);
//	});
	var csrf=localStorage.getItem("csrf");
	var params = {
		"_csrf":csrf,
		"page":"1",
		"limit":"4",
//		"password":$("#pwd1").val().trim(),
//		"city":$("#cityCode").val().trim()
	}
	eg.postAjax("customer/list", params, function(data) {
			alert(data.msg);
			alert(data.total);
			alert(data.code);
			var arr = JSON.stringify(data.rows)
			alert(arr);
			
//			alert(data.total);
	}
	,function(data){
//		$("#oBtn").removeAttr("disabled");
		//alert(data);
		if(data=="403") eg.getCsrf();
	}
	);
})
mui('#pendingList').on('tap', 'ul', function() {
	mui.openWindow({
        url:"./pendingListDetail.html",
        id:"pendingListDetail"
   	});
})
