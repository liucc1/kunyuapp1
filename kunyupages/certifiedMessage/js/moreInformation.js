mui.init();
var index = 1;
var $ele = $("#houseInfo").clone();

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
	
	function initHouseType(ele) {
		userPicker.show(function(items) {
			ele.value = items[0].value;
		});
	};
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
	
	function initMortgageType(ele) {
		userPicker1.show(function(items) {
			ele.value = items[0].value;
		});
	};

//添加房产
$(".headerSpan").on('tap',function(){
	var cloneEle = $ele.clone();
	cloneEle.css("margin-top","1rem");
	var str = "houseInfo"+index;
	cloneEle.attr("id",str);
	cloneEle.insertAfter("#houseInfo");
	index++;
})

$("#oBtn").on("tap",function(){
	var phone = $("#phone").val();
	var unitName = $("#unitName").val();
	var unitPhone = $("#unitPhone").val();
	var unitAddress = $("#unitAddress").val();
	var uploadField = JSON.parse(localStorage.getItem("uploadField"));
	uploadField.phone = phone;
	uploadField.unitName = unitName;
	uploadField.unitPhone = unitPhone;
	uploadField.unitAddress = unitAddress;
	localStorage.setItem("uploadField",JSON.stringify(uploadField));
	mui.openWindow({
		url: "./uploadImages.html",
		id: "uploadImages"
	})
})