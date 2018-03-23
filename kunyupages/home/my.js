mui.init();
mui.plusReady(function(){
	var url = eg.jrURL + "sys/info/kyapp";
    $.get(url,function(data){
		console.log(JSON.stringify(data));
		localStorage.setItem("companyTel",data.companyTel);
		localStorage.setItem("companyLocation",data.companyLocation);
		$("#contact").text(data.companyTel);
	}) 	
	eg.loginAjax(function(){
		$("#phone").text(localStorage.getItem("phone").replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'));
		$("#oBtn").removeClass("none");
		//获取头像base64
		var url = eg.jrURL + "user/portrait";
		plus.nativeUI.showWaiting();
		$.get(url, function(data) {	
			if(data.status == "1"){
				$("#uploadImg").attr("src","data:image/jpeg;base64," + data.data);
			}
			plus.nativeUI.closeWaiting();
		});
	},function(){
		$("#login").removeClass("none");
	})
	$("#telphone").on('tap',function(){
		var phoneNum = $(this).children("font").text();
		plus.device.dial(phoneNum);
	})
	/*查询用户是否实名认证*/
	eg.ajax(eg.jrURL + "user/logininfo", {}, 'get', function(data){
		if(data.status == 1){
			if(data.data.userType == 0){
				$("#userType").text("升级为高级用户");
			}else{
				$("#userType").text("高级用户");
			}
		}else{
			mui.toast(data.message,{duration: 'short',type: 'div'});
		}
	},function(){
		
	})
})
function goPage(param){
	eg.loginAjax(function(){
		var url = '../my/'+param+'.html'
		mui.openWindow({
	        url:url,
	        id:param
	   	});
   	})
}
//我的资料
$("#myInfo").on('tap',function(){
	eg.loginAjax(function(){
		eg.ajax(eg.jrURL + "user/logininfo", {}, 'get', function(data){
			if(data.status == 1){
				if(data.data.userType == 0){
					mui.openWindow({
				        url:"../my/informance.html",
				        id:"informance"
				   	});
				}else{
					mui.openWindow({
				        url:"../my/myInformance.html",
				        id:"myInformance"
				   });
				}
			}else{
				mui.toast(data.message,{duration: 'short',type: 'div'});
			}
		},function(){
			
		})
	})
})
//公司简介
$("#companyProfile").on('tap',function(){
	mui.openWindow({
        url:"../my/companyProfile.html",
        id:"companyProfile"
    });
})
$("#oBtn").on("tap",function(){
	var params = {};
	eg.postAjax2("logout",params, function(data) {
		plus.webview.currentWebview().reload();
	},function(data){

	});
})
$("#login").on("tap",function(){
	mui.openWindow({
		url:"../login/login.html",
		id:"login"
	})
})

/*上传头像*/
$("#uploadImg").on("tap",function(){
	eg.loginAjax(function(){
		var btnArray = [{title:"我的相册"},{title:"拍照"}];
		plus.nativeUI.actionSheet( {
			cancel:"取消",
			buttons:btnArray
		}, function(e){
			var index = e.index;
			switch (index){
				case 0:
					break;
				case 1:
				plus.gallery.pick(function(p) {
					imageBack(p);
				},function(error){
					
					});
					break;
				case 2:
					getImage();						
					break;
			}
		});
	})
})

/***
 * 调取摄像头拍照
 * @param {照片序号} 
 */
var localurl="";
function getImage() {
	var cmr = plus.camera.getCamera();
	cmr.captureImage(function(p) {
		plus.io.resolveLocalFileSystemURL(p, function(entry) {
			localurl = entry.toLocalURL();
			var img=new Image();
			img.src=localurl;
			img.onload=function(){
				plus.nativeUI.showWaiting( "头像上传中..." );
				if(plus.os.name == 'Android'){
					EXIF.getData(img,function(){
						var ori=EXIF.getTag(this,"Orientation");
						orisAndroid(ori,localurl);
					});
				}else{												
					EXIF.getData(img,function(){
						var ori=EXIF.getTag(this,"Orientation");						
						plus.zip.compressImage({
							src:localurl,
							dst:localurl,
							overwrite:true,
							rotate:90*0		// 旋转90度
						},	function (eventData){
							var target = eventData.target;	
							$("#uploadImg").attr("src",target);
							imageToBase64(target);
						},function(error) {
							alert("error code:"+error.code+",error message:"+error.message);
						});
					});
				}
			}
		});
	});
};
//判断当前选取图片方向
function orisAndroid(ori,path){
    switch(ori){ 
		case 1:
//			当为1时候，显示正确
//			alert('正常显示');
		  	rotateImage(0,path);
		  	break;
		case 3:
//			alert('旋转180');
		  	rotateImage(2,path);
		  	break;
		case 6:
//			alert("顺时针旋转90");
		  	rotateImage(1,path);
		  	break;
		case 8:
//			alert("逆时针旋转90");
		  	rotateImage(3,path);
		  	break;
		default:
		 	rotateImage(0,path);
	}
}

//旋转图片
function rotateImage(Ori,path){
	var absPath = document.URL;
	var paths = path.substring(path.lastIndexOf('/')+1,path.length);
	paths = absPath.split("www")[0] + "doc/my" + paths;
	if(Ori==0){ 
		imageToBase64(path);
	}else{
		plus.zip.compressImage({
			src:path,
			dst:paths,
			overwrite:true,
			rotate:90*Ori		// 旋转90度
		},
		function() {
			
		},function(error) {
			alert("error code:"+error.code+",error message:"+error.message);
			plus.nativeUI.closeWaiting();
		});
	}
}

function imageBack(path) {
 	var img = new Image();
 	localurl = path;
	img.src = localurl;
	img.onload = function(){
		plus.nativeUI.showWaiting( "头像上传中..." );
		if(plus.os.name == 'Android'){
			EXIF.getData(img,function(){
				var ori=EXIF.getTag(this,"Orientation");
				orisAndroid(ori,localurl);
			});
		}else{
			EXIF.getData(img,function(){
				var ori=EXIF.getTag(this,"Orientation");
				plus.zip.compressImage({
					src:localurl,
					dst:localurl,
					overwrite:true,
					rotate:90*0		// 旋转90度
				},	function (eventData){
					var target = eventData.target;	
					$("#uploadImg").attr("src",target);
					imageToBase64(target);
				},function(error) {
					alert("error code:"+error.code+",error message:"+error.message);
				});
			});
		}
	}
}
//将图片转为base64编码
function imageToBase64(p){
	var img = new Image();
        img.src = p;        // 传过来的图片路径在这里用。
        img.onload = function () {
            var that = this;
            //生成比例 
            var w = that.width,
                h = that.height,
                scale = w / h; 
                w = 60 || w;              //480  你想压缩到多大，改这里
                h = w / scale;
            //生成canvas
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
               $(canvas).attr({width : w, height : h});
            ctx.drawImage(that, 0, 0, w, h);
            var base64 = canvas.toDataURL('image/jpeg', 0.7);   //1最清晰，越低越模糊。有一点不清楚这里明明设置的是jpeg。弹出 base64 开头的一段 data：image/png;却是png。哎开心就好，开心就好
            var parameters = {
				"portrait": base64.split(',')[1]
			};
			//调取提交接口
			eg.postAjax("user/portrait", parameters, function(data) {
				if(data.status == "1"){
					mui.toast("上传头像成功",{duration: 'short',type: 'div'});			
					$("#uploadImg").attr("src",base64);
				}
				plus.nativeUI.closeWaiting();
			})           
	    }
}