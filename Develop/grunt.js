module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			css: {
				files: ['Source/**/*.scss'],
				tasks: ['sass'],
				options: {
					livereload: true,
				}
			}
		},
		sass: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'Source/css/sass',
						src: ['**/*.scss'],
						dest: 'Source/css',
						ext: '.css'
				}
				]
			}
		},
		clean: {
			pre: [
				"Runtime/"
			],
			post: [
					"*-assets",
					"Runtime/css/screen.css",
					"Runtime/css/sass/**/",
					"Runtime/js/app.js",
					"Runtime/js/lib/"
				]
		},
		copy: {
			target: {
				files: [
					{expand: true, cwd: 'Source', src: ['**'], dest: 'Runtime/'},
					{expand: true, cwd: 'Source', src: ['.htaccess'], dest: 'Runtime'},
				]
			}
		},
		uglify: {
			main: {
				files: {
					'Runtime/js/app.min.js': [
						'Source/shared/js/lib/jquery-1.12.4.min.js',
						'Source/js/app.js'
					]
				}
			}
		},
		cssmin: {
			main: {
				files: {
					'Runtime/css/screen.min.css': [
						'Runtime/css/screen.css'
					]
				}
			}
		},
		usemin: {
			html: [
				'Runtime/index.php'
			],
			options: {
				dirs: [
					'Runtime'
				],
				blockReplacements: {
					phpinclude: function(block) {
						return '<style><?php include("'+block.dest+'"); ?></style>';
					}
				}
			}
		},
		imagemin: {
			main: {
				files: [{
					expand: true,
					cwd: 'Source',
					src: ['**/*.{png,jpg,gif}'
					],
					dest: 'Runtime/'
				}]
			}
		},
		hashres: {
			// Global options
			options: {
				fileNameFormat: '${name}.${ext}?${hash}',
				renameFiles: false
			},
			// hashres is a multitask. Here 'prod' is the name of the subtask. You can have as many as you want.
			main: {
				// Files to hash
				src: [
					'Runtime/js/app.min.js',
					'Runtime/img/sprites/hd-main.png',
					'Runtime/img/sprites/ld-main.png'
				],
				// File that refers to above files and needs to be updated with the hashed name
				dest: [
					'Runtime/index.php'

				]
			}
		}
	});

	// Load the needed plugins
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-hashres');

	// Default task(s).
	grunt.registerTask('default',           ['clean:pre','sprite','sass','copy','newer:uglify','newer:cssmin','usemin','clean:post']);
	grunt.registerTask('sprites',           ['clean:pre','sprite']); // needed gitinfo for some reason
	grunt.registerTask('deploy',            ['clean:pre','sprite','sass','copy','newer:uglify','newer:cssmin','usemin','hashres','clean:post','imagemin']);
};
