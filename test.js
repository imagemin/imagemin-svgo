import path from 'path';
import test from 'ava';
import imageminSvgo from './';
import Vinyl from 'vinyl';

test('optimize a SVG', t => {
	t.plan(1);

	const stream = imageminSvgo()();

	stream.on('data', data => {
		t.is(data.contents.toString(), '<svg><style></style></svg>');
	});

	stream.end(new Vinyl({contents: new Buffer('<svg><style> circle {} </style></svg>')}));
});

test('support SVGO options', t => {
	t.plan(1);

	const stream = imageminSvgo({
		plugins: [{
			removeStyleElement: true
		}]
	})();

	stream.on('data', data => {
		t.is(data.contents.toString(), '<svg/>');
	});

	stream.end(new Vinyl({contents: new Buffer('<svg><style>  circle {} </style></svg>')}));
});

test('error on corrupt SVG', t => {
	t.plan(2);

	const stream = imageminSvgo()();

	stream.on('error', err => {
		t.ok(err);
		t.is(err.fileName, path.normalize('/corrupt.svg'));
	});

	stream.end(new Vinyl({
		path: path.normalize('/corrupt.svg'),
		contents: new Buffer('<svg>style><</style></svg>')
	}));
});
