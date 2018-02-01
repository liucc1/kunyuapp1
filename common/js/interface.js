var main = {};
/**
 * ajax请求
 * @param {string} _url  请求地址   默认return
 * @param {string} _type 请求类型   默认get
 * @param {string} _data 上送消息   默认为空
 * @param {string} _dataType 预计返回类型    默认为json
 * @param {string} _cache   是否缓存   默认为 true
 */
main.ajax = function(_url, _type, back, _data, _error, _dataType, sync, _cache) {
	if(null == _url || _url == undefined || "" == _url) return;
	if(null == _data || _data == undefined || "" == _data) _data = "";
	if(null == _cache || _cache == undefined || "" == _cache) _cache = true;
	if(null == _dataType || _dataType == undefined || "" == _dataType) _dataType = "json";
	if(null == _type || _type == undefined || "" == _type) _type = "post";
	if(null == sync || undefined == sync || "" === sync) sync = true;
	$.ajax({
		url: _url,
		type: _type,
		data: _data,
		dataType: _dataType,
		async: sync,
		cache: _cache,
		success: back,
		error: _error
	})
}
main.select = function(name) {
	var thisselect = {};
	main.ajax("../js/select.json", "get", selectok, '', '', '', false)

	function selectok(e) {
		var result = eval(e);
		var selectid = $("#" + name);
		selectid.html("");
		thisselect = e[name];
	}
	return thisselect;
}
/******************表单错误提示***************************/
//调用方法
/**
 * Countdown
 * @param {string} name  名称
 * @param {string} errortype   错误类型
 */
function console_error(name,errortype){
	if(isNullVal(errortype)){
		errortype = "不能为空"
	}else{
		errortype = "格式错误"
	}
	plus.nativeUI.toast( name + errortype ,{'duration' : "long",align:"center",verticalAlign:"bottom"})
}

/******************mail正则***************************/
function isMail(val) {
	var reg = new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/);
	return(reg.test(val));
}

/******************手机正则***************************/
function isPhone(val) {
	var reg = new RegExp(/^(1[1-9])[0-9]{9}$/);
	return(reg.test(val));
}
/******************判断是否为空***************************/
function isNullVal(val) {
	if(val == '' || val == null || val == undefined) {
		return true;
	} else {
		return false;
	}
}
/******************判断是否为数字***********************/
function isNumber(val) {
	if(val > 0) {
		return !isNaN(val)
	} else {
		return false
	}
}

/******************电话号码判断***************************/
function isregTel(val) {
	if(val.length < 7) {
		return true
	}
	var reg = new RegExp(/^0[\d]{2,3}-[\d]{7,8}$/);
	return(reg.test(val));
}
/******************60秒倒计时***************************/
//调用方法
/**
 * Countdown
 * @param {string} ID  当前按钮ID
 * @param {string} Time   时间
 */
function Countdown(ID, Time) {
	if(isNullVal(Time)) {
		Time = 60;
	}
	down();
	function down() {
		if(Time == 0) {
			$("#" + ID).removeAttr("disabled").text("重新获取验证码");
			return false;
		} else {
			$("#" + ID).attr({
				"disabled": "disabled"
			}).text(Time + "秒后再发送");
			Time--;
		}
		setTimeout(function() {
			down();
		}, 1000)
	}
}
/*****格式化手机号*****/
function formatphone(val){
	return val.substr(0,3)+'****'+val.substr(7)
}

//根据码值获取值
main.obtainValue = function (name,value){
	var codeValue;
	main.ajax("../js/select.json", "get", function(e){
		for(var i in e){
			if(i == name){
				var arr = e[i];
				for(var i = 0; i < arr.length; i++){
					if(arr[i].value == value){
						codeValue = arr[i].text;
					}
				}
			}
		}
	}, '', '', '', false)
	return codeValue;
}
