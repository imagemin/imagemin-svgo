import test from 'ava';
import imageminSvgo from './index.js';

test('optimize a SVG', t => {
	const data = imageminSvgo()('<svg><script></script></svg>');

	t.is(data.toString(), '<svg><script/></svg>');
});

test('support SVGO options', t => {
	const data = imageminSvgo({
		plugins: [{
			name: 'preset-default',
		}, {
			name: 'removeScriptElement',
			active: true,
		}],
	})('<svg><script></script></svg>');

	t.is(data.toString(), '<svg/>');
});

// Failing as SVGO doesn't throw proper errors...
test.failing('error on corrupt SVG', async t => {
	await t.throwsAsync(imageminSvgo()('<svg>style><</style></svg>'), {message: /Error in parsing SVG/});
});

test('ignore non valid SVG', t => {
	t.is(imageminSvgo()('<html></html>'), '<html></html>');
});
