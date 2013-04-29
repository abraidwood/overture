module.exports = {
	overture: require('../overture.js'),

	options: {
		ecmaVersion: 5,
		strictSemicolons: false,
		allowTrailingCommas: true,
		forbidReserved: false,
		trackComments: false,
		locations: false,
		ranges: false,
		program: null,
		sourceFile: null
	},

	// Test Options
	maxTime: 5,

	sourcesDir: './sources',

	sources: [
		{name: 'underscore-1.4.4'},
		{name: 'q'},
		{name: 'backbone-1.0.0'},
		{name: 'jquery-2.0.0'},
//		{name: 'jquery-1.9.1'},
		{name: 'angular-1.0.6'},
		{name: 'three-r57'}
	],

	resultsFile: './results.csv'
};