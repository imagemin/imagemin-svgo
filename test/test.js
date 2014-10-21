'use strict';

var File = require('vinyl');
var fs = require('fs');
var isSvg = require('is-svg');
var path = require('path');
var svgo = require('../');
var test = require('ava');

test('optimize a SVG', function (t) {
	t.plan(3);

	fs.readFile(path.join(__dirname, 'fixtures/test.svg'), function (err, buf) {
		t.assert(!err);

		var stream = svgo();
		var file = new File({
			contents: buf
		});

		stream.on('data', function (data) {
			t.assert(data.contents.length < buf.length);
			t.assert(isSvg(data.contents));
		});

		stream.end(file);
	});
});

test('optimize a SVG using ctor', function (t) {
	t.plan(3);

	var Svgo = svgo.ctor();

	fs.readFile(path.join(__dirname, 'fixtures/test.svg'), function (err, buf) {
		t.assert(!err);

		var stream = new Svgo();
		var file = new File({
			contents: buf
		});

		stream.on('data', function (data) {
			t.assert(data.contents.length < buf.length);
			t.assert(isSvg(data.contents));
		});

		stream.end(file);
	});
});

test('error on corrupt SVG', function (t) {
	t.plan(1);

	fs.readFile(path.join(__dirname, 'fixtures/test-corrupt.svg'), function (err, buf) {
		t.assert(!err);

		var stream = svgo();
		var file = new File({
			contents: buf
		});

		stream.on('error', function (err) {
			t.assert(err);
		});

		stream.end(file);
	});
});
