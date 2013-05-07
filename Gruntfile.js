
module.exports = function(grunt) {

    grunt.initConfig({
        preprocess : {
            options: {
                context : {
                    LOCATIONS: true
                }
            },
            js : {
                src : 'overture-pre.js',
                dest : 'overture-processed.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-preprocess');

    // Default task(s).
    grunt.registerTask('default', ['preprocess']);

};
