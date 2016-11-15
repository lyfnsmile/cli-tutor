var path = require('path');
var fs = require('fs');

module.exports = function(filename,sources) {

    console.log(filename,sources);

    dir = dir || '.'; //默认当前目录



}

///去掉文件名中扩展名
function stripExtname(name) {
    console.log(name)
    console.log(path.extname(name))
    var i = 0 - path.extname(name).length;
    if (i === 0) {
        i = name.length;
    }
    return name.slice(0, i)
}

//将markdown转成HTML
function markdownToHTML(content) {
    return md.render(content || ''); //防止空文件
}