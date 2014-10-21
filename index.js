'use strict';

var isSvg = require('is-svg');
var SVGO = require('svgo');
var through = require('through2');

/**
 * svgo imagemin plugin
 *
 * @param {Object} file
 * @param {String} enc
 * @param {Object} opts
 * @param {Function} cb
 * @api private
 */

function plugin(file, enc, opts, cb) {
	if (file.isNull()) {
		cb(null, file);
		return;
	}

	if (file.isStream()) {
		cb(new Error('Streaming is not supported'));
		return;
	}

	if (!isSvg(file.contents)) {
		cb(null, file);
		return;
	}

	var svgo = new SVGO({ plugins: opts.plugins || [] });

	try {
		svgo.optimize(file.contents.toString('utf8'), function (res) {
			file.contents = new Buffer(res.data);
			cb(null, file);
		});
	} catch (err) {
		cb(err);
	}
}

/**
 * Module exports
 *
 * @param {Object} opts
 * @api public
 */

module.exports = function (opts) {
	opts = opts || {};

	return through.obj(function (file, enc, cb) {
		plugin(file, enc, opts, cb);
	});
};

/**
 * Module exports constructor
 *
 * @param {Object} opts
 * @api public
 */

module.exports.ctor = function (opts) {
	opts = opts || {};

	return through.ctor({ objectMode: true }, function (file, enc, cb) {
		plugin(file, enc, opts, cb);
	});
};
