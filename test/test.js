/*global describe, it */
'use strict';

var assert = require('assert');
var fs = require('fs');
var Imagemin = require('imagemin');
var path = require('path');
var svgo = require('../');

describe('svgo()', function () {
	it('should optimize a SVG', function (cb) {
		var imagemin = new Imagemin();

		imagemin
			.src(path.join(__dirname, 'fixtures/test.svg'))
			.use(svgo())
			.optimize(function (err, file) {
				assert(file.contents.length < fs.statSync(imagemin.src()).size);
				assert(file.contents.length > 0);
				cb();
			});
	});
});
