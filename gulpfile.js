let { src , dest , series , parallel , watch } = require('gulp')
let clean = require('gulp-clean')
let sass = require('gulp-sass')(require('sass'))
let fileInclude = require('gulp-file-include')
let webserver = require('gulp-webserver')
// 清理
function cleanTask(){
    return src('dist',{allowEmpty : true}).pipe(clean())
}
// 监听下的清理
function cleanTask2(name){
    return () => {
        return src(`./dist/${name}`,{allowEmpty : true}).pipe(clean())
    } 
}
//sass 转换
function sassTask(){
    return src('./src/css/*.scss')
            .pipe(sass())
            .pipe(dest('./dist/css'))
}
//html片段
function fileIncludeTask(){
    return src('./src/views/*.html')
            .pipe(fileInclude({
                prefix: '@',
                basepath : './src/views/templates'
            }))
            .pipe(dest('./dist/views'))
}
// 拷贝任务
function jsTask(){
    return src('./src/js/**')
            .pipe(dest('./dist/js'))
}
function libTask(){
    return src('./src/lib/**')
            .pipe(dest('./dist/lib'))
}
function staticTask(){
    return src('./src/static/**')
            .pipe(dest('./dist/static'))
}
function apiTask(){
    return src('./src/api/**')
            .pipe(dest('./dist/api'))
}

// 启动服务器环境 
function webserverTask(){
    src('./dist')
        .pipe(webserver({
            port: 8080,
            open: '/views/index.html'
        }))
}

// 监听文件变化
function watchTask(){
    watch('./src/css/**' , series(cleanTask2('css') , sassTask ))
    watch('./src/views/**' , series(cleanTask2('views') , fileIncludeTask ))
    watch('./src/js/**' , series(cleanTask2('js') , jsTask))
    watch('./src/lib/**' , series(cleanTask2('lib') , libTask ))
    watch('./src/static/**' , series(cleanTask2('static') , staticTask ))
    watch('./src/api/**' , series(cleanTask2('api') , apiTask ))
}
module.exports = {
    start : series(cleanTask , parallel(sassTask , fileIncludeTask , jsTask , libTask , staticTask , apiTask), parallel(webserverTask , watchTask))
}