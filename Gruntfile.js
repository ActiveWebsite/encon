'use strict';
 
module.exports = function (grunt) {
    // load all grunt tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.initConfig({
        watch: {
            styles:{
                files: "less/**/*.less",
                tasks: ["less"]
            },
            scripts: {
                files: 'js/**/*.js',
                tasks: ['uglify']
            },
        },
        less: {
            encon: {
                options: { 
                    paths: ["css/"], // Specifies directories to scan for @import directives when parsing.
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    // compilation.css  :  source.less
                    "css/app.min.css": "less/app.less"
                }
            },
        },
        uglify:{
             encon: {
                files: {
                  'js/app.min.js': ['js/app.js']
                },
                options: {
                  mangle: false
                }
            }
        },
    });
     grunt.registerTask('default', ['less','uglify','watch']);
};