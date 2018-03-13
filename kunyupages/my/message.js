mui.init();
mui('.mui-scroll-wrapper').scroll()
function goPage(){
	mui.openWindow({
        url:'./messageDetail.html',
        id:'messageDetail'
   	});
}

mui.plusReady(function(){
	
})