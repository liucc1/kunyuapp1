mui.init({
	swipeBack: false
});
var name,idNO;
mui.plusReady(function(){
	var self = plus.webview.currentWebview();
	var name = self.name;
	var idNO = self.idNo;
})
/**点击提交按钮**/
$("#oBtn").on("tap",function(){
	mui.openWindow({
		url: "./moreInformation.html",
		id: "moreInformation",
		extras:{
			"name":name,
			"idNo":idNO
		}
	})
})