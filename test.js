import test from 'ava';
import m from '.';

test('optimize a SVG', async t => {
	t.is((await m()('<svg><style> circle {} </style></svg>')).toString(), '<svg><style/></svg>');
});

test('support SVGO options', async t => {
	const data = (await m({
		plugins: [{
			removeStyleElement: true
		}]
	})('<svg><style> circle {} </style></svg>')).toString();

	t.is(data, '<svg/>');
});

test('error on corrupt SVG', async t => {
	await t.throws(m()('<svg>style><</style></svg>'), /Error in parsing SVG/);
});

test('ignore non valid SVG', async t => {
	t.is(await m()('<html></html>'), '<html></html>');
});
