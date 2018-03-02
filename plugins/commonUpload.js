/*
 * targetElement：添加照片的元素（jquery元素）
 * insertElement：被添加元素（DOM元素）
*/
var targetElement,insertElement;

/*
 *通过相册或相机获取照片 
 * 参数：num：获取的张数
*/
function getByGally(){
	plus.gallery.pick(function(e) {
		var oriPath = [];
		var finPath = [];
		for(var i in e.files){
			oriPath.push(e.files[i]);
			var temp = e.files[i].split("/");
			var p = "_doc/" + temp[temp.length-1];
			finPath.push(p);
		}
		compressAll(oriPath,finPath);
	},function(error){
		mui.toast("请重新选择");
	},{filter:"image",multiple:true,maximum:9});
}

/*
 *逐个压缩图片
 * 参数：
 * oriPath：图片原始路径
 * finPath：压缩后的图片存储路径
 * num：获取的张数
*/
function compressAll(oriPath,finPath){
	var state = 0;
	var funInterval;
	var compressQueue = {
		index : 0,
		compress : function(j){
				state = num;
				plus.zip.compressImage({
					src:oriPath[j],
					dst:finPath[j],
					quality:50,
					overwrite:true
				},function() {
					num++;
					var path=plus.io.convertLocalFileSystemURL(finPath[j]);
					var ele = $(insertElement).clone();
					ele.children("img").attr("src",path);
					targetElement.prepend(ele[0]);
				},function(error) {
					alert("压缩失败!");
				});			
		},
		next : function(){
			if(num > state){
				this.index++;
				if(this.index < oriPath.length){
					this.compress(this.index);
				}else{
					mui.previewImage();
					if(funInterval){
						clearInterval(funInterval);
					}
				}
			}
		}
	}
	compressQueue.compress(compressQueue.index);
	funInterval = setInterval(function(){
		compressQueue.next();
	},1000);
}

/*
 *调用相机获取图片
 * 参数：
*/
function takePhoto(){
	var cmr = plus.camera.getCamera();
	cmr.captureImage(function(p) {	
		plus.io.resolveLocalFileSystemURL(p, function(entry) {
			var localurl = entry.toLocalURL();
			var img=new Image();
			img.src=localurl;
			plus.nativeUI.showWaiting();
			img.onload=function(){
				if(plus.os.name == 'Android'){
					EXIF.getData(img,function(){
						var ori=EXIF.getTag(this,"Orientation");
						orisAndroid(ori,localurl);
					});
				}else{
					plus.zip.compressImage({
						src:localurl,
						dst:localurl,
						quality:50,
						overwrite:true
					},function() {
						num++;	
						$(insertElement).children("img").attr("src",localurl);
						targetElement.prepend(insertElement);
						mui.previewImage();
					},function(error) {
						alert("压缩失败!");
					});
				}
			}
		});
	},function(error){
		mui.toast("未获取图片，请确认摄像头权限开启之后重新尝试");
	});
}

//判断当前选取图片方向
function orisAndroid(ori,path){
    switch(ori){ 
		case 1:
			//当为1时候，显示正确
		  	rotateImage(0,path);
		  	break;
		case 3:
//				  	alert('旋转180');
		  	rotateImage(2,path);
		  	break;
		case 6:
//				  	alert("顺时针旋转90");
		  	rotateImage(1,path);
		  	break;
		case 8:
//				  	alert("逆时针旋转90");
		  	rotateImage(3,path);
		  	break;
		default:
		 	rotateImage(0,path);
	}
}

//旋转图片
function rotateImage(Ori,path){
	plus.zip.compressImage({
		src:path,
		dst:path,
		quality:50,
		overwrite:true,
		rotate:90*Ori		// 旋转90度
	},
	function() {
		plus.nativeUI.closeWaiting();
		num++;
		$(insertElement).children("img").attr("src",path);
		targetElement.prepend(insertElement);
		mui.previewImage();
	},function(error) {
		alert("压缩失败");
		plus.nativeUI.closeWaiting();
	});
}

//从相册或拍照选取照片
function chooseImg(targetEle,insertEle){
	targetElement = targetEle;
	insertElement = insertEle;
	var btnArray = [{title:"我的相册"},{title:"拍照"}];
	plus.nativeUI.actionSheet( {
		cancel:"取消",
		buttons:btnArray
	}, function(e){
		var index = e.index;
		switch (index){
			case 1:
				getByGally();
				break;
			case 2:
				takePhoto();					
				break;
		}
	} );
}
