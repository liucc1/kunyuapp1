mui.init();
var name,mobile;
var getData = [];
mui.plusReady(function(){
	var self = plus.webview.currentWebview();
	name = self.name;
	mobile = self.mobile;
	$("#custName").val(name);
	$("#custMobile").val(mobile);
	var url = eg.jrURL+"jt/appoint/date/0";
//	$.get(url,function(data){		
//			alert(JSON.stringify(data));
//			var max = data.max;
//			for(var i=0;i<data.list.length;i=i+4){
//				var t = data.list;
//				var obj = {
//					title:dealDate(t[i].appointmentDate)+"-"+dealDate(t[i+2].appointmentDate),
//					status1:!!(max-t[i].mcount),
//					status2:!!(max-t[i+1].acount),
//					status3:!!(max-t[i+2].mcount),
//					status4:!!(max-t[i+3].acount)
//				}
//				getData.push(obj);
//			}
//			var userPicker = new mui.PopPicker();
//			userPicker.setData(getData);
//			var showUserPickerButton = document.getElementById('showUserPicker');
//			var appointTime = document.getElementById('appointTime');
//			showUserPickerButton.addEventListener('tap', function(event) {
//				userPicker.show(function(items) {
//					appointTime.value = items;
//					//返回 false 可以阻止选择框的关闭
//					//return false;
//				});
//			}, false);
//	})
	/**
	 * 获取对象属性的值
	 * 主要用于过滤三级联动中，可能出现的最低级的数据不存在的情况，实际开发中需要注意这一点；
	 * @param {Object} obj 对象
	 * @param {String} param 属性名
	 */	
	//普通示例	
	var dataSource = {'json':{
		'max':3,'total':7,
		'list':[
			{"weekDate":'周五',"appointmentDate":'20180219','acount':'3',
			'timeQuantum':'1','count':'null','mcount':'2'},
			{"weekDate":'周五',"appointmentDate":'20180219','acount':'3',
			'timeQuantum':'2','count':'null','mcount':'3'},
			{"weekDate":'周五',"appointmentDate":'20180220','acount':'2',
			'timeQuantum':'1','count':'null','mcount':'2'},
			{"weekDate":'周五',"appointmentDate":'20180220','acount':'3',
			'timeQuantum':'2','count':'null','mcount':'3'},
			{"weekDate":'周五',"appointmentDate":'20180221','acount':'3',
			'timeQuantum':'1','count':'null','mcount':'3'},
			{"weekDate":'周五',"appointmentDate":'20180221','acount':'3',
			'timeQuantum':'2','count':'null','mcount':'3'},
			{"weekDate":'周五',"appointmentDate":'20180222','acount':'3',
			'timeQuantum':'1','count':'null','mcount':'3'},
			{"weekDate":'周五',"appointmentDate":'20180222','acount':'3',
			'timeQuantum':'2','count':'null','mcount':'3'},
			{"weekDate":'周五',"appointmentDate":'20180223','acount':'3',
			'timeQuantum':'1','count':'null','mcount':'2'},
			{"weekDate":'周五',"appointmentDate":'20180223','acount':'3',
			'timeQuantum':'2','count':'null','mcount':'2'},
			{"weekDate":'周五',"appointmentDate":'20180224','acount':'3',
			'timeQuantum':'1','count':'null','mcount':'2'},
			{"weekDate":'周五',"appointmentDate":'20180224','acount':'3',
			'timeQuantum':'2','count':'null','mcount':'3'},
			{"weekDate":'周五',"appointmentDate":'20180225','acount':'2',
			'timeQuantum':'1','count':'null','mcount':'2'},
			{"weekDate":'周五',"appointmentDate":'20180225','acount':'3',
			'timeQuantum':'2','count':'null','mcount':'3'},
			{"weekDate":'周五',"appointmentDate":'20180226','acount':'3',
			'timeQuantum':'1','count':'null','mcount':'3'},
			{"weekDate":'周五',"appointmentDate":'20180226','acount':'3',
			'timeQuantum':'2','count':'null','mcount':'3'},
			{"weekDate":'周五',"appointmentDate":'20180227','acount':'3',
			'timeQuantum':'1','count':'null','mcount':'3'},
			{"weekDate":'周五',"appointmentDate":'20180227','acount':'3',
			'timeQuantum':'2','count':'null','mcount':'3'},
			{"weekDate":'周五',"appointmentDate":'20180228','acount':'3',
			'timeQuantum':'1','count':'null','mcount':'2'},
			{"weekDate":'周五',"appointmentDate":'20180228','acount':'3',
			'timeQuantum':'2','count':'null','mcount':'2'},
		]
	}}	
	for(var i=0;i<dataSource.json.list.length;i=i+4){
		max = dataSource.json.max
				var t = dataSource.json.list;
				var obj = {
					title:dealDate(t[i].appointmentDate)+"-"+dealDate(t[i+2].appointmentDate),
					status1:!!(max-t[i].mcount),
					status2:!!(max-t[i+1].acount),
					status3:!!(max-t[i+2].mcount),
					status4:!!(max-t[i+3].acount)
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
});
function dealDate(res){
	return res.substring(4,6)+'.'+res.substring(6,8)
}




