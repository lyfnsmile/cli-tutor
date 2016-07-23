var express = require("express");
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var fs = require('fs');
var MarkdownIt = require('markdown-it');

var md = new MarkdownIt({
    html: true,
    langPrefix: 'code-'
});


module.exports = function(dir) {
    dir = dir || '.'; //默认当前目录

    var app = express();
    var router = express.Router();

    //app.use(favicon(path.join(__dirname, 'favicon.ico')));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(morgan('dev'));
    app.use(router);

    //渲染文章
    router.get('/posts/*', function(req, res, next) {
        console.log(typeof(req.params[0]));

        var name = stripExtname(req.params[0]);
        var file = path.join(__dirname, '_posts', name + '.md');
        fs.readFile(file, function(err, content) {
            if (err) {
                return next(err)
            }
            var html = markdownToHTML(content.toString());
            html=html.substring(1);
            html=html.substring(0,html.length-2);
            res.end(html);
        })
    })

    //渲染目录
    router.get('/', function(req, res) {
        res.end('文章列表')
    })


    app.listen(3000, function() {
        console.log("服务器启动...")
    })



    // error handlers
    app.use(function(err, req, res, next) {
        var code = err.status || 500,
            message = code === 404 ? '请求的页面已失联~系统已自动记录该错误。' : '服务器出错了~系统已自动记录该错误。';
        res.status(code);
        res.end(message)

    });


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
