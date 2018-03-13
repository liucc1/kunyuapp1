/*
 * 多标签页下拉刷新上拉加载组件
 * */
var PullToRefreshFactory = {
	pageSize : 10,//页面条数
	pageNo : 1,//当前页数
	/**
	 * 页面内分页组件数组
	 */
	scrollers: [],
	init: function(options) {
		var that = this;
		for(var i = 0; i < options.length; i++) {
			var  scroller = that.initialize(options[i]);
			that.scrollers.push(scroller);
		}
	},
	initialize: function(scrollConfig) {
		var scroller = {};
		if(!scrollConfig.pageSize){
			scrollConfig.pageSize = this.pageSize;
		}
		if(!scrollConfig.pageNo){
			scrollConfig.pageNo = this.pageNo;
		}
		scroller.config = scrollConfig;
		var pullRefreshEl = document.getElementById(scrollConfig.scrollerId).children[0].children[0];
		scroller.PullToRefresh = mui(pullRefreshEl).pullToRefresh({
			down: {
				callback: function() {
					var self = this;
					setTimeout(function() {
						var ul = self.element.querySelector('.mui-table-view');
						scroller.loadData(true,ul);
						self.refresh(true);
						self.endPullDownToRefresh();
					}, 1000);
				}
			},
			up: {
				contentinit: '',
				contentdown: '',
				callback: function() {
					var self = this;
					setTimeout(function() {
						var ul = self.element.querySelector('.mui-table-view');
						scroller.loadData(false,ul);
					}, 1000);
				}
			}
		});
		scroller.loadData = function(flag,ul) {
			var parameters;
			if(flag){
				this.config.pageNo = 1;
			}else{
				this.config.pageNo++;
				var totalPage = scroller.config.totalPage;
				if(totalPage && this.config.pageNo*this.config.pageSize >= totalPage){
					this.PullToRefresh.endPullUpToRefresh(true);
				}else{
					this.PullToRefresh.endPullUpToRefresh(false);
				}
			}
			parameters = scrollConfig.params;
			parameters.page = this.config.pageNo;
			parameters.limit = this.config.pageSize;
			var url = scrollConfig.url;
			eg.postAjax(url, parameters, function(data) {
				if(data.code == 1){
					scroller.config.totalPage = data.total;
					if(flag){
						scrollConfig.downSuccess(ul,data);
					}else{
						scrollConfig.upSuccess(ul,data);
					}
				}else{
					mui.toast(data.message);
				}
			})
		}
		return scroller;
	}
	
};
