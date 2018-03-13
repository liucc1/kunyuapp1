mui.init();
mui('.mui-scroll-wrapper').scroll();
var options;//上拉刷新下拉加载对象

mui.plusReady(function(){
	options = [{
		scrollerId:"item1",
		url:"app/message",//查询地址
		params:{
			"msgtype":1
		},//查询参数
		downSuccess : function(ele,data){
			$(ele).html("");
			addEle(ele,data.rows);
		},//下拉成功回调方法
		upSuccess : function(ele,data){
			addEle(ele,data.rows);
		}//上拉成功回调方法
	},{
		scrollerId:"item2",
		url:"app/message",//查询地址
		params:{
			"msgtype":2
		},//查询参数
		downSuccess : function(ele,data){
			$(ele).html("");
			addEle2(ele,data.rows);
		},//下拉成功回调方法
		upSuccess : function(ele,data){
			addEle2(ele,data.rows);
		}//上拉成功回调方法
	}];
	PullToRefreshFactory.init(options);
	var ele = document.getElementById("busiMessage");
	PullToRefreshFactory.scrollers[0].loadData(true,ele);
})

//加载活动公告
$("#activity").one('tap',function(){
	var ele = document.getElementById("activBulletin");
	PullToRefreshFactory.scrollers[1].loadData(true,ele);
})

//加载数据
function addEle(ele,data){
	var html = '';
	data.forEach(function(item){
		html += '<li class="mui-table-view-cell"><div class="mui-table">'
				+'<div class=" mui-col-xs-12">'
				+'<div class="mui-table-cell mui-col-xs-8">'
				+'<span class="mui-ellipsis">'+item.title
				+'</span></div><div class="mui-table-cell mui-col-xs-4 mui-text-right">'
				+'<span class="mui-h5">'+item.createTime.substr(0,16)
				+'</span></div><div class="pads">'+item.notice
				+'</div></div></div></li>';
	})
	$(ele).append(html);
}
function addEle2(ele,data){
	var html = '';
	data.forEach(function(item){
		html += '<li class="mui-table-view-cell" data-id="'+item.id+'"><div class="mui-table messageDiv">'
				+'<div class=" mui-col-xs-12">'
				+'<div class="mui-table-cell mui-col-xs-8">'
				+'<span class="mui-ellipsis">'+item.title
				+'</span></div><div class="mui-table-cell mui-col-xs-4 mui-text-right">'
				+'<span class="mui-h5">'+item.createTime.substr(0,16)
				+'</span></div><div class="pads">'+item.notice
				+'</div></div></div></li>';
	})
	$(ele).append(html);
}

mui("#activBulletin").on('tap','li',function(){
	var id = $(this).attr("data-id");
	mui.openWindow({
        url:'./messageDetail.html',
        id:'messageDetail',
        extras:{
        	idStr : id
        }
   	});
})