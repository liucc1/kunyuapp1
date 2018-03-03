mui.init({
	swipeBack: false
});
//var uploadField;
var num = 1;
mui.plusReady(function(){
//	var self = plus.webview.currentWebview();
//	var uploadField = self.uploadField;
})

//房产证示例
$("#houseSample").on("tap",function(){
	mui.openWindow({
		url: "../index/houseshow.html",
		id: "houseshow",
		extras:{
			type:"houseSample"
		}
	})
})

//购房合同示例
$("#contractSample").on("tap",function(){
	mui.openWindow({
		url: "../index/houseshow.html",
		id: "houseshow",
		extras:{
			type:"contractSample"
		}
	})
})

//添加照片
$(".chooseByGally").on('tap',function(){
	var targetEle = $(this).parents(".imageDiv");
	var insertEle = document.createElement("div");
	insertEle.classList = "shakeImg";
	var html = '<img class="chooseByGally" src="" data-preview-src="" data-preview-group="1" />'
				+'<span onclick="delImg(this);" class="mui-icon mui-icon-close-filled none"></span>';
	$(insertEle).html(html);
	$(insertEle).css("upImg");
	chooseImg(targetEle,insertEle);
})

//删除图片
$(".deleteImg").on('tap',function(){
	var arr = $(".shakeImg");
	if(arr.length == 0){
		return false;
	}
	for(var i = 0; i < arr.length; i++){
		$(arr[i]).addClass("shake");
		$(arr[i].children[1]).show();
	}
	$(this).hide();
	$(this).siblings(".confirmImg").show();
})

//删除完成
$(".confirmImg").on('tap',function(){
	var arr = $(".shakeImg");
	for(var i = 0; i < arr.length; i++){
		$(arr[i]).removeClass("shake");
		$(arr[i].children[1]).hide();
	}
	$(this).siblings(".deleteImg").show();
	$(this).hide();
})

//删除照片
function delImg(ele){
	if($(ele.parentElement).siblings().length == 2){
		$(ele.parentElement).siblings(".deleteImg").show();
		$(ele.parentElement).siblings(".confirmImg").hide();
	}
	$(ele.parentElement).remove();
}

/**点击提交按钮**/
$("#oBtn").on("tap",function(){
	var uploadField = localStorage.getItem("uploadField");
	eg.getCsrf();
	var csrf = localStorage.getItem("csrf");
	var params = {
		"_csrf":csrf,
		"customerbase":uploadField
	}
	eg.postAjax("customer/add",params, function(data) {
		if(data.status!="1"){
			mui.toast(data.message);
			return;
		}
	},function(data){
		if(data=="403") eg.getCsrf();
	});
//	var uploadField = JSON.parse(localStorage.getItem("uploadField"));
//	var inEle = document.createElement("input");
//	
//	for(var i in uploadField){
//		
//	}
//	var ele = $(".shakeImg").children("img");
//	eg.getCsrf();
//	var csrf = localStorage.getItem("csrf");
//	var path = eg.jrURL + "customer/add?_csrf="+csrf+"?customerbase="+encodeURIComponent(encodeURIComponent(localStorage.getItem("uploadField")));
//	console.log(path);
//	var task = plus.uploader.createUpload(path,{ method:"POST",timeout:"600"},
//	function ( t, status ) {
//			// 上传完成
//			console.log(status);
//			if ( status == 200 ) { 
//				plus.nativeUI.closeWaiting();
//				var dt = JSON.parse(task.responseText);
//				if(dt.status == "1"){
//					mui.openWindow({
//						url: "./submitSuccess.html",
//						id: "submitSuccess"
//					});
//					localStorage.removeItem("uploadField");
//				}else if(dt.status == "-1"){
//					mui.toast("身份证校验失败");
//				}else if(dt.status == "-7"){
//					mui.toast("内部错误");
//				}
//			} else {
//				plus.nativeUI.closeWaiting();
//				alert( "照片上传失败！");
//			}
//		}
//	);
//	for(var i = 0; i < ele.length; i++){
//		var upPath = ele[i].src;
//		if(upPath.split("file:").length == 1){
//			upPath = "file://" + upPath;
//		}
//		task.addFile(upPath, {key:upPath} );
//	}
//	task.start();	
	
})