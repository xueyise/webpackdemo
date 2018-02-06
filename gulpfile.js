var gulp = require('gulp');
var webpack = require('webpack-stream');
var del = require("del");
var connect = require('gulp-connect');
//获取gulp-less模块
var less = require("gulp-less");

// 引入组件
var minifycss = require('gulp-minify-css'),//css压缩
    concat = require('gulp-concat'),//文件合并
    uglify = require('gulp-uglify'),//js压缩
    htmlmin = require('gulp-htmlmin'),
    notify = require('gulp-notify'),//提示信息
    rev = require('gulp-rev'),
    revC = require('gulp-rev-collector') ;

const eslint = require('gulp-eslint');


var src = {
    html: "src/html/*.html",                          // html 文件
    vendor: ["src/vendor/**/*", "bower_components/**/*"], // vendor 目录和 bower_components
    jspath: ["src/js/**/*.js", "src/js/*.js"],
    style: "src/css/*.css",                  // style 目录下所有 xx/index.less
    assets: "src/assets/**/*",                             // 图片等应用资源
    statichtml: "src/statichtml/*.html",                             // 静态html（python）
    less: "src/less/*.less" ,                            // 静态html（python）
    font:"src/font/*"
};

var dist = {
    root: "dist/",
    html: "dist/",
    font:"dist/static/font",
    style: "dist/static/css",
    js: "dist/static/js",
    vendor: "dist/static/vendor",
    assets: "dist/static/assets",
    assetsjs: "dist/static/assets/js",
    statichtml: "dist/static/html/"                           // 静态html（python）
};

var bin = {
    root: "bin/",
    html: "bin/",
    font:"dist/static/font",
    style: "bin/static/css",
    js: "bin/static/js",
    vendor: "bin/static/vendor",
    assets: "bin/static/assets",
    assetsjs: "bin/static/assets/js",
    statichtml: "bin/static/html/"                             // 静态html（python）
};

/**
 * ----------------------------------------------------
 *  tasks
 * ----------------------------------------------------
 */

/**
 * clean build dir
 */
function cleandist(done) {
    del.sync(dist.root);
    done();
}


function cleanhtml(done) {
    del.sync("dist/*.html");
    del.sync("dist/static/html/*.html");
    del.sync("dist/static/js");
    del.sync("dist/static/css");
    done();
}


/**
 * [cleanBin description]
 * @return {[type]} [description]
 */
function cleanBin(done) {
    del.sync(bin.root);
    done();
}


/**
 * [copyVendor description]
 * @return {[type]} [description]
 */
function copyVendor() {
    return gulp.src(src.vendor)
        .pipe(gulp.dest(dist.vendor));
}

function copybuildVendor() {
    return gulp.src(src.vendor)
        .pipe(gulp.dest(bin.vendor));
}

/**
 * [copyAssets description]
 * @return {[type]} [description]
 */
function copyAssets() {
    return gulp.src(src.assets)
        .pipe(gulp.dest(dist.assets));
}


function copybuildAssets() {
    return gulp.src(src.assets)
        .pipe(gulp.dest(bin.assets));
}
function copyFont() {
    return gulp.src(src.font)
        .pipe(gulp.dest(dist.font));
}


function copybuildFont() {
    return gulp.src(src.font)
        .pipe(gulp.dest(bin.font));
}
// 合并、压缩js文件
function buildjs() {
    return gulp.src('src/assets/js/*.js')
    //  .pipe(concat('all.js'))
        .pipe(gulp.dest(bin.assetsjs))
        // .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(bin.assetsjs))
        .pipe(notify({message: 'js task ok'}));
}


/**
 * [style description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
// function style() {
//     return gulp.src('src/css/*.css')
//         .pipe(concat('main.css'))
//         .pipe(minifycss())
//         .pipe(rev())
//         .pipe(gulp.dest(bin.style))
//         .pipe(rev.manifest())
//         .pipe(gulp.dest(bin.style))
//         .pipe(notify({message: 'css task ok'}));
// }
//
//
// function styledev() {
//     return gulp.src('src/css/*.css')
//         .pipe(concat('main.css'))
//         .pipe(rev())
//         .pipe(gulp.dest(dist.style))
//         .pipe(rev.manifest())
//         .pipe(gulp.dest(dist.style))
//         .pipe(notify({message: 'css task ok'}));
// }

//Html替换css、js引用文件版本
function revHtml() {
    return gulp.src(['dist/**/*.json', src.html])
        .pipe(revC({
            replaceReved: true,
        }))
        .pipe(gulp.dest(dist.html));
}
//Html替换css、js引用文件版本
function revstaticHtml() {
    return gulp.src(src.statichtml)
        .pipe(gulp.dest(dist.statichtml));
}


function revbuildstaticHtml() {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    return gulp.src(['bin/**/*.json', src.statichtml])
        .pipe(htmlmin(options))
        .pipe(revC())
        .pipe(gulp.dest(bin.statichtml));
}

function revbuildHtml() {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    return gulp.src(['bin/**/*.json', src.html])
        .pipe(htmlmin(options))
        .pipe(revC())
        .pipe(gulp.dest(bin.html));
}


/**
 * [connectServer description]
 * @return {[type]} [description]
 */
function connectServer(done) {
    connect.server({
        root: dist.root,
        port: 8080,
        livereload: true,
    });
    done();
}

/**
 * [watch description]
 * @return {[type]} [description]
 */



function watch() {
    gulp.watch("src/**/*.js",gulp.series( webpackDevelopment,revHtml));
    gulp.watch("src/**/*.less", gulp.series( devless,revHtml));
    gulp.watch(src.html, revHtml);
    gulp.watch("dist/**/*").on('change', function (file) {
        gulp.src('dist/')
            .pipe(connect.reload());
    });
}

/**
 * default task
 */
gulp.task("default", gulp.series(
    cleandist,
    cleanhtml,
    checkjs,
    copyAssets,
    gulp.parallel(copyFont,copyVendor, devless, webpackDevelopment),
    revstaticHtml,
    revHtml,
    connectServer,
    watch
));

/**
 * production build task
 */
gulp.task("build", gulp.series(
    cleanBin,
    checkjs,
    copybuildAssets,
    buildjs,
    buildless,
    gulp.parallel(copybuildFont,copybuildVendor, buildless, webpackProduction),
    revbuildHtml,
    revbuildstaticHtml,
    function (done) {
        console.log('build success');
        done();
    }
));

/**
 * [handleError description]
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
function handleError(err) {
    if (err.message) {
        console.log(err.message)
    } else {
        console.log(err)
    }
    this.emit('end')
}

/**
 * [reload description]
 * @return {[type]} [description]
 */
function reload() {
    connect.reload();
}

function checkjs() {
    return gulp.src(src.jspath)
        .pipe(eslint())
        .pipe(eslint.formatEach('compact', process.stderr))
        .pipe(eslint.failAfterError());
}

exports.checkjs = checkjs;

function webpackDevelopment() {
    return gulp.src('src/js/index.js')
        .pipe(webpack({
            config: require('./webpack.dev.js'),
        }))
        .pipe(rev())
        .pipe(gulp.dest(dist.js))
        .pipe(rev.manifest())
        .pipe(gulp.dest(dist.js))
        .pipe(notify({message: 'devjs task ok'}));


}

function webpackProduction() {
    return gulp.src('src/js/index.js')
        .pipe(webpack({
            config: require('./webpack.prod.js'),
        }))
        .pipe(rev())
        .pipe(gulp.dest(bin.js))
        .pipe(rev.manifest())
        .pipe(gulp.dest(bin.js))
        .pipe(notify({message: 'projs task ok'}));
}


function devless() {
    return  gulp.src(src.less)
        .pipe(concat('main.css'))
        .pipe(less())
        .pipe(rev())
        .pipe(gulp.dest(dist.style))
        .pipe(rev.manifest())
        .pipe(gulp.dest(dist.style))
}

function buildless() {
    return  gulp.src(src.less)
        .pipe(concat('main.css'))
        .pipe(less())
        .pipe(minifycss())
        .pipe(rev())
        .pipe(gulp.dest(bin.style))
        .pipe(minifycss())
        .pipe(rev.manifest())
        .pipe(gulp.dest(bin.style))

}
exports.devless = devless;
exports.buildless = buildless;