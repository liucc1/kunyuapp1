mui.init();
var fileArr = [];
var targetEle;
$(function(){
    var u = navigator.userAgent;
    if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){//ios终端
        $(".iosDiv").show();
        $("#oBtn").attr("data-phone","ios");
    }else{//android终端
        $(".androidDiv").show();
        $("#oBtn").attr("data-phone","android");
    }
})
//房产证示例
$("#houseSample").on("tap",function(){
	mui.openWindow({
		url:"./houseshow.html",
		id:"houseshow",
		extras:{
			"type":"houseSample"
		}
	})
//  window.location.href = "houseshow.html?type=houseSample";
})

//购房合同示例
$("#contractSample").on("tap",function(){
	mui.openWindow({
		url:"./houseshow.html",
		id:"houseshow",
		extras:{
			"type":"contractSample"
		}
	})
})

//添加照片
$("#camera").on('tap',function(){
    mui('#picture').popover('toggle');
    $("#cameraInput").click();
})
$("#gally").on('tap',function(){
    mui('#picture').popover('toggle');
    $("#gallyInput").click();
})
$(".jumpLink").on('tap',function(){
    targetEle = $(this).parents(".imageDiv");
})

function showImg(that){
    var files = that.files;
    for(var i = 0; i < files.length; i++){
        var reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = function(e) {
            var canvas=document.createElement("canvas");
            var ctx=canvas.getContext("2d");
            var image=new Image();
            image.src=e.target.result;
            image.onload=function(){
                var w=image.width/2;
                var h=image.height/2;
                canvas.width=w;
                canvas.height=h;
                ctx.drawImage(image,0,0,w,h);
                var base64 = canvas.toDataURL("image/jpeg",0.5);
                var html = '<div class="shakeImg"><img class="chooseByGally" src="'
                    +base64+'" data-preview-src="" data-preview-group="1" />'
                    +'<span onclick="delImg(this);" class="mui-icon mui-icon-close-filled none">'
                    +'</span></div>';
                targetEle.prepend(html);
                mui.previewImage();
            }
        }
    }
    var inputEle = $(that).clone();
    inputEle.removeAttr("hidden");
    fileArr.push(inputEle);
}

//删除图片
$(".deleteImg").on('tap',function(){
    var arr = $(this).parents(".imageDiv").children(".shakeImg");
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
    var arr =$(this).parents(".imageDiv").children(".shakeImg");
    for(var i = 0; i < arr.length; i++){
        $(arr[i]).removeClass("shake");
        $(arr[i].children[1]).hide();
    }
    $(this).siblings(".deleteImg").show();
    $(this).hide();
})

//删除照片
function delImg(ele){
    if($(ele.parentElement).siblings().length == 3){
        $(ele.parentElement).siblings().children(".deleteImg").show();
        $(ele.parentElement).siblings().children(".confirmImg").hide();
    }
    $(ele.parentElement).remove();
}

/**点击提交按钮**/
$("#oBtn").on("tap",function(){
    if(fileArr.length < 1){
        mui.toast("请上传图片");
        return false;
    }
    if($(this).attr("data-phone") == "android"){
        andrUpload();
    }else{
        iosUpload();
    }
})

//android上传
function andrUpload(){
	plus.webview.showWaiting();
    fileArr.forEach(function(item, index){
        $("#formTab").append(item);
    })
    var formData = new FormData($( "#formTab" )[0]);
    eg.getCsrf();
    var csrf = localStorage.getItem("csrf");
    var uploadField = JSON.parse(localStorage.getItem("uploadField"));
    formData.append("validCode",uploadField.validCode);
    delete uploadField.validCode;
    formData.append("_csrf",csrf);
    formData.append("customerbase",JSON.stringify(uploadField));
    setTimeout(function(){
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
				plus.webview.closeWaiting();
                if(data.status == "1"){
                	mui.openWindow({
                		url:"submitSuccess.html",
                		id:"submitSuccess"
                	})
                }else if(data.status == "-1"){
                    mui.toast("身份校验失败")
                }else if(data.status == "-7"){
                    mui.toast("内部错误")
                }
            },
            error: function () {
                plus.webview.closeWaiting();
                mui.toast("上传失败")
            }
        });
    },500)
}

//ios上传
function iosUpload(){
    plus.webview.showWaiting();
    eg.getCsrf();
    var csrf = localStorage.getItem("csrf");
    var uploadField = JSON.parse(localStorage.getItem("uploadField"));
    var validCode = uploadField.validCode;
    delete uploadField.validCode;
    var customerbase = JSON.stringify(uploadField);
    var ele = $(".shakeImg img");
    var param = {
        validCode:validCode,
        customerbase:customerbase,
		_csrf:csrf,
        files:ele[0].src.split(",")[1]
    };
    for(var i = 1; i < ele.length; i++){
        // param.files = ele[i].src;
        param.files = param.files+","+ele[i].src.split(",")[1];
    }
    eg.postAjax("customer/add",param, function(data) {
        plus.webview.closeWaiting();
        if(data.status=="1"){
        	mui.openWindow({
        		url:"submitSuccess.html",
        		id:"submitSuccess"
        	})
        }else{
            mui.toast(data.message);
        }
    });
}
