mui.init();

$.getJSON('news.json',function(data){
	var html = template('news_tmp', data);
	$('#newsCon').html(html);
})

mui(".mui-table-view").on('tap','.mui-table-view-cell',function(){
	var id = $(this).attr("data-id");
	mui.openWindow({
		url:"detailDemo.html",
		id:"detailDemo",
		extras:{
			idStr:id
		}
	})
})
