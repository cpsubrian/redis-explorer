module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    nodewebkit: {
      options: {
          build_dir: './build', // Where the build version of my node-webkit app is saved
          mac: true, // We want to build it for mac
          win: true, // We want to build it for win
          linux32: false, // We don't need linux32
          linux64: false // We don't need linux64
      },
      src: ['./app/**/*'] // Your node-webkit app
    }
  });

  // Load the plugin that provides the "nodewebkit" task.
  grunt.loadNpmTasks('grunt-node-webkit-builder');

  // Default task(s).
  grunt.registerTask('default', ['nodewebkit']);

};