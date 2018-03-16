mui.init({
	swipeBack: false
});

mui.plusReady(function(){
	var type = plus.webview.currentWebview().type;
	var arbitCons = productData[type];
//	$(".product_title").text(arbitCons.name);
	$("#proBg").attr("src",arbitCons.imageURL);
	$("#item1").html(arbitCons.producrInfo);
	$("#item2").html(arbitCons.applicCond);
	$(".index_cent").html(arbitCons.ApplicProcess);
})

$("#btn").on("tap",function(){
	eg.loginAjax(function(){
		mui.openWindow({
	        url:"../certifiedMessage/certifiedMessage.html",
	        id:"certifiedMessage"
	   	});
   	})
})