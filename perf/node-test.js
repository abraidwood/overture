/*jshint evil: false, bitwise:false, strict: true, undef: true, white:true, onevar:false, browser:true, plusplus:false */
/*global  */

(function() {
	"use strict";

	var fs = require('fs');
	var config = require('./node-test-config.js');

	var prevResults = fs.existsSync(config.resultsFile) ? fs.readFileSync(config.resultsFile, 'utf8') : '';
	var newResults = {};
	var titles = [];

	var resultsLines = prevResults === '' ? [] : prevResults.split('\n');
	if(resultsLines.length > 0) {
		titles = resultsLines.shift().split(',');
	}

	config.sources.forEach(function(source) {
		source.text = fs.readFileSync(config.sourcesDir + '/' + source.name + '.js', 'utf8');
		source.time = source.time || 1000000;
	});

	var Benchmark = require('benchmark');

	var tree = [];
	config.sources.forEach(function(source) {
		var benchmark = new Benchmark(source.name, function() {
			var syntax = this.options.overture.parse(this.options.source.text, this.options.overtureOptions);
			tree.push(syntax.body.length);
		}, {
			source: source,
			overture: config.overture,
			overtureOptions: config.overtureOptions,
			maxTime: config.maxTime,
			async: false,
			onComplete: function() {
				if(titles.indexOf(source.name) === -1) {
					titles.push(source.name);
				}
				newResults[source.name] = (this.stats.mean * 1000);
				console.log(source.name);
			}
		});
		benchmark.run();
	});

	resultsLines.unshift(titles.join(','));
	resultsLines = resultsLines.map(function(line) {
		var line = line.split(',');
		line.length = titles.length;
		return line.join(',');
	});

	var newLine = [];
	titles.forEach(function(title, index) {
		newLine[index] = newResults[title];
	});
	resultsLines.push(newLine.join(','));

	console.log('#####');
	console.log(resultsLines.shift().split(',').join('\t'));

	resultsLines.forEach(function(line) {
		console.log(line.split(',').map(function(item) {
			return item ? Number(item).toFixed(1) : '-';
		}).join('\t'));
	});
})();
