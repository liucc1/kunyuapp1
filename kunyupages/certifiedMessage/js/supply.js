mui.init({
	swipeBack: false
});

var num = 1;
var fileArr = [];
var sid;
mui.plusReady(function(){
	var self = plus.webview.currentWebview();
	sid = self.sid;
	var url = eg.jrURL + "thumbnail/"+sid+"/json";
	plus.nativeUI.showWaiting();
	$.get(url,function(data){
		plus.nativeUI.closeWaiting();
		for(var index in data){
			var id = data[index].id;
			var fileType = data[index].fileType;
			var url = eg.jrURL + "thumbnail/"+id+".jpg";
			var insertEle = document.createElement("div");
			$(insertEle).addClass("shakeImg");
			var html = '<img class="chooseByGally" src="'+url+'" data-flag = '+id+' />'
						+'<span onclick="delImg(this);" class="mui-icon mui-icon-close-filled none"></span>';
			$(insertEle).html(html);
			$(insertEle).css("upImg");
			if (fileType == "3") {
				$(insertEle).insertBefore(".ahh");
			} else{
				$(insertEle).insertBefore(".ahh2");
			}
			
		}
	})
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
	var type = targetEle.attr("data-Type");
	var insertEle = document.createElement("div");
	$(insertEle).addClass("shakeImg");
	$(insertEle).addClass("supplyImg");
	var html = '<img class="chooseByGally" src="" data-preview-src="" data-preview-group="1" />'
				+'<span onclick="delImg(this);" class="mui-icon mui-icon-close-filled none"></span>';
	$(insertEle).html(html);
	$(insertEle).css("upImg");
	chooseImg(targetEle,insertEle);
})

//删除图片
$(".deleteImg").on('tap',function(){
	var arr = $(this).parent().siblings(".shakeImg");
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
	if($(ele).parents(".shakeImg").siblings().length == 2){
		$(ele.parentElement).siblings().children(".deleteImg").show();
		$(ele.parentElement).siblings().children(".confirmImg").hide();
	}
	$(ele.parentElement).remove();
	var id = $(ele).siblings(".chooseByGally").attr("data-flag");
	if(id){
		eg.postAjax("image/delete",{"id":id},function(data){
			console.log(data.status);
			console.log(data.message);
		})
	}	
}

/**点击提交按钮**/
$("#oBtn").on("tap",function(){
	var ele = $(".shakeImg").children("img");
	var eleSupply = $(".supplyImg").children("img");
	if(ele.length + eleSupply.length < 0){
		mui.toast("请上传照片");
		return false;
	}
	for(var i = 0; i < eleSupply.length; i++){
		var type = $(eleSupply[i]).parents(".imageDiv").attr("data-Type");
		var file = eleSupply[i].src.split(",")[1];
//		console.log(type);
//		console.log(file);
		plus.nativeUI.showWaiting("正在上传...");
		eg.postAjax("upload/img/base", {
			"file": file,
			"customerId":sid,
			"type":type
		}, function(data) {
			plus.nativeUI.closeWaiting();
			if(data.code == "1"){
            	mui.openWindow({
					url: "./submitSuccess.html",
					id: "submitSuccess"
				});
            }else{
            	mui.toast("上传失败");
            }
		})
	}
})
