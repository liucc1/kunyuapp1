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
	var ele = $(".shakeImg").children("img");
	for(var i = 0; i < ele.length; i++){
		var upPath = ele[i].src;
		if(upPath.split("file:").length == 1){
			upPath = "file://" + upPath;
		}
		var inputEle = document.createElement("input");
		inputEle.type = "file";
		inputEle.name = "files";
		inputEle.value = upPath;
		$("#formTab").append(inputEle);
	}
	var formData = new FormData($( "#formTab" )[0]);
	formData.append("_csrf",csrf);
	formData.append("customerbase",uploadField);
	$.ajax({
        type: "post",
        url: eg.jrURL+"customer/add",
        async: false,
        data: formData,
        cache: false,  
        contentType: false,  
        processData: false, 
        dataType: "json",
        success: function (data) {
            if(data.status == "1"){
            	mui.openWindow({
					url: "./submitSuccess.html",
					id: "submitSuccess"
				});
				localStorage.removeItem("uploadField");
            }
        },
        error: function () {
            mui.toast("上传失败")
        }
    });	
})