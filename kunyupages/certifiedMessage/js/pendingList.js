mui.init({
	swipeBack: false
});
mui.plusReady(function(){
	eg.getCsrf();
	var csrf=localStorage.getItem("csrf");
	var params = {
		"_csrf":csrf,
		"page":"1",
		"limit":"4"
	}
	plus.nativeUI.showWaiting();
	eg.postAjax("customer/list", params, function(data) {
		plus.nativeUI.closeWaiting();
//			alert(data.msg);
//			alert(data.total);
//			alert(data.code);		
		if(data.code=="0"){
//			var arr = JSON.stringify(data.rows);
			var arr = data.rows;
			alert(arr);
			for(var index in arr){
				var custList = data.arr[index];
				$(custList).each(function(key,val){
					var html = '<ul class="mui-table-view mui-table-view-chevron ulTop">'
					html += '<li class="mui-table-view-cell mui-media" data-list='+JSON.stringify(val)+'>';
					html += '<a class="mui-navigate-right font20">';
					html += '<div class="mui-table">';
					html += '<div class="mui-table-cell mui-col-xs-10 font14">';
					html += '<label>'+val.name+'<span class="ml5">:</span><span class="ml10">影像审核不通过</span></label>';
					html += '<p style="margin-top: 5px;font-size: 12px;">'+val.createTime+'</p>';
					html += '</div></li></ul>';
					$('#productlist').append(html);
				});
			}
		}
	},function(data){
		if(data=="403") eg.getCsrf();
	});
})
mui('#productlist').on('tap', 'ul', function() {
	mui.openWindow({
        url:"./pendingListDetail.html",
        id:"pendingListDetail"
   	});
})
