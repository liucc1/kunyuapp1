mui.init({
	swipeBack: false
});
mui.plusReady(function(){
	eg.getCsrf();
	var csrf=localStorage.getItem("csrf");
	var params = {
		"_csrf":csrf,
		"page":"1",
		"limit":"1000000"
	}
	plus.nativeUI.showWaiting();
	eg.postAjax("customer/list", params, function(data) {
		plus.nativeUI.closeWaiting();
		if(data.code=="0"){
			var arr = data.rows;
			for(var index in arr){
				var custList = arr[index];
				$(custList).each(function(key,val){
					var dataList = {"sid":val.sid,"status":val.status};
					var createTime = val.createTime.split(".")[0];
					var html = '<ul class="mui-table-view mui-table-view-chevron ulTop">'
					html += '<li class="mui-table-view-cell mui-media" data-list='+JSON.stringify(dataList)+'>';
					html += '<a class="mui-navigate-right font20 detail">';
					html += '<div class="mui-table">';
					html += '<div class="mui-table-cell mui-col-xs-10 font14">';
					if(val.status){
						html += '<label>'+val.name+'<span class="ml5">:</span><span class="ml10" id="status">'+main.obtainValue('status',val.status)+'</span></label>';
					}else{
						html += '<label>'+val.name+'<span class="ml5">:</span><span class="ml10" id="status">处理中</span></label>';
					}
					html += '<p style="margin-top: 5px;font-size: 12px;">'+createTime+'</p>';
					html += '</div></li></ul>';
					$('#productlist').append(html);
				});
			}
		}
	},function(data){
		if(data=="403") eg.getCsrf();
	});
})
mui('#productlist').on('tap','.detail', function() {
	var list = $(this).parents("li").attr("data-list");
	list = JSON.parse(list);
	var sid = list.sid;
	status = list.status;
	if(status){
		var status = main.obtainValue('status',list.status);	
	}else{
		status = "处理中";
	}	
	mui.openWindow({
        url:"./pendingListDetail.html",
        id:"pendingListDetail",
        extras:{
        	"sid":sid,
        	"status":status
        }
    });   
})
