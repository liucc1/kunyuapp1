mui.init()
mui.ready(function(){
	var userPicker = new mui.PopPicker();
	userPicker.setData([{
		value: '住宅',
		text: '住宅'
	},{
		value: '公寓',
		text: '公寓'
	},{
		value: '商住',
		text: '商住'
	},{
		value: '办公',
		text: '办公'
	},{
		value: '商铺',
		text: '商铺'
	}]);
	var faType = document.getElementById('faType');
	var faTypeValue = document.getElementById('faTypeValue');
	faType.addEventListener('tap', function(event) {
		userPicker.show(function(items) {
			faTypeValue.value = items[0].value;
		});
	}, false);
	var userPicker1 = new mui.PopPicker();
	userPicker1.setData([{
		value: '无抵押',
		text: '无抵押'
	},{
		value: '首抵-银行按揭',
		text: '首抵-银行按揭'
	},{
		value: '首抵-银行抵押',
		text: '首抵-银行抵押'
	},{
		value: '首抵-机构抵押',
		text: '首抵-机构抵押'
	},{
		value: '二抵-银行抵押',
		text: '二抵-银行抵押'
	}]);
	var mortType = document.getElementById('mortType');
	var mortTypeValue = document.getElementById('mortTypeValue');
	mortType.addEventListener('tap', function(event) {
		userPicker1.show(function(items) {
			mortTypeValue.value = items[0].value;
		});
	}, false);
})
$("#oBtn").on("tap",function(){
	mui.openWindow({
		url: "./submitSuccess.html",
		id: "submitSuccess"
	})
})