/*
 *通过相册或相机获取照片 
 * 参数：num：获取的张数
*/
function getByGally(num){
	plus.gallery.pick(function(e) {
		var oriPath = [];
		var finPath = [];
		for(var i in e.files){
			oriPath.push(e.files[i]);
			var temp = e.files[i].split("/");
			var p = "_doc/" + temp[temp.length-1];
			finPath.push(p);
		}
		compressAll(oriPath,finPath,num);
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
function compressAll(oriPath,finPath,num){
	var pathArr = [];//图片路径数值
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
					pathArr.push(path);
//					var html = '<div class="add_img">';	
//					html += '<img id="photo'+num+'" class="shakeImg" src="'+path+'" width="100%" height="100%" onclick="showImage(this,photo'+num+')" />'
//							+'<span class="none" onclick="delImg(this);"><img src="../images/redDel.png"></span></div>';
//					$("#imgDiv").prepend(html);
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
					if(funInterval){
						clearInterval(funInterval);
						return pathArr;
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
function takePhoto(that,num){
	var cmr = plus.camera.getCamera();
	cmr.captureImage(function(p) {	
		plus.io.resolveLocalFileSystemURL(p, function(entry) {
			var localurl = entry.toLocalURL();
			plus.zip.compressImage({
				src:localurl,
				dst:localurl,
				quality:50,
				overwrite:true
			},function() {
				if(that){
					that.src = localurl;
				}else{
					num++;
					return localurl;
//					var html = '<div class="add_img">';	
//					html += '<img id="photo'+num+'" class="shakeImg" src="'+localurl+'" width="100%" height="100%" onclick="showImage(this,photo'+num+')" />'
//							+'<span class="none" onclick="delImg(this);"><img src="../images/redDel.png"></span></div>';
//					$("#imgDiv").prepend(html);
				}					
			},function(error) {
				alert("压缩失败!");
			});
		});
	},function(error){
		mui.toast("未获取图片，请确认摄像头权限开启之后重新尝试");
	});
}