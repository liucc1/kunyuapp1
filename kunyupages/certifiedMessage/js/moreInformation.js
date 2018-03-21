mui.init();
var index = 1;
var scrollDis = 500;
var $ele = $("#houseInfo").clone();

var userPicker = new mui.PopPicker();
userPicker.setData([{
	value: '1',
	text: '住宅'
},{
	value: '2',
	text: '公寓'
},{
	value: '3',
	text: '成本房价'
},{
	value: '4',
	text: '商住'
},{
	value: '5',
	text: '办公'
},{
	value: '6',
	text: '商铺'
},{
	value: '7',
	text: '别墅'
},{
	value: '8',
	text: '其他'
}]);

function initHouseType(ele) {
	document.activeElement.blur();
	userPicker.show(function(items) {
		$(ele).attr("data-key",items[0].value);
		ele.value = items[0].text;
	});
};
var userPicker1 = new mui.PopPicker();
userPicker1.setData([{
	value: '1',
	text: '无抵押'
},{
	value: '2',
	text: '首抵-银行按揭'
},{
	value: '3',
	text: '首抵-银行抵押'
},{
	value: '4',
	text: '首抵-机构抵押'
},{
	value: '5',
	text: '二抵-银行抵押'
}]);

function initMortgageType(ele) {
	document.activeElement.blur();
	userPicker1.show(function(items) {
		$(ele).attr("data-key",items[0].value);
		ele.value = items[0].text;
		if(1 < items[0].value && items[0].value < 5){
			$(ele).parent().siblings(".oneMortgage").show();
		}else if(items[0].value == "5"){
			$(ele).parent().siblings(".oneMortgage").show();
			$(ele).parent().siblings(".twiceMortgage").show();
		}else{
			$(ele).parent().siblings(".oneMortgage").hide();
			$(ele).parent().siblings(".twiceMortgage").hide();
			$(ele).parent().siblings(".twiceMortgage input").val("");
		}
	});
};

function initMortgageTime(ele){
	document.activeElement.blur();
	var picker = new mui.DtPicker({
		type:"date",
    	endDate: new Date()//设置结束日期 
	});
	picker.show(function(rs) {
		ele.value = rs.text;
		picker.dispose();
	});
}

//添加房产
$(".headerSpan").on('tap',function(){
	var cloneEle = $ele.clone();
	var titleEle = document.createElement("div");
	titleEle.className = "mui-card-header color_666";
	var html = '&nbsp;<span class="headerSpan delete" style="color: #4AABFF;">删除房产'
				+'<span  style="color:#4AABFF" class="mui-icon mui-icon-trash"></span>'
				+'</span>';
	$(titleEle).html(html);
	var str = "houseInfo"+index;
	cloneEle.attr("id",str);
	cloneEle.insertAfter("#houseInfo");
	$(titleEle).insertBefore("#"+str);
	window.scrollTo(0,scrollDis);
	scrollDis += 400;
	index++;
})

