mui.init();
var name,mobile,sid,status,date;
var getData = [];
mui.plusReady(function(){
	var self = plus.webview.currentWebview();
	name = self.name;
	mobile = self.mobile;
	sid = self.sid;
	status = self.status;
	$("#custName").val(name);
	$("#custMobile").val(mobile);
	var url = eg.jrURL+"jt/appoint/date/0";
	$.get(url,function(data){		
		var max = data.max;
		for(var i=0;i<data.list.length;i=i+2){
			var t = data.list;
			var obj = {
				title:dealDate(t[i].appointmentDate)+"-"+dealDate(t[i+1].appointmentDate),
				status1:!!(max-t[i].mcount),
				status2:!!(max-t[i].acount),
				status3:!!(max-t[i+1].mcount),
				status4:!!(max-t[i+1].acount)
			}
			getData.push(obj);
		}
		var userPicker = new mui.PopPicker();
		userPicker.setData(getData);
		var showUserPickerButton = document.getElementById('showUserPicker');
		var appointTime = document.getElementById('appointTime');
		showUserPickerButton.addEventListener('tap', function(event) {
			userPicker.show(function(items) {
				appointTime.value = items;
				//返回 false 可以阻止选择框的关闭
				//return false;
			});
		}, false);
	})
});
function dealDate(res){
	return res.substring(5,7)+'.'+res.substring(8,10)
}
$("#oBtn").on("tap",function(){
	var appointTime = $("#appointTime").val();
	if(isNullVal(appointTime)){
		mui.toast("请选择预约时间！");
		return false;
	}
	var date = "2018-"+appointTime.substring(0,2)+'-'+appointTime.substring(3,5);
	if(appointTime.substring(5,7)=="上午"){
		var quar = "1";
	}else{
		var quar = "2";
	}
	plus.nativeUI.showWaiting();
	var param = {
		"sid":sid,
		"state":"1",
		"preProcess":status,
		"date":date,
		"quar":quar
	}
	eg.postAjax("jt/appoint",param,function(data){
		plus.nativeUI.closeWaiting();
		if (data.status == "1") {
			mui.toast("预约成功");
			setTimeout(function(){
				eg.toHome();
			},500)		
		} else{
			mui.toast(data.message);
		}
	})
})




