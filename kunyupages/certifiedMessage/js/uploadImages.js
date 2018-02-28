mui.init({
	swipeBack: false
});
mui.plusReady(function(){
	
})
/**点击提交按钮**/
$("#oBtn").on("tap",function(){
	mui.openWindow({
		url: "./moreInformation.html",
		id: "moreInformation"
	})
})