'use strict';

module.exports = function (grunt) {

  require('matchdep').filter('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    nodemon: {
      dev: {
        options: { file: 'index.js'}
      }
    }
    
  });

  grunt.registerTask('default', function (target){

  grunt.task.run([
    'nodemon:dev'
  ]);

  });
}
