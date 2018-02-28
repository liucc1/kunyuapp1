mui.init({
	swipeBack: false
});
(function($) {
	$('.mui-scroll-wrapper').scroll({
		indicators: true //是否显示滚动条
	});
})(mui);
$("#btn").on("tap",function(){
	mui.openWindow({
        url:"../certifiedMessage/certifiedMessage.html",
        id:"certifiedMessage"
   	});
})