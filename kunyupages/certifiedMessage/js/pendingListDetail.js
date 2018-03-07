mui.init();
var dataList;
var name,idNo;
mui.plusReady(function(){
	var self = plus.webview.currentWebview();
	dataList = self.dataList;	
	if(dataList.status){
		var status = main.obtainValue('status',dataList.status);	
	}else{
		status = "处理中";
	}
	if(status=="已驳回"){
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
	$(".name").text(dataList.name);
	name = dataList.name;
}
/*已预约*/
function queryTwo(){	
	$(".name").text(dataList.name);
	if(dataList.timeQuantum == "1"){
		timeQuantum = "上午";
	}else if(dataList.timeQuantum == "2"){
		timeQuantum = "下午";
	}
	$(".time").text(dataList.appointmentDate+timeQuantum);
	name = dataList.name;
}
/*拒绝*/
function queryThree(){
	$(".name").text(dataList.name);
	$(".reason").text(dataList.refuseDesc);
	name = dataList.name;
}
/*激活*/
function queryFour(){
	$(".name").text(dataList.name);
	$(".activeAmount").text(dataList.activeAmount);
	$(".activeDate").text(dataList.activeDate);
	name = dataList.name;
}
document.getElementById("confirmBtn").addEventListener('tap', function() {
	var btnArray = ['否', '是'];
	mui.confirm('是否取消2018年1月2日的预约？', '提示', btnArray, function(e) {
		if (e.index == 1) {
			alert("取消预约接口？")
		} else {
			/*取消预约接口*/
//			alert('取消')
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
        id:"appointMent",
        extras:{
			"name":name,
			"idNo":idNo
		}
   	});
})
/*12已预约重新预约*/
$('#appointMent').on("tap",function(){
	mui.openWindow({
        url:"./appointMent.html",
        id:"appointMent",
        extras:{
			"name":name,
			"idNo":idNo
		}
   	});
})
/*已提交*/
$('#oBtn3').on("tap",function(){
	plus.webview.currentWebview().close();
//	var scheduleList = plus.webview.getWebviewById("scheduleList.html");
//	var pendingList = plus.webview.getWebviewById("pendingList.html");
//	if (scheduleList) {
//		scheduleList.close();
//	}
//	if (pendingList) {
//		pendingList.close();
//	}
	mui.openWindow({
		url:"./home.html",
		id:"home"
	})
})
/*已预约*/
$('#oBtn5').on("tap",function(){
	plus.webview.currentWebview().close();
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

