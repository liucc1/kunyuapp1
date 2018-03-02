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
				var custList = arr[index];
				alert(custList);
				$(custList).each(function(key,val){
					var html = '<ul class="mui-table-view mui-table-view-group">'
					html += '<li class="mui-table-view-cell" data-list='+JSON.stringify(val)+'>';
					html += '<div class="mui-media-body">';
					html += '<p class="detailPCss" id="recName">'+val.name+'</p>';
					html += '<p class="cde-p has-b" id="recTime">'+val.createTime+'</p>';
					html += '<div class="messageDiv" id="process">'+val.status+'</div>';
					html += '<p class="cde-p"><span>信用贷<a id="status">[影像审核中]</a></span></p>';
					html += '</div></li></ul>';
					$('#pendingList').append(html);
				});
			}
		}
	},function(data){
		if(data=="403") eg.getCsrf();
	});
})
//mui('#pendingList').on('tap', 'ul', function() {
////	var list = JSON.parse($(this).parents("li").attr("data-list"));
////	var sid = list.sid;
//	mui.openWindow({
//      url:"./pendingListDetail.html",
//      id:"pendingListDetail"
////      extras:sid
// 	});
//})