//删除房产
mui(".mui-content").on('tap',".delete",function(){
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
	var unit = $("#unitName").val();
	var unitPhone = $("#unitPhone").val();
	var unitAddress = $("#unitAddress").val();
	var uploadField = JSON.parse(localStorage.getItem("uploadField"));
	uploadField.unit = unit;
	uploadField.unitTel = unitPhone;
	uploadField.unitLocation = unitAddress;
	var house = $(".houseInfo");
	var houseValues = $(".price");
	var residenceType = $(".faType");
	var residenceProp = $(".mortType");
	var houseId  = $(".houseId ");
	var area = $(".area");
	var residenceLocation = $(".residenceLocation");
	var mortgage1Time = $(".mortgage1Time");
	var mortgage1Value = $(".mortgage1Value");
	var mortgage2Time = $(".mortgage2Time");
	var mortgage2Value = $(".mortgage2Value");
    var houseInfo = [];
    
	if(isNullVal(unit)){
		mui.toast("单位名称不能为空！",{duration: 'short',type: 'div'});
		return false;
	}
	var reg = /(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f])|(\ud83d[\ude80-\udeff])/;
	if(reg.test(unit)){
		mui.toast("单位名称格式不正确！",{duration: 'short',type: 'div'});
		return false;  
	}
	if(isNullVal(unitPhone)){
		mui.toast("单位电话不能为空！",{duration: 'short',type: 'div'});
		return false;
	}
	var telExp = /^0\d{2,3}-\d{7,8}(-\d{0,4}|)$/;
	if(!telExp.test(unitPhone)) {
		mui.toast("单位电话号格式不正确,区号应为3至4位，首位为0",{duration: 'short',type: 'div'});
		return false;
	};
  	if(isNullVal(unitAddress)){
		mui.toast("单位地址不能为空！",{duration: 'short',type: 'div'});
		return false;
	}
    for (var i=0;i<house.length;i++) {
    	if(isNullVal(houseValues[i].value)){
			mui.toast("房产总值不能为空！",{duration: 'short',type: 'div'});
			return false;
		}
    	if(houseValues[i].value <= 0){
			mui.toast("房产价值不能小于等于零",{duration: 'short',type: 'div'});
			return false;
		}
		var reg = /^[1-9]\d{0,8}$/
		if(!reg.test(houseValues[i].value.split(".")[0])){
			mui.toast("房产价值格式有误，最多输入九位数",{duration: 'short',type: 'div'});
			return false;
		}
	    if(isNullVal(residenceType.eq(i).attr("data-key"))){
			mui.toast("房产类型不能为空！",{duration: 'short',type: 'div'});
			return false;
		}
	    if(isNullVal(residenceProp.eq(i).attr("data-key"))){
			mui.toast("抵押类型不能为空！",{duration: 'short',type: 'div'});
			return false;
		}
	    if(isNullVal(houseId[i].value)){
			mui.toast("房产编号不能为空！",{duration: 'short',type: 'div'});
			return false;
		}
	    if(isNullVal(area[i].value)){
			mui.toast("房产面积不能为空！",{duration: 'short',type: 'div'});
			return false;
		}
	    if(isNullVal(residenceLocation[i].value)){
			mui.toast("房产地址不能为空！",{duration: 'short',type: 'div'});
			return false;
		}
	    if(isNullVal(mortgage1Time[i].value) && residenceProp.eq(i).attr("data-key") > 1){
			mui.toast("一抵时间不能为空！",{duration: 'short',type: 'div'});
			return false;
		}
	    if(isNullVal(mortgage1Value[i].value) && residenceProp.eq(i).attr("data-key") > 1){
			mui.toast("一抵金额不能为空！",{duration: 'short',type: 'div'});
			return false;
		}
	    if(!reg.test(mortgage1Value[i].value.split(".")[0]) && !isNullVal(mortgage1Value[i].value)){
			mui.toast("一抵金额格式有误，最多输入九位数",{duration: 'short',type: 'div'});
			return false;
		}
	    if(isNullVal(mortgage2Time[i].value) && residenceProp.eq(i).attr("data-key") == 5){
			mui.toast("二抵时间不能为空！",{duration: 'short',type: 'div'});
			return false;
		}
	    if(isNullVal(mortgage2Value[i].value) && residenceProp.eq(i).attr("data-key") == 5){
			mui.toast("二抵金额不能为空！",{duration: 'short',type: 'div'});
			return false;
		}
	    if(!reg.test(mortgage2Value[i].value.split(".")[0]) && !isNullVal(mortgage2Value[i].value)){
			mui.toast("二抵金额格式有误，最多输入九位数",{duration: 'short',type: 'div'});
			return false;
		}
    	houseInfo[i]={
    		"evaValue":houseValues[i].value,
			"residenceType":residenceProp.eq(i).attr("data-key"),
    		"residenceProp":$(residenceType[i]).attr("data-key"),
		    "houseId":houseId[i].value,
		    "area":area[i].value,
		    "residenceLocation":residenceLocation[i].value,
		    "mortgage1Time":mortgage1Time[i].value,
		    "mortgage1Value":mortgage1Value[i].value,
		    "mortgage2Time":mortgage2Time[i].value,
		    "mortgage2Value":mortgage2Value[i].value
	 	};   
    }
	uploadField.jtCustomerHouses = houseInfo;
	localStorage.setItem("uploadField",JSON.stringify(uploadField));
	mui.openWindow({
		url: "./uploadImages.html",
		id: "uploadImages"
	})
})
	
	