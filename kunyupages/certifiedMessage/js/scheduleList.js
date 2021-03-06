mui.plusReady(function(){
	plus.nativeUI.showWaiting();
	_page.init({
		container:"#pullrefresh",
		url:"customer/list",
		params:{},
		downSuccess:function(data){
			plus.nativeUI.closeWaiting();
			if(data.code=="0"){
				$('#pendingList').html("");
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

//关键字搜索
$("#search").keydown(function(e){
	param = {};
	event.stopPropagation();
	if(e.keyCode == 13){
		document.activeElement.blur();
		searchData($("#search").val().trim(),param);
	}
})
function searchData(val,param){
	_page.scroller.params.name = val;
	_page.scroller.loadData(true);
}

//判断搜索框是否为空，为空时删除搜索条件
function ifNull(ele){
	if($("#search").val().trim() == ""){
		param.name = "";
	}
}

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
