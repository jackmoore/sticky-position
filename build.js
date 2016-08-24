var pkg = require('./package.json');
var fs = require('fs');
var ugly = require('uglify-js');
var jshint = require('jshint').JSHINT;
var babel = require('babel');
var gaze = require('gaze');

function lint(full) {
	jshint(full.toString(), {
		browser: true,
		undef: true,
		unused: true,
		immed: true,
		eqeqeq: true,
		eqnull: true,
		noarg: true,
		predef: ['define', 'module', 'exports']
	});

	if (jshint.errors.length) {
		jshint.errors.forEach(function (err) {
			console.log(err.line+':'+err.character+' '+err.reason);
		});
	} else {
		console.log('linted')
	}

	return true;
}

function build(code) {
	var minified = ugly.minify(code, {fromString: true}).code;
	var header = [
		'/*!',
		'	'+pkg.config.title+' '+pkg.version,
		'	license: MIT',
		'	'+pkg.homepage,
		'*/',
		''
	].join('\n');

	fs.writeFile('dist/'+pkg.config.filename+'.js', header+code);
	fs.writeFile('dist/'+pkg.config.filename+'.min.js', header+minified);
	
	console.log('dist built');
}

function transform(filepath) {
	babel.transformFile(filepath, {modules: 'umd'}, function (err,res) {
		if (err) {
			return console.log(err);
		} else {
			lint(res.code);
			build(res.code);
		}
	});
}

gaze('src/'+pkg.config.filename+'.js', function(err, watcher){
	// On file changed
	this.on('changed', function(filepath) {
		transform(filepath);
	});

	console.log('watching');
});

transform('src/'+pkg.config.filename+'.js');