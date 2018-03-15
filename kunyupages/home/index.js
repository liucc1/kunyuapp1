mui.init();

mui.plusReady(function(){
	eg.postAjax("app/message", {
		page:1,
		limit:3,
		msgtype:2
	}, function(data) {
		if(data.code == 1){
			data = data.rows;
			var html = '';
			data.forEach(function(item){
				html += '<li class="mui-ellipsis" data-id="'+item.id+'">'+item.title+'</li>'
			})
			$("#notice>ul").html(html);
			$('#notice').vTicker({
				pause: 3000
			});
		}else{
			mui.toast(data.message);
		}
	})
	plus.nativeUI.closeWaiting();
})

$("#scheduleDetail").on("tap",function(){
	eg.loginAjax(function(){
		mui.openWindow({
	        url:"../certifiedMessage/scheduleList.html",
	        id:"scheduleList"
	   	});
	})
})
$("#dealDetail").on("tap",function(){
	eg.loginAjax(function(){
		mui.openWindow({
	        url:"../certifiedMessage/pendingList.html",
	        id:"pendingList"
	   	});
    })
})
function goCertified(){
	eg.loginAjax(function(){
		mui.openWindow({
	        url:"../certifiedMessage/certifiedMessage.html",
	        id:"pendingList"
	   	});
	})
	
}
//banner详情
$("#banner").on('tap',function(){
	mui.openWindow({
        url:"../index/bannerDetail.html",
        id:"bannerDetail"
   	});
})
//房产示例
$("#houseSample").on('tap',function(){
	mui.openWindow({
		"url" : "../index/houseSample.html",
		"id": "houseSample"		
	});
})
//产品介绍
$("#productlist").on('tap','li',function(){
	var type = $(this).attr("data-type");
	mui.openWindow({
		"url" : "../productmanage/productdetails.html",
		"id": "productdetails",
		extras:{
			type:type
		}
	});
})

//消息详情
mui("#notice>ul").on('tap','li',function(){
	var id = $(this).attr("data-id");
	mui.openWindow({
        url:'../my/messageDetail.html',
        id:'messageDetail',
        extras:{
        	idStr : id
        }
   	});
})

//查看全部消息
$("#allNotice").on('tap',function(){
	eg.loginAjax(function(){
		mui.openWindow({
	        url:'../my/message.html',
	        id:'message'
	   	});
   	})
})
