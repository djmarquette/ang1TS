/*
gulp build tasks
*/

var gulp = require('gulp');
var tsc = require("gulp-tsc");
var cache = require('gulp-cached');
var del = require('del');

var paths = {
    app: './app/'
};

paths.stylesheets = paths.webroot + "assets/stylesheets/";
paths.typescript = paths.webroot + "typings/app/**/*.ts";


gulp.task('default',
    function(){
        return gulp.watch(paths.app + '**/*.ts' ['buildTS']);
    });

// compile TS into JS
gulp.task('buildTS',
    function (cb) {
        // compile changed typescript
        return gulp.src([paths.app + "**/*.ts"])
            .pipe(cache('buildCache'))
            .pipe(tsc({
                module: "CommonJS",
                sourcemap: true,
                emitError: false,
                outDir: paths.app
            }))
            .pipe(gulp.dest(paths.app), cb);
    });

gulp.task('clean',
    function(cb) {
        del([paths.app + "**/*.{js,map}"]);
        cb();
    });
    
    