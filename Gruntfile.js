module.exports = function (grunt) {
    // load all grunt tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    
    grunt.initConfig({
        uglify:{
            main: {
                src: [
                    'js/app.js'
                ],
                dest: 'js/min/app.min.js'
            }
        },

        less: {
            encon: {
                options: { 
                    paths: ['css/'], // Specifies directories to scan for @import directives when parsing.
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    // compilation.css  :  source.less
                    'css/app.min.css': 'less/app.less'
                }
            },
        },

        watch: {
            less: {
                files: ['less/*.less', 'less/*/*.less'],
                tasks: ['less'],
                options: {
                    interrupt: true
                }
            },
            scripts: {
                files: 'js/*.js',
                tasks: ['jshint', 'uglify'],
                options: {
                    interrupt: true
                }
            },
        },

        jshint: {
            options: {
                validthis: true,
                laxcomma: true,
                laxbreak: true,
                browser: true,
                eqnull: true,
                debug: true,
                devel: true,
                boss: true,
                expr: true,
                asi: true,
                smarttabs: true,
                globals: {
                    jQuery: true,
                    google: true,
                    Mustache: true,
                    Raphael: true,
                    require: true,
                    define: true,
                    Handlebars: true
                },
                ignores: ['js/**/*.min.js']
            },
            files: ['Gruntfile.js', 'js/*.js']
        }

    });
    grunt.registerTask('default', ['less']);
    grunt.registerTask('js', ['jshint', 'uglify']);
};