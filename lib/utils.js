var MarkdownIt = require('markdown-it');
var path=require('path')

var md = new MarkdownIt({
    html: true,
    langPrefix: 'code-'
});

module.exports = {
    ///去掉文件名中扩展名
    stripExtname: function(name) {
        var i = 0 - path.extname(name).length;
        if (i === 0) {
            i = name.length;
        }
        return name.slice(0, i)
    },

    //将markdown转成HTML
    markdownToHTML: function(content) {
        return md.render(content || ''); //防止空文件
    },

    //解析日期函数
    parseDate: function() {

        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        var day = new Date().getDay();
        var hours = new Date().getHours();
        var minutes = new Date().getMinutes();
        minutes = minutes > 10 ? minutes : '0' + minutes;

        return year + '/' + month + '/' + day + '   ' + hours + ':' + minutes;

    },

    //正则表达式  空格转成横线
    conventSpace: function(str) {
        str = str.trim();
        var reg = /\s/g;
        return str.replace(reg, '-')
    }


}
