module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    clean:
      less: ['assets/css/bootstrap.css']
      rev: ['public/*.jquery.min.js', 'public/*.jquery.fittext.min.js', 'public/*.jquery.timeago.min.js', 'public/*.vendor.min.css']
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
      files: [
        'assets/js/ledger.js'
        'assets/js/owe.js'
        'assets/js/roulette.js'
      ]
    less:
      bootstrap:
        options:
          paths: ['assets/css/bootstrap']
        files:
          'assets/css/bootstrap.css': 'assets/css/bootstrap.less'
    rev:
      files:
        src: [
          'public/jquery.min.js'
          'public/jquery.fittext.min.js'
          'public/jquery.timeago.min.js'
          'public/vendor.min.css'
        ]
    uglify:
      iouo:
        files:
          'assets/js/ledger.min.js': ['assets/js/ledger.js']
          'assets/js/owe.min.js': ['assets/js/owe.js']
          'assets/js/roulette.min.js': ['assets/js/roulette.js']
      vendor:
        files:
          'public/jquery.min.js': ['assets/js/jquery-2.0.3.custom.js']
          'public/jquery.fittext.min.js': ['assets/js/jquery.fittext.js']
          'public/jquery.timeago.min.js': ['assets/js/jquery.timeago.js']
    watch:
      css:
        files: 'assets/**/*.css'
        tasks: ['csslint', 'cssmin', 'rev']
      js:
        files: 'assets/**/*.js'
        tasks: ['jshint', 'uglify', 'clean', 'rev']
      less:
        files: 'assets/**/*.less'
        tasks: ['less']


  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-csslint'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-rev'

  grunt.registerTask 'default', [
    'less'
    'csslint'
    'cssmin'
    'jshint'
    'uglify'
    'clean'
    'rev'
  ]
