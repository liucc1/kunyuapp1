mui.init({
	swipeBack:false //关闭右滑关闭功能
});
mui.plusReady(function(){
	//阻尼系数
	var deceleration = mui.os.ios?0.003:0.0009;
	mui('.mui-scroll-wrapper').scroll({
		bounce: false,
		indicators: true, //是否显示滚动条
		deceleration:deceleration
	});
})
//关键字搜索
$("#search").keydown(function(e){
	event.stopPropagation();
	if(e.keyCode == 13){
		document.activeElement.blur();
		searchData($("#search").val().trim());
	}
})

function searchData(value){
	var parameters = {
		"serviceId": "03008004",
		"key":value
	};
	var url = "customer/queryCustStep.do";
	plus.nativeUI.showWaiting();
	eg.postAjax(url, parameters, function(data) {
		plus.nativeUI.closeWaiting();
		var custList = data.custList;
		var html = "";
		if(custList == ""){
			mui.toast("此客户或手机号不存在",{duration: 'short'});
		}else{
			$(custList).each(function(key,val){
				html += '<li class="mui-table-view-cell two-li" data-list='+JSON.stringify(val)+'>';
				html += '<div class="mui-slider-handle">'
				html += '<div class="w90 mass_pos">'
				html += '<div class="mui-pull-left" >'
				if(val.sex == "1"){
					html += '<img src="../images/male.png">'			
				}else{
					html += '<img src="../images/female.png">'
				}		
				html += '<span>'+val.custName+'</span></div>'
				html += '<div class="mui-pull-right" data-img="'+val.mobile+'">'
				html += '<span class="backlog-span callPhone">'+val.mobile+'</span>'
				html += '<img  class="mui-media-object callPhone backlog-image" src="../images/call.png"></div></div>'
				html += '<div class="cust">'
				if(val.step){
					html += '<div class="mui-pull-left mll">状态：<span>'+val.step+'</span></div><br />'
				}else{
					html += '<div class="mui-pull-left mll">状态：<span>暂无数据</span></div><br />'
				}
				if(val.custManagerName){
					html += '<div class="mui-pull-left mll">客户经理：<span>'+val.custManagerName+'</span></div>'
				}else{
					html += '<div class="mui-pull-left mll hid">客户经理：<span>'+val.custManagerName+'</span></div>'
				} 
				html += '<button type="button" class="mui-pull-right mtt footprint">足迹</button></div></div></li>'
				
			});
			$('.custPath').html(html);
		} 
	});
}

//查看详情
mui(".mui-table-view").on('tap','.mui-slider-handle',function(){
	var list = JSON.parse($(this).parent().attr("data-list")); 
	if(list.custSeq){
		mui.openWindow({
			"url": "custDetails.html",
			"id": "custDetails",
			extras:{
				custData:list,
			}
		});
	}else{
		mui.toast("该客户暂无详情数据",{duration: 'short'});		
	}
});

//足迹
mui(".mui-table-view").on('tap','.footprint',function(){
	event.stopPropagation();
	var list = JSON.parse($(this).parents("li").attr("data-list"));
	mui.openWindow({
		"url": "footprint.html",
		"id": "footprint",
		extras:{
			custData:list
		}
	});
});

//打电话
mui(".mui-table-view").on('tap',".callPhone",function(){
	event.stopPropagation();
	var phineNumber = this.getAttribute("data-img");
	plus.device.dial(phineNumber,false);
});

//关闭ios平台原生右滑关闭页面；
if (mui.os.plus && mui.os.ios) {
	mui.plusReady(function() { //5+ iOS暂时无法屏蔽popGesture时传递touch事件，故该demo直接屏蔽popGesture功能
		plus.webview.currentWebview().setStyle({
			'popGesture': 'none'
		});
	});
}
