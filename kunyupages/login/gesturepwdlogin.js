mui.init();
var custUserList = localStorage.getItem("custUserList");
	custUserList = JSON.parse(custUserList);
	
var destinationPage = "";
var pageId = "";
	
	
var myMobile  = localStorage.getItem("mobileAccount");	
	$("#myMobile").text(myMobile.substring(0, 3) + "****" + myMobile.substring(8, 11));	
/*使用其它方式登录*/
$("#goLogin").on("tap",function(){
	mui.openWindow({
		"url": "../customerInfo/login.html",
		"id": "login",
		extras:{
			destinationPage:destinationPage,
			pageId:pageId
		}
	});
});

mui.plusReady(function(){
	destinationPage = plus.webview.currentWebview().destinationPage;	
	pageId = plus.webview.currentWebview().pageId;

});
(function($, doc) {
	$.init();
	var holder = doc.querySelector('#holder'),
		record = [];
	//处理事件
	holder.addEventListener('done', function(event) {
		var rs = event.detail;
		var gesturePassword = rs.points.join('').trim();
		rs.sender.clear();
		var params = {
				"serviceId": "02001006",
				"mobile": myMobile,
		    		"password": hex_md5(myMobile+gesturePassword)
			};
			
		var url = "user/gestureLogin.do";	
		plus.nativeUI.showWaiting();
		eg.generalPostAjax(url,params,function(data){
			plus.nativeUI.closeWaiting();
			if(data.resCode == "USPB0005"){
						var  errorCount = localStorage.getItem("gesturePasswordErrorCount");
						if(!eg.isEmpty(errorCount)){
							errorCount = parseInt(errorCount) + 1 + "";
							localStorage.setItem("gesturePasswordErrorCount",errorCount);
							if(errorCount == "3"){
								mui.toast("您已输错3次手势锁密码，请用其他方式登录！");
//										var details = plus.webview.getWebviewById(backId);
								mui.openWindow({
										"url": "../customerInfo/login.html",
										"id": "login",
										extras:{
											destinationPage:destinationPage,
											pageId:pageId
										}
									});
//										mui.fire(details,"goLogin",{});
								plus.webview.currentWebview().close();
								return;
							}
						}else{
							localStorage.setItem("gesturePasswordErrorCount","1");
							errorCount = "1";
						}			
						mui.toast("您已输错"+errorCount+"次手势锁密码!");
						return;
					}
			 if( data.resCode !== "0" ){
					mui.toast(data.resMsg);
					return;
				}

				//登录成功后的操作
				localStorage.setItem("custUserList",JSON.stringify(custUserList));//历史users信息存入本地
				localStorage.setItem("user", JSON.stringify(data));
				localStorage.setItem("mobileAccount", data.mobile);
				localStorage.setItem("gesturePasswordErrorCount","0");
				var personPage = plus.webview.getWebviewById("../customerInfo/personalInformationHome.html");
				if(personPage){
					personPage.reload();
				}
				
				if(pageId =="certification"){//特殊情况，如果是实名认证
						eg.postAjax("customer/queryAccountStatus.do", {
								"serviceId": "02005019"
								}, function(data) {
									
									setTimeout(function(){
												plus.webview.currentWebview().close();
											},1000);
									if(data.status != 90) {
										var details = plus.webview.getLaunchWebview();
										mui.fire(details,"trige",{});
									}else{
										
										mui.openWindow({
											"url": "../customerInfo/certification.html",
											"id": "certification"
										});	
									}
						});
				}else if(pageId =="home"){
					var page = plus.webview.getLaunchWebview();
					mui.fire(page,"trige",{});
					plus.webview.currentWebview().close();
				}else{
													
								if(destinationPage.length>0){
									plus.webview.currentWebview().close();
									var  thisPage = plus.webview.getWebviewById(pageId);
									if(thisPage){
										thisPage.show();
										thisPage.reload();
									}else{								
										mui.openWindow({
											url : destinationPage,
											id: pageId
										});									
									}
								}else{
									var fatherPage = plus.webview.currentWebview().opener();
                                    if(fatherPage.id == "../customerInfo/myAcont.html"){
                                    	fatherPage.reload();
                                    }
									plus.webview.currentWebview().close();
								}
					
				}
				

		});
	});
}(mui, document));