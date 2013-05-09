
module.exports = function(grunt) {

    grunt.initConfig({
        preprocess: {
            options: {
                context : {
                    LOCATIONS: true
                }
            },
            js : {
                src : 'overture-pre.js',
                dest : 'overture-processed.js'
            }
        },
        watch: {
            preprocessed: {
                files: ['overture-pre.js'],
                tasks: ['preprocess']
            }
        }
    });

    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['watch', 'preprocess']);

};
