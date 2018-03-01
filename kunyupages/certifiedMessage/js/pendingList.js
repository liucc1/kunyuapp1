mui.init({
	swipeBack: false
});
mui.plusReady(function(){
	var csrf=localStorage.getItem("csrf");
	var params = {
		"_csrf":csrf,
		"page":"1",
		"limit":"4",
//		"password":$("#pwd1").val().trim(),
//		"city":$("#cityCode").val().trim()
	}
	plus.nativeUI.showWaiting();
	eg.postAjax("customer/list", params, function(data) {
			plus.nativeUI.closeWaiting();
//			alert(data.msg);
//			alert(data.total);
//			alert(data.code);		
			if(data.code=="0"){
				var arr = JSON.stringify(data.rows);
				alert(arr);
			}
//			alert(data.total);
	}
	,function(data){
//		alert(data);
		if(data=="403") eg.getCsrf();
	});
})
mui('#productlist').on('tap', 'ul', function() {
	mui.openWindow({
        url:"./pendingListDetail.html",
        id:"pendingListDetail"
   	});
})
