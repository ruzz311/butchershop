// This is the main application configuration file.  It is a Grunt
// configuration file, which you can learn more about here:
// https://github.com/cowboy/grunt/blob/master/docs/configuring.md

module.exports = function(grunt) {
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-cafe-mocha');
  
  grunt.initConfig({
    
    // Build JS files from src
    coffee: {
      
      lib:    { files: { 'index.js': ['src/*.coffee'] } },
      // build tests (until cafemocha supports the --compilers option)
      tests:  { files: { 'test/index.js': ['test/*.coffee'] } }
      
    },
    
    cafemocha: {
      
      tests: {
        src: 'test/*.js',
        options: {
            growl: true,
            reporter: 'spec',
            compilers: 'coffee-script'
        }
      }
      
    },
    
    // Run tasks when files change.
    watch: {
      
      gruntconf: {
        files: ['./Gruntfile.js'],
        tasks: ['default']
      },
      
      coffee_lib: {
        files: ['src/**/*.coffee'],
        tasks: ['coffee:lib', 'cafemocha']
      },
      
      coffee_tests: {
        files: ['test/**/*.coffee'],
        tasks: ['coffee:tests', 'cafemocha']
      }
      
    }
    
  });
  
  //====================
  // Custom Tasks
  //====================
  
  // Default task - can be run with 'grunt default' or simply 'grunt'
  grunt.registerTask('default', [ 'coffee', 'cafemocha' ]);
  
  grunt.registerTask('dev', [ 'watch:coffee_lib', 'watch:coffee_tests', 'watch:mocha' ]);
};
