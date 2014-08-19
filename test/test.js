'use strict';

var fs = require('fs');
var Imagemin = require('imagemin');
var path = require('path');
var svgo = require('../');
var test = require('ava');

test('optimize a SVG', function (t) {
	t.plan(4);

	var imagemin = new Imagemin()
		.src(path.join(__dirname, 'fixtures/test.svg'))
		.use(svgo());

	imagemin.optimize(function (err, file) {
		t.assert(!err);

		fs.stat(imagemin.src(), function (err, stats) {
			t.assert(!err);
			t.assert(file.contents.length < stats.size);
			t.assert(file.contents.length > 0);
		});
	});
});
