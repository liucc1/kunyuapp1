mui.init({ swipeBack:false });

var ids;//客户id，用户点击去处理时使用
var titleName;//页面标题，用于获取content
var response;//数据源
mui.plusReady(function() {
//	直接查询待办事项，之后调用回调方法
	var self = plus.webview.currentWebview()
	ids = self.ids
	titleName = self.titleName
	$('.mui-title').html(titleName)
	//查询数据
	for(var i in pendingListData.json.data){
		if(pendingListData.json.data[i].id==ids){
			getDataBack(pendingListData.json.data[i])
		}
	}
	//获取当前标题对应的实体
	function getContent(titles){
		for(var i=0;i<contentArr.length;i++){
			if(contentArr[i].indexOf(titles)!=-1){
				return contentArr[i].split('&&')[1]
			}
		}
	}
	function getDataBack(res){
		response = res//数据源
		var _doc=document.getElementsByTagName('head')[0]
		var scripts=document.createElement('script')
		scripts.setAttribute('type','text/javascript')
		scripts.setAttribute('src','./js/scheduleContent.js')
		_doc.appendChild(scripts)
		scripts.onload=scripts.onreadystatechange=function(){
		    if(!this.readyState||this.readyState=='loaded'||this.readyState=='complete'){
		      	var content = getContent(titleName)
				var el = document.getElementById('square')
				el.innerHTML = content
		    }
		    scripts.onload=scripts.onreadystatechange=null;
		}
	}
	//去处理
//	$('#oBtn').click(function(){
//		mui.openWindow({
//			url : "./appointment.html",
//			id: "appointment",
//			extras:{
//				ids:ids
//			}
//		});
//	})
})

