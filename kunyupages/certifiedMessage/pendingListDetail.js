mui.init()
mui.plusReady(function(){
	var csrf=localStorage.getItem("csrf");
	var params = {
		"_csrf":csrf,
		"idNo":"1"
//		"password":$("#pwd1").val().trim(),
//		"city":$("#cityCode").val().trim()
	}
	eg.postAjax("customer/list", params, function(data) {
			alert(data.code);
	}
	,function(data){
//		$("#oBtn").removeAttr("disabled");
		//alert(data);
		if(data=="403") eg.getCsrf();
	});
})
document.getElementById("confirmBtn").addEventListener('tap', function() {
	var btnArray = ['否', '是'];
	mui.confirm('是否取消2018年1月2日的预约？', '提示', btnArray, function(e) {
		if (e.index == 1) {
			alert('确认')
		} else {
			alert('取消')
		}
	})
});
$('#appointMent').on("tap",function(){
	mui.openWindow({
        url:"./appointMent.html",
        id:"appointMent"
   	});
})
