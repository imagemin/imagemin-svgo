import test from 'ava';
import imageminSvgo from './';

test('optimize a SVG', t => {
	t.plan(1);

	imageminSvgo()('<svg><style> circle {} </style></svg>').then(data => {
		t.is(data, '<svg><style></style></svg>');
	});
});

test('support SVGO options', t => {
	t.plan(1);

	imageminSvgo({plugins: [{
		removeStyleElement: true
	}]})('<svg><style>  circle {} </style></svg>').then(data => {
		t.is(data, '<svg/>');
	});
});

test('error on corrupt SVG', t => {
	t.plan(1);

	imageminSvgo()('<svg><style> circle {} </style></svg>').catch(err => {
		t.truthy(err);
	});
});
