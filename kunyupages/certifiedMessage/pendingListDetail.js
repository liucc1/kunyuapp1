mui.init();
var sid,status;
mui.plusReady(function(){
	var self = plus.webview.currentWebview();
	sid = self.sid;
	status = self.status;
//	console.log(sid);
//	console.log(status);
	if(status=="已驳回"){
		console.log(status);
		$(".mode1").removeClass("none");
	}else if(status=="待完善"){
		$(".mode2").removeClass("none");
	}else if(status=="已提交"){ 
		$(".mode3").removeClass("none");
	}else if(status=="可预约"){
		$(".mode4").removeClass("none");
	}else if(status=="已预约"){
		$(".mode5").removeClass("none");
	}else if(status=="拒绝"){
		$(".mode6").removeClass("none");
	}else if(status=="激活"){
		$(".mode7").removeClass("none");
	}else if(status=="处理中"){
		$(".mode8").removeClass("none");
	}
//	var csrf=localStorage.getItem("csrf");
//	var params = {
//		"_csrf":csrf,
//		"idNo":sid
//	}
//	eg.postAjax("customer/detail", params, function(data) {
//			alert(data.code);
//			alert(data.msg);
//			alert(data.rows);
//	}
//	,function(data){
//		if(data=="403") eg.getCsrf();
//	});
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
/*9补送影像*/
$('#oBtn1').on("tap",function(){
	mui.openWindow({
        url:"./uploadImages.html",
        id:"uploadImages.html"
   	});
})
/*4更新客户信息*/
$('#oBtn2').on("tap",function(){
	mui.openWindow({
        url:"./moreInformation.html",
        id:"moreInformation"
   	});
})
/*12预约*/
$('#oBtn4').on("tap",function(){
	mui.openWindow({
        url:"./appointMent.html",
        id:"appointMent"
   	});
})
/*12重新预约*//*如果取消预约到哪个页面呢？*/
$('#appointMent').on("tap",function(){
	mui.openWindow({
        url:"./appointMent.html",
        id:"appointMent"
   	});
})
