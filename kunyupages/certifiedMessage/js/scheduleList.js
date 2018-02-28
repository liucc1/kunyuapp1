mui.init({
	swipeBack: false
});
mui.plusReady(function(){
	
})
mui('#pendingList').on('tap', 'ul', function() {
	mui.openWindow({
        url:"./pendingListDetail.html",
        id:"pendingListDetail"
   	});
})
