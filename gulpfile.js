let gulp = require('gulp'); 
let minify = require('gulp-minify');
let cleanCSS = require('gulp-clean-css');


gulp.task('compress', function() {
  return gulp.src('lib/js/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('minify-css', () => {
  return gulp.src('lib/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['compress', 'minify-css']);