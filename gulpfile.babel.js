import gulp from 'gulp'
import babelify from 'babelify'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import del from 'del'

gulp.task('clean', () => del(['lib']))

gulp.task('build', () => {
  browserify({entries: 'src/io-square-redis.js', standalone: 'IO'})
    .transform(babelify)
    .bundle()
    .on('error', err => console.log(err))
    .pipe(source('io-square-redis.js'))
    .pipe(gulp.dest('lib'))
})

gulp.task('default', ['build'])
