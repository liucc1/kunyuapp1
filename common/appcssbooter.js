/**移动应用引导文件--css*/
var _AppName = 'kunyupages';
var _filePath = document.URL;
var _pathName = document.location.pathname;
var _projectName = _pathName.substring(1, _pathName.substr(1).indexOf('/') + 1);

//alert('_projectName='+_projectName);
//运行模式判断
if(_filePath.indexOf('/www/') != -1){
	//真机或模拟器模式
	_projectName = '/www/';
} else {
	_projectName = '/'+ _projectName +'/';
}
var docURL = _filePath;
if(document.URL.indexOf('?') != -1) {
	docURL = _filePath.substring(0 , document.URL.indexOf('?'));
} 

_filePath = _filePath.substring(docURL.indexOf(_projectName) + (_projectName.length), docURL.length);
var _pathDeep = (_filePath.split('/')).length - 1;

_filePath = '';
if (_pathDeep >= 1) {
	for (var i = 0; i < _pathDeep; i++) {
		_filePath += '../';
	}
}
//应用样式文件
document.write('<link rel="stylesheet" type="text/css" href="' + _filePath + 'common/css/mui.min.css"/>');
document.write('<link rel="stylesheet" type="text/css" href="' + _filePath + 'common/css/app.css"/>');
document.write('<link rel="stylesheet" type="text/css" href="' + _filePath + 'common/css/base.css"/>');
//设备水平或者垂直翻转时(字体大小发生) 
document.write('<script src="' + _filePath + 'common/js/htmlsize.js"></script>');
