var gulp = require("gulp");
var concat = require("gulp-concat");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var webserver = require("gulp-webserver");
//文件拷贝
gulp.task('copy',function(){
    gulp.src("./css/*.css")
        .pipe(gulp.dest("dss"));
})
gulp.task('html',function(){
    gulp.src("index.html")
        .pipe(gulp.dest("index"));
})
//文件合并
gulp.task('concat',function(){
    gulp.src("./css/*.css")
        .pipe(concat('he.css'))
        .pipe(gulp.dest('css'));
})
//实现sass的编译
gulp.task('scss',function(){
    gulp.src("./css/style.scss")
        .pipe(sass())
        .pipe(gulp.dest("sass"))
})
//启动一个server服务
gulp.task("server",function(){
    gulp.src(".")
        .pipe(webserver({
            host:"localhost",
            port:8080,
            livereload:true,
            open:true,
            fallback:"index.html"
        }))
})
gulp.task('js',function(){
    gulp.src('./js/*.js')
        .pipe(rename("data_format.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("js"))
})
//监听css的变化
gulp.watch("./css/*.css",function(){
    gulp.run("scss");
})
//监听html的变化
gulp.watch("index.html",function(){
    gulp.run("html");
})
//监听js的变化
gulp.watch('./js/data_format.js',function(){
    gulp.run('js')
})
gulp.task("default",["copy","html","concat","scss","server","js"]);