mui.init();
mui.plusReady(function(){
	$("#telphone").on('tap',function(){
		var phoneNum = $(this).children("font").text();
		plus.device.dial(phoneNum);
	})
})
$(function(){
	$("#phone").text(localStorage.getItem("phone").replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'));
})
function goPage(param){
	var url = '../my/'+param+'.html'
	console.log(url)
	mui.openWindow({
        url:url,
        id:param
   	});
}
$("#myInfo").on('tap',function(){
	eg.ajax(eg.jrURL + "user/logininfo", {}, 'get', function(data){
		if(data.status == 1){
			if(data.data.userType == 0){
				mui.openWindow({
			        url:"../my/informance.html",
			        id:"informance"
			   	});
			}else{
//						if(data.data.userCode == "M"){
					mui.openWindow({
				        url:"../my/myInformance.html",
				        id:"myInformance"
				   	});
//						}
			}
		}else{
			mui.toast(data.message);
		}
	},function(){
		
	})
})
$("#oBtn").on("tap",function(){
	var params = {};
	eg.postAjax2("logout",params, function(data) {
		eg.toLoginPage();
	},function(data){

	});
})