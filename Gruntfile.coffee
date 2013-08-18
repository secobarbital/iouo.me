module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    clean: ['public/css/*.vendor.min.css', 'public/js/*.vendor.min.js']
    csslint:
      strict:
        src: ['public/css/iouo.css']
    cssmin:
      iouo:
        files:
          'public/css/iouo.min.css': ['public/css/iouo.css']
      vendor:
        files:
          'public/css/vendor.min.css': ['public/css/bootstrap.css']
    jshint:
      files: ['public/js/iouo.js']
    rev:
      files:
        src: ['public/css/vendor.min.css', 'public/js/vendor.min.js']
    uglify:
      iouo:
        files:
          'public/js/iouo.min.js': ['public/js/iouo.js']
      vendor:
        files:
          'public/js/vendor.min.js': ['public/js/stay_standalone.js', 'public/js/jquery-2.0.3.custom.js', 'public/js/jquery.timeago.js']

  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-csslint'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-rev'

  grunt.registerTask 'default', [
    'csslint'
    'cssmin'
    'jshint'
    'uglify'
    'clean'
    'rev'
  ]
