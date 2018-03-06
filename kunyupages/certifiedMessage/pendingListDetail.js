mui.init();
var sid,status;
mui.plusReady(function(){
	var self = plus.webview.currentWebview();
	sid = self.sid;
	status = self.status;
	if(status=="已驳回"){
		console.log(status);
		$(".mode1").removeClass("none");
		queryOne();
	}else if(status=="待完善"){
		$(".mode2").removeClass("none");
		queryOne();
	}else if(status=="已提交"){ 
		$(".mode3").removeClass("none");
		queryOne();
	}else if(status=="可预约"){
		$(".mode4").removeClass("none");
		queryOne();
	}else if(status=="已预约"){
		$(".mode5").removeClass("none");
		queryTwo();
	}else if(status=="拒绝"){
		$(".mode6").removeClass("none");
		queryThree();
	}else if(status=="激活"){
		$(".mode7").removeClass("none");
		queryFour();
	}else if(status=="处理中"){
		$(".mode8").removeClass("none");
		queryOne();
	}
})
/*已驳回，待完善，已提交，可预约，处理中*/
function queryOne(){
	var csrf=localStorage.getItem("csrf");
	var params = {
		"_csrf":csrf,
		"idNo":sid
	}
	eg.postAjax("customer/detail", params, function(data) {	
		if(data.code == "1"){
			var detail = JSON.stringify(data.rows);
			detail = JSON.parse(detail);
			$(".name").text(detail.name);
			$(".idNo").text(detail.idNo);	
		}
	}
	,function(data){
		if(data=="403") eg.getCsrf();
	});
}
/*已预约*/
function queryTwo(){
	var csrf=localStorage.getItem("csrf");
	var params = {
		"_csrf":csrf,
		"idNo":sid
	}
	eg.postAjax("customer/detail", params, function(data) {	
		if(data.code == "1"){
			var detail = JSON.stringify(data.rows);
			detail = JSON.parse(detail);
			$(".name").text(detail.name);
			$(".idNo").text(detail.idNo);
//			$("#address").text(detail.);//预约地点字段？
			$(".time").text(detail.appointmentDate+detail.timeQuantum);
		}
	}
	,function(data){
		if(data=="403") eg.getCsrf();
	});
}
/*拒绝*/
function queryThree(){
	var csrf=localStorage.getItem("csrf");
	var params = {
		"_csrf":csrf,
		"idNo":sid
	}
	eg.postAjax("customer/detail", params, function(data) {	
		if(data.code == "1"){
			var detail = JSON.stringify(data.rows);
			detail = JSON.parse(detail);
			$(".name").text(detail.name);
			$(".idNo").text(detail.idNo);
			$(".reason").text(detail.refuseDesc);
		}
	}
	,function(data){
		if(data=="403") eg.getCsrf();
	});
}
/*激活*/
function queryFour(){
	var csrf=localStorage.getItem("csrf");
	var params = {
		"_csrf":csrf,
		"idNo":sid
	}
	eg.postAjax("customer/detail", params, function(data) {	
		if(data.code == "1"){
			var detail = JSON.stringify(data.rows);
			detail = JSON.parse(detail);
			$(".name").text(detail.name);
			$(".idNo").text(detail.idNo);
			$(".activeAmount").text(detail.activeAmount);
			$(".activeDate").text(detail.activeDate);
		}
	}
	,function(data){
		if(data=="403") eg.getCsrf();
	});
}


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
/*已驳回;9补送影像*/
$('#oBtn1').on("tap",function(){
	mui.openWindow({
        url:"./uploadImages.html",
        id:"uploadImages.html"
   	});
})
/*待完善;更新客户信息*/
$('#oBtn2').on("tap",function(){
	mui.openWindow({
        url:"./moreInformation.html",
        id:"moreInformation"
   	});
})
/*可预约;12预约*/
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

/*已提交*/
$('#oBtn3').on("tap",function(){
	mui.openWindow({
		url:"./home.html",
		id:"home"
	})
})
/*已预约*/
$('#oBtn5').on("tap",function(){
	mui.openWindow({
		url:"./home.html",
		id:"home"
	})
})
/*拒绝*/
$('#oBtn6').on("tap",function(){
	mui.openWindow({
		url:"./home.html",
		id:"home"
	})
})
/*激活*/
$('#oBtn7').on("tap",function(){
	mui.openWindow({
		url:"./home.html",
		id:"home"
	})
})
/*处理中*/
$('#oBtn8').on("tap",function(){
	mui.openWindow({
		url:"./home.html",
		id:"home"
	})
})

