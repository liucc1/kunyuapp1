mui.init({
	swipeBack: false
});
mui.plusReady(function(){
	var params = {
		"page":"1",
		"limit":"500"
	}
	plus.nativeUI.showWaiting();
	eg.postAjax("customer/list", params, function(data) {
		plus.nativeUI.closeWaiting();	
		if(data.code=="0"){
			var arr = data.rows;
			for(var index in arr){
				var custList = arr[index];
				$(custList).each(function(key,val){
					var name = val.name.replace(/\s/g,"");//对象的value值中间有空格传不过去
					var dataList = {"sid":val.sid,"status":val.status,"name":name,"appointmentDate":val.appointmentDate,"timeQuantum":val.timeQuantum,"refuseDesc":val.refuseDesc,"activeAmount":val.activeAmount,"activeDate":val.activeDate};
					var createTime = val.createTime.split(".")[0];
					var html = '<ul class="mui-table-view mui-table-view-group">';
					html += '<li class="mui-table-view-cell" data-list='+JSON.stringify(dataList)+'>';
					html += '<div class="mui-media-body">';
					html += '<p class="detailPCss" id="recName">'+val.name+'</p>';
					html += '<p class="cde-p has-b" id="recTime">'+createTime+'</p>';
					if(val.status){
						html += '<div class="messageDiv" id="status">'+main.obtainValue('status',val.status)+'</div>';
						html += '<p class="cde-p"><span>信用贷<a id="process">';
						if(main.obtainValue('status',val.status)=="已驳回"){
							html += '[影像校验失败]'
						}else if(main.obtainValue('status',val.status)=="待完善"){
							html += '[信息采集中]';
						}else if(main.obtainValue('status',val.status)=="已提交"){
							html += '[影像审核中]';
						}else if(main.obtainValue('status',val.status)=="可预约"){
							html += '[可预约面签]';
						}else if(main.obtainValue('status',val.status)=="已预约"){
							html += '[可修改预约时间]';
						}else if(main.obtainValue('status',val.status)=="处理中"){
							html += '[信息处理中]';
						}
					}else{
						html += '<div class="messageDiv" id="status">处理中</div>';
						html += '<p class="cde-p"><span>信用贷<a id="process">';
						html += '[信息处理中]';
					}					
					html += '</a></span></p></div></li></ul>';
					$('#pendingList').append(html);
				});
			}
		}
	});
})

mui('#pendingList').on('tap', '.mui-media-body', function() {
	var dataList = $(this).parents("li").attr("data-list");
	dataList = JSON.parse(dataList);
	mui.openWindow({
        url:"./pendingListDetail.html",
        id:"pendingListDetail",
        extras:{
        	"dataList":dataList
        }
    });   
})
