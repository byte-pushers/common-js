module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'src/main/javascript/*.js','src/test/javascript/jasmine/*.js']
        }
    });
    grunt.registerTask('default', ['jshint']);
};