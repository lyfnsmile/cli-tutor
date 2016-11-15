var path = require('path');
var fs = require('fs');
var colors = require('colors');
var utils = require('./utils')
var config = require('../config');


module.exports = function(filename, dir, user,tags) {

    if (!config.auth && user) {
        config.auth = user;
    }

    auth = user || config.user;
    tags=tags||config.tags;

    if (!auth) {
        console.info('暂未配置相关参数');

        auth = '';
    }

    console.log(__dirname, filename, dir);
    dir = dir || '/_posts'; //默认当前目录_posts

    //创建一片文章 XXX.md
    var date = utils.parseDate();
    var title = utils.conventSpace(filename)
    console.log(title, 999);

    var templete = "---\n  title:   " + title +
        "\n  auth:   " + auth +
        "\n  Date:   " + date +
        "\n  tags:    "+tags+
        "\n---";
    console.log(templete);

    //判断当前目录是否存在
    //如果不存在就创建
    fs.exists(__dirname + dir, function(exists) {
        if (!exists) {
            fs.mkdir(__dirname + '/' + dir, function(err) {
                if (err) {
                    console.log(err);
                }
                console.log('success!\n', __dirname + '/' + dir);


                fs.writeFile(__dirname + '/' + dir + '/' + filename + '.md', templete, function(err) {
                    if (err) {
                        console.log(err);
                        return
                    }
                    console.log("The file was saved!");
                    return; //exit
                });

            });

        }


        //continue to create a blog artical
        //第一步：判断当前目录是否存在同名文章

        //不存在才创建一片新的bolg

        fs.readdir(__dirname + dir + '/', function(err, files) {
            if (err) {
                console.log(err);
                return
            }
            console.log(files, 213);
            for (var i = 0; i < files.length; i++) {
                var fname = utils.stripExtname(files[i])
                if (fname == filename) {
                    console.log("exists!!!".red);
                    return
                }
            }

            fs.writeFile(__dirname + '/' + dir + '/' + filename + '.md', templete, function(err) {
                if (err) {
                    console.log(err);
                    return
                }
                console.log("The file was saved!");
            });



        });






    });



}