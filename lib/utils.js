var MarkdownIt = require('markdown-it');

var md = new MarkdownIt({
    html: true,
    langPrefix: 'code-'
});

module.exports= {
    ///去掉文件名中扩展名
    stripExtname:function(name) {
        console.log(path.extname(name))
        var i = 0 - path.extname(name).length;
        if (i === 0) {
            i = name.length;
        }
        return name.slice(0, i)
    },

    //将markdown转成HTML
    markdownToHTML:function (content) {
        return md.render(content || ''); //防止空文件
    }
}
