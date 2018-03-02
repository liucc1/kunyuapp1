mui.init();

mui.plusReady(function(){
	var self = plus.webview.currentWebview();
	var idStr = "#"+self.type;
	if(self.type == "houseSample"){
		$("#title").text("房产证示例");
	}else{
		$("#title").text("购房合同示例");
	}
	$(idStr).show();
	mui.previewImage();
})
