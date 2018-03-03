mui.init();
var index = 1;
var $ele = $("#houseInfo").clone();
var $tus = $("#trust").clone();
$(".faType").on("tap", function() {
	document.activeElement.blur();
	var userPicker = new mui.PopPicker();
	userPicker.setData(Json.residenceType);
	var $this = $(this);
	userPicker.show(function(items) {
		$this.val(items[0].text);
		$this.attr("data-key", items[0].value)
	});
});
$(".mortType").on("tap", function() {
	document.activeElement.blur();
	var userPicker = new mui.PopPicker();
	userPicker.setData(Json.residenceProp);
	var $this = $(this);
	userPicker.show(function(items) {
		$this.val(items[0].text);
		$this.attr("data-key", items[0].value)
	});
});

//添加房产
$(".headerSpan").on('tap',function(){	
	var cloneEle1 = $tus.clone();
	var cloneEle2 = $ele.clone();
	cloneEle1.css("display","block");
//	cloneEle2.css("margin-top","1rem");
	var str1 = "trust"+index;
	var str2 = "houseInfo"+index;
	cloneEle1.attr("id",str1);
	cloneEle1.insertAfter("#houseInfo");	
	cloneEle2.attr("id",str2);
	cloneEle2.insertAfter("#trust"+index);
	index++;
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
//			"residenceType":residenceType[i].attr("data-key"),
//		    "residenceType":residenceType[i].value,
//		    "residenceProp":residenceProp[i].value,
//  		"residenceProp":mortType[i].attr("data-key"),
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