mui.init({
	swipeBack: false
});

var num = 1;
var fileArr = [];

mui.plusReady(function(){
	
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
	$(insertEle).addClass("shakeImg");
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
}

/**点击提交按钮**/
$("#oBtn").on("tap",function(){
	var uploadField = localStorage.getItem("uploadField");
	var ele = $(".shakeImg").children("img");
	if(ele.length < 0){
		mui.toast("请上传照片");
		return false;
	}
	var filesArr = []
	for(var i = 0; i < ele.length; i++){
		filesArr.push(ele[i].src.split(",")[1]);
	}
	plus.nativeUI.showWaiting("正在上传...");
	eg.postAjax("customer/add/base", {
			"customerbase": uploadField,
			"files":filesArr.join(",")
		}, function(data) {
			plus.nativeUI.closeWaiting();
			if(data.status == "1"){
            	mui.openWindow({
					url: "./submitSuccess.html",
					id: "submitSuccess"
				});
				localStorage.removeItem("uploadField");
            }else{
            	mui.toast("上传失败");
            }
		})
})
