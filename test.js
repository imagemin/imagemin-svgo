import test from 'ava';
import imageminSvgo from './index.js';

test('optimize a SVG', async t => {
	const data = await imageminSvgo()('<svg><script></script></svg>');

	t.is(data.toString(), '<svg><script/></svg>');
});

test('support SVGO options', async t => {
	const data = (await imageminSvgo({
		plugins: [{
			name: 'preset-default',
		}, {
			name: 'removeScriptElement',
			active: true,
		}],
	})('<svg><script></script></svg>'));

	t.is(data.toString(), '<svg/>');
});

// Failing as SVGO doesn't throw proper errors...
test.failing('error on corrupt SVG', async t => {
	await t.throwsAsync(imageminSvgo()('<svg>style><</style></svg>'), {message: /Error in parsing SVG/});
});

test('ignore non valid SVG', async t => {
	t.is(await imageminSvgo()('<html></html>'), '<html></html>');
});
