module.exports = function(grunt) {

  grunt.initConfig({

  jshint: {
    all: {
      src: ['Gruntfile.js', 'bitmap_header_reader.js', 'test/**/*.js'],
      options: {
        node: true,
        mocha: true
      }
    }
  },

  simplemocha: {
     src: ['test/**/*.js']
  },

jscs: {
    src: 'bitmap_header_reader.js',
    options: {
        config: ".jscsrc"
    }
},

  watch: {
    files: ['test/**/*.js','bitmap_header_reader.js'],
    tasks: ['jshint', 'simplemocha', 'jscs']
  }
});

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-simple-mocha');
grunt.loadNpmTasks('grunt-jscs');

grunt.registerTask('default', ['jshint', 'simplemocha', 'jscs']);
grunt.registerTask('test', ['simplemocha']);

};
