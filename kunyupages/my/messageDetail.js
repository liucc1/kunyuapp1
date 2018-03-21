mui.init();

mui.plusReady(function(){
	var id = plus.webview.currentWebview().idStr;
	eg.postAjax("app/message/detail", {
		id:id
	}, function(data){
		if(data.status == 1){
			$("#title").text(data.data.title);
			$("#time").text(data.data.createTime);
			$("#content").html(data.data.message);
		}else{
			mui.toast(data.message,{duration: 'short',type: 'div'});
		}
	})	
})