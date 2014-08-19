'use strict';

var isSvg = require('is-svg');
var SVGO = require('svgo');

/**
 * svgo image-min plugin
 *
 * @param {Object} opts
 * @api public
 */

module.exports = function (opts) {
	opts = opts || {};

	return function (file, imagemin, cb) {
		if (!isSvg(file.contents)) {
			cb();
			return;
		}

		var svgo = new SVGO({ plugins: opts.plugins || [] });

		svgo.optimize(file.contents.toString('utf8'), function (res) {
			file.contents = new Buffer(res.data);
			cb();
		});
	};
};
