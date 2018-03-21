mui.init();
var type;
mui.plusReady(function(){
	var self = plus.webview.currentWebview();
	type = self.type;
	if(type == "houseSample"){
		$(".mui-title").text("房产证示例");
	}else{
		$(".mui-title").text("购房合同示例");
	}
	var idStr = "#" + type;
	$(idStr).show();
})
