mui.init();
var index = 1;
var $ele = $("#houseInfo").clone();

var userPicker = new mui.PopPicker();
userPicker.setData([{
	value: '0',
	text: '住宅'
},{
	value: '1',
	text: '公寓'
},{
	value: '2',
	text: '商住'
},{
	value: '3',
	text: '办公'
},{
	value: '4',
	text: '商铺'
}]);

function initHouseType(ele) {
	userPicker.show(function(items) {
		$(ele).attr("data-key",items[0].value);
		ele.value = items[0].text;
	});
};

var userPicker1 = new mui.PopPicker();
userPicker1.setData([{
	value: '0',
	text: '无抵押'
},{
	value: '1',
	text: '首抵-银行按揭'
},{
	value: '2',
	text: '首抵-银行抵押'
},{
	value: '3',
	text: '首抵-机构抵押'
},{
	value: '4',
	text: '二抵-银行抵押'
}]);

function initMortgageType(ele) {
	userPicker1.show(function(items) {
		$(ele).attr("data-key",items[0].value);
		ele.value = items[0].text;
	});
};

//添加房产
$(".headerSpan").on('tap',function(){
	var cloneEle = $ele.clone();
	var titleEle = document.createElement("div");
	titleEle.className = "mui-card-header color_666";
	var html = '&nbsp;<span class="headerSpan" style="color: #4AABFF;">删除房产'
				+'<span  style="color:#4AABFF" class="mui-icon mui-icon-trash"></span>'
				+'</span>';
	$(titleEle).html(html);
	var str = "houseInfo"+index;
	cloneEle.attr("id",str);
	cloneEle.insertAfter("#houseInfo");
	$(titleEle).insertBefore("#"+str);
	index++;
})

//删除房产
mui(".mui-content").on('tap',".mui-icon.mui-icon-trash",function(){
    var ele = this;
	var btnArray = ['取消', '确定'];
    mui.confirm('是否删除该套房产信息？', '提示', btnArray, function(e) {
        if (e.index == 1) {
        	$(ele).parents(".mui-card-header").next().remove();
			$(ele).parents(".mui-card-header").remove();
        }
    })
})
$("#oBtn").on("tap",function(){
	var unitName = $("#unitName").val();
	var unitPhone = $("#unitPhone").val();
	var unitAddress = $("#unitAddress").val();
	var uploadField = JSON.parse(localStorage.getItem("uploadField"));
	uploadField.unitName = unitName;
	uploadField.unitPhone = unitPhone;
	uploadField.unitAddress = unitAddress;
	var house = $(".houseInfo");
	var houseValues = $(".price");
	var residenceType = $(".faType");
	var residenceProp = $(".mortType");
	var houseId  = $(".houseId ");
	var area = $(".area");
	var residenceLocation = $(".residenceLocation");
	var mortgage1Time = $(".mortgage1Time");
	var mortgage1Value = $(".mortgage1Value");
    var houseInfo = [];
    for (var i=0;i<house.length;i++) {
    	houseInfo[i]={
    		"houseValues":houseValues[i].value,
			"residenceType":residenceType[i].attr("data-key"),
    		"residenceProp":mortType[i].attr("data-key"),
		    "houseId":houseId[i].value,
		    "area":area[i].value,
		    "residenceLocation":residenceLocation[i].value,
		    "mortgage1Time":mortgage1Time[i].value,
		    "mortgage1Value":mortgage1Value[i].value
	 	};   
    }
	uploadField.jtCustomerHouses = houseInfo;
	localStorage.setItem("uploadField",JSON.stringify(uploadField));
	mui.openWindow({
		url: "./uploadImages.html",
		id: "uploadImages"
	})
})