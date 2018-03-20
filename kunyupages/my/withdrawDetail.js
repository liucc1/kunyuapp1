mui.init();
mui.plusReady(function(){
	eg.postAjax2("commission/extract/list",{},function(data){
		if(data.code == "1"){
			var html = '<tr><th>提现金额</th><th>提现时间</th><th>剩余金额</th></tr>';
			var arr = data.rows;
			for(var index in arr){
				var recordList = arr[index];
				$(recordList).each(function(key,val){
					html += '<tr><td>'+val.withdrawalsAmount+'</td>'
					html += '<td>'+val.withdrawalsTime+'</td>'
					html += '<td class="table-charge-td">'+''+'</td>'
				})
			}
			$("#recordList").html(html);
		}
	})
})