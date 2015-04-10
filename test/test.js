'use strict';

var path = require('path');
var isSvg = require('is-svg');
var read = require('vinyl-file').read;
var test = require('ava');
var imageminSvgo = require('../');

test('optimize a SVG', function (t) {
	t.plan(3);

	read(path.join(__dirname, 'fixtures/test.svg'), function (err, file) {
		t.assert(!err, err);

		var stream = imageminSvgo()();
		var size = file.contents.length;

		stream.on('data', function (data) {
			t.assert(data.contents.length < size, data.contents.length);
			t.assert(isSvg(data.contents));
		});

		stream.end(file);
	});
});

test('error on corrupt SVG', function (t) {
	t.plan(1);

	read(path.join(__dirname, 'fixtures/test.svg'), function (err, file) {
		t.assert(!err, err);

		var stream = imageminSvgo()();

		stream.on('error', function (err) {
			t.assert(err);
		});

		stream.end(file);
	});
});
