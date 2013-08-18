module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    clean: ['public/*.vendor.min.*']
    csslint:
      strict:
        src: ['assets/css/iouo.css']
    cssmin:
      iouo:
        files:
          'assets/css/iouo.min.css': ['assets/css/iouo.css']
      vendor:
        files:
          'public/vendor.min.css': ['assets/css/bootstrap.css']
    jshint:
      files: ['assets/js/iouo.js']
    rev:
      files:
        src: ['public/vendor.min.css', 'public/vendor.min.js']
    uglify:
      iouo:
        files:
          'assets/js/iouo.min.js': ['assets/js/iouo.js']
      vendor:
        files:
          'public/vendor.min.js': ['assets/js/stay_standalone.js', 'assets/js/jquery-2.0.3.custom.js', 'assets/js/jquery.timeago.js']

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
