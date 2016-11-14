module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'sass',
          src: '*.*',
          dest: 'css',
          ext: '.css'
        }]
      }
    },
    watch: {
      sass: {
        files: [ 'sass/*.scss' ],
        tasks: [ 'sass' ]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-serve');

  // Default task(s).
  grunt.registerTask('default', ['sass']);

};