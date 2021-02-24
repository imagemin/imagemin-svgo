const test = require('ava');
const imageminSvgo = require('.');
const {extendDefaultPlugins} = require('svgo');

test('optimize a SVG', async t => {
	t.is((await imageminSvgo()('<svg><style> circle {} </style></svg>')).toString(), '<svg><style/></svg>');
});

test('support SVGO options', async t => {
	const data = (await imageminSvgo({
		plugins: extendDefaultPlugins([{
			name: 'removeStyleElement'
		}])
	})('<svg><style> circle {} </style></svg>')).toString();

	t.is(data, '<svg/>');
});

// Failing as SVGO doesn't throw proper errors...
test.failing('error on corrupt SVG', async t => {
	await t.throwsAsync(imageminSvgo()('<svg>style><</style></svg>'), {message: /Error in parsing SVG/});
});

test('ignore non valid SVG', async t => {
	t.is(await imageminSvgo()('<html></html>'), '<html></html>');
});
