mui.init({
	swipeBack: false
});
mui.plusReady(function(){
	
})
/**点击提交按钮**/
$("#oBtn").on("tap",function(){
	mui.openWindow({
		url: "./uploadImages.html",
		id: "uploadImages"
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