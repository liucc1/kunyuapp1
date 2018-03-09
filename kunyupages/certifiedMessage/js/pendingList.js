mui.plusReady(function(){
	plus.nativeUI.showWaiting();
	_page.init({
		container:"#pullrefresh",
		url:"customer/list",
		params:{},
		downSuccess:function(data){
			plus.nativeUI.closeWaiting();
			if(data.code=="0"){
				$('#productlist').html("");
				addEle(data);
			}
		},
		upSuccess:function(data){
			plus.nativeUI.closeWaiting();
			if(data.code=="0"){
				addEle(data);
			}
		}
	})
})
function addEle(data){
	var arr = data.rows;
	for(var index in arr){
		var custList = arr[index];
		$(custList).each(function(key,val){
			var name = val.name.replace(/\s/g,"");//对象的value值中间有空格传不过去
			var dataList = {"sid":val.sid,"status":val.status,"name":name,"mobile":val.mobile,"appointmentDate":val.appointmentDate,"timeQuantum":val.timeQuantum,"refuseDesc":val.refuseDesc,"activeAmount":val.activeAmount,"activeDate":val.activeDate};
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
	
mui('#productlist').on('tap','.detail', function() {
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
