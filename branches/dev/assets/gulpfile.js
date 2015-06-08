// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');
var chalk = require('chalk');
var minify = require('gulp-minify-css');


// 检查脚本
gulp.task('lint', function() {
    gulp.src('./h5/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译Less
gulp.task('css', function() {
    gulp.src('./**/*.debug.css')
        .pipe(rename(function(path){
            path.basename=path.basename.replace('.debug','');
        }))
        .pipe(minify())
        .pipe(gulp.dest('./'));
});

// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src('./**/*.debug.js')
        .pipe(rename(function(path){
            path.basename=path.basename.replace('.debug','');
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});


gulp.task('watch',function() {
    var watchCss = gulp.watch('./**/*.debug.css',['css'])
    var watchJs = gulp.watch('./**/*.debug.js',['scripts'])
    watchCss.on('change',function(event){
        console.log("file: "+chalk.red.bold(event.path)+" has changed!");
    });
    watchJs.on('change',function(event) {
        console.log("file: "+chalk.red.bold(event.path)+" has changed!");
    });
})

// 默认任务
gulp.task('default',['css','scripts','watch'],function(){
    console.log(chalk.red.bold("************ ")+chalk.green.bgGreen.bold("start watch")+chalk.red.bold(" ************"));
});