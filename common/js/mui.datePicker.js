/**
 * 弹出选择列表插件
 * 此组件依赖 listpcker ，请在页面中先引入 mui.picker.css + mui.picker.js
 * varstion 1.0.1
 * by Houfeng
 * Houfeng@DCloud.io
 */

(function($, document) {

	//创建 DOM
	$.dom = function(str) {
		if (typeof(str) !== 'string') {
			if ((str instanceof Array) || (str[0] && str.length)) {
				return [].slice.call(str);
			} else {
				return [str];
			}
		}
		if (!$.__create_dom_div__) {
			$.__create_dom_div__ = document.createElement('div');
		}
		$.__create_dom_div__.innerHTML = str;
		return [].slice.call($.__create_dom_div__.childNodes);
	};

	var panelBuffer = '<div class="mui-poppicker" style="background-color:white">\
		<div class="mui-poppicker-header" style="text-align:center">\
			<button class="mui-btn mui-poppicker-btn-cancel">取消</button>\
			<button class="mui-btn mui-poppicker-btn-ok">确定</button>\
			<label style="font-size: 17px;font-weight: 300;    color: #333;">预约</label>\
			<div class="mui-poppicker-clear"></div>\
		</div>\
		<div class="mui-poppicker-body">\
		</div>\
	</div>';

	var pickerBuffer1 = '<div class="mui-picker" style="background-color:#EBEBEB;width: 33.3333%;">\
		<div class="mui-picker-inner">\
			<ul class="mui-datePicker-ui">\
				<li class="mui-active">10.02-10.03</li>\
				<li>10.04-10.05</li>\
				<li>10.06-10.07</li>\
				<li>10.08-10.09</li>\
				<li>10.10-10.11</li>\
			</ul>\
		</div>\
	</div>';
	var pickerBuffer2 = '<div class="mui-picker" style="background-color:white;width: 66.6666%;">\
		<div class="mui-picker-inner">\
			<ul class="mui-datePicker-button">\
				<li>10.02上午</li>\
				<li>10.02下午</li>\
				<li>10.03上午</li>\
				<li>10.03下午</li>\
			</ul>\
		</div>\
	</div>';

	//定义弹出选择器类
	var PopPicker = $.PopPicker = $.Class.extend({
		//构造函数
		init: function(options) {
			var self = this;
			self.options = options || {};
			self.pickerElement1 = $.dom(pickerBuffer1)[0];
			self.selectItem = self.pickerElement1.querySelector('.mui-datePicker-ui')
			self.selectItem.addEventListener('tap', function(event) {
				elementItem = event.target;
				var dataSource = self.options.dataSource
				var index = 0
				for(var i=0;i<dataSource.length;i++){
					if(elementItem.innerHTML.indexOf(dataSource[i].title)!=-1){
						index = i
					}
				}
				if (elementItem.tagName == 'LI') {
					self.dealItem(elementItem,index)
					mui('.mui-datePicker-ui>.mui-active')[0].className=''
					elementItem.className = 'mui-active'
				}
			}, false);
			self.pickerElement2 = $.dom(pickerBuffer2)[0];
			self.selectIndex = self.pickerElement2.querySelector('.mui-datePicker-button')
			self.selectIndex.addEventListener('tap',function(event){
				elementItem = event.target;
				if (elementItem.tagName == 'LI'&&elementItem.className.indexOf('disable')==-1) {
					var tem = self.selectIndex.querySelector('li.mui-active')
					if(tem){tem.className=''}
					elementItem.className = 'mui-active'
					self.getSelectedItems = elementItem.innerHTML
				}
			},false)
			self.options.buttons = self.options.buttons || ['取消', '确定'];
			self.panel = $.dom(panelBuffer)[0];
			document.body.appendChild(self.panel);
			self.ok = self.panel.querySelector('.mui-poppicker-btn-ok');
			self.cancel = self.panel.querySelector('.mui-poppicker-btn-cancel');
			self.body = self.panel.querySelector('.mui-poppicker-body');
			self.mask = $.createMask();
			self.cancel.innerText = self.options.buttons[0];
			self.ok.innerText = self.options.buttons[1];
			self.cancel.addEventListener('tap', function(event) {
				self.hide();
			}, false);
			self.ok.addEventListener('tap', function(event) {
				if (self.callback) {
					var rs = self.callback(self.getSelectedItems);
					if (rs !== false) {
						self.hide();
					}
				}
			}, false);
			self.mask[0].addEventListener('tap', function() {
				self.hide();
			}, false);
			self._createPicker();
			//防止滚动穿透
			self.panel.addEventListener($.EVENT_START, function(event) {
				event.preventDefault();
			}, false);
			self.panel.addEventListener($.EVENT_MOVE, function(event) {
				event.preventDefault();
			}, false);
		},
		_createPicker: function() {
			var self = this;
			self.selectItem.innerHTML = `
				<li class="mui-active">${getData[0].title}</li>
				<li>${getData[1].title}</li>
				<li>${getData[2].title}</li>
				<li>${getData[3].title}</li>
				<li>${getData[4].title}</li>
			`
			self.body.appendChild(self.pickerElement1);
			self.body.appendChild(self.pickerElement2);
		},
		//填充数据
		setData: function(data) {
			var self  = this
			self.options.dataSource = data
			self.dealItem()
		},
		//初始化,点击之后响应
		dealItem:function(elementItem,indexs){
			var self  = this
			var dataSource = self.options.dataSource
			var dataItem = elementItem?(elementItem.innerHTML.split('-')):(dataSource[0].title.split('-'))
			var index = indexs?indexs:0
			var inner = ''
			
			if(dataSource[index].status1){
				inner = inner + `<li>${dataItem[0]}上午</li>`
			}else{
				inner = inner + `<li class="disable">${dataItem[0]}上午</li>`
			}
			if(dataSource[index].status2){
				inner = inner + `<li>${dataItem[0]}下午</li>`
			}else{
				inner = inner + `<li class="disable">${dataItem[0]}下午</li>`
			}
			if(dataSource[index].status3){
				inner = inner + `<li>${dataItem[1]}上午</li>`
			}else{
				inner = inner + `<li class="disable">${dataItem[1]}上午</li>`
			}
			if(dataSource[index].status4){
				inner = inner + `<li>${dataItem[1]}下午</li>`
			}else{
				inner = inner + `<li class="disable">${dataItem[1]}下午</li>`
			}
			mui('.mui-datePicker-button')[0].innerHTML = inner
		},
		//显示
		show: function(callback) {
			var self = this;
			self.callback = callback;
			self.mask.show();
			document.body.classList.add($.className('poppicker-active-for-page'));
			self.panel.classList.add($.className('active'));
			//处理物理返回键
			self.__back = $.back;
			$.back = function() {
				self.hide();
			};
		},
		//隐藏
		hide: function() {
			var self = this;
			if (self.disposed) return;
			self.panel.classList.remove($.className('active'));
			self.mask.close();
			document.body.classList.remove($.className('poppicker-active-for-page'));
			//处理物理返回键
			$.back=self.__back;
		},
		dispose: function() {
			var self = this;
			self.hide();
			setTimeout(function() {
				self.panel.parentNode.removeChild(self.panel);
				for (var name in self) {
					self[name] = null;
					delete self[name];
				};
				self.disposed = true;
			}, 300);
		}
	});

})(mui, document);