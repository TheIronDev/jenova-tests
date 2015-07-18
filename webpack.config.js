var path = require('path');

module.exports = {
	context: path.resolve('public/javascripts'),
	entry: './app.js',
	output: {
		filename: 'public/javascripts/bundle.js'
	},
	module: {
		loaders: [

		]
	}
};