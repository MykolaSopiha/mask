var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', 
    ['copy:watch',
    
    'nunjucks:watch',
    'sprite:png:watch',
    'list-pages:watch',
    'webpack:watch',
    'sass:watch'
]);
