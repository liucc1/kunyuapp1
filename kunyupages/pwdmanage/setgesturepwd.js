var saveItem;
(function($, doc) {
	$.init();
	var loc = doc.querySelector('#holder');
	var record = [];
	var records;
	var lockDiv = doc.querySelector('#alert');
	lockDiv.innerHTML = "绘制新的解锁图案，至少连接4个点";
	loc.addEventListener('dragstart', function() {
		lockDiv.innerHTML = "完成后松开手指即可";
	});
	
	
	mui.plusReady(function() {
		var page = plus.webview.getWebviewById("modifyLoginPassword");
		if(page){
			page.close();
		}
		loc.addEventListener('done', function(event) {
		var rs = event.detail;
		if(record.length >= 1) {
			record.push(rs.points.join(''));
			if(record[0] == record[1]) {
				
				var	myMobile = localStorage.getItem("mobileAccount");						
				var parameters = {
					"password": hex_md5(myMobile+record[0].trim()),
					"passwordConfirm":hex_md5(myMobile+record[1].trim()),
					"serviceId": "02001005"
				};
				var url = "user/gesturePasswordSetting.do";
				plus.nativeUI.showWaiting();
				eg.postAjax(url, parameters, function(data) {
					plus.nativeUI.closeWaiting();
					rs.sender.clear();
					records = record[0];
					record = [];
					p = 0;
					lockDiv.innerHTML = "手势锁已设定完成";
					localStorage.setItem("gesturePasswordErrorCount","0");
					mui.back();
				});
			} else {
				lockDiv.innerHTML = "两次手势不一致，请重试";
				record = [];
				saveItem = "";
				resetItem();
				rs.sender.clear();
			}
		} else {
			if(rs.points.length < 4) {
				lockDiv.innerHTML = "绘制新的解锁图案，至少连接4个点,请重试";
				return;
			}
			record.push(rs.points.join(''));
			saveItem = rs.points.join('');
			setItem();
			lockDiv.innerHTML = "再次绘制图案进行确认";
			rs.sender.clear();
		}

	});
	});
	
	
	

	//模拟手势密码
	function setItem(){
		var lis = document.querySelectorAll("#get_ul>li");
		$(lis).each(function(key,val){
			var value = val.getAttribute("data-value");
			if(saveItem.indexOf(value)!=-1){
				val.style.background = "#007AFF";
			}
		});
	}
	//重置模拟手势密码
	function resetItem(){
		var lis = document.querySelectorAll("#get_ul>li");
		$(lis).each(function(key,val){
			val.style.background = "#d3dae5";
		});
	}
}(mui, document));