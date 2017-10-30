'use strict';
const isSvg = require('is-svg');
const SVGO = require('svgo');

module.exports = opts => buf => {
	opts = Object.assign({multipass: true}, opts);

	if (!isSvg(buf)) {
		return Promise.resolve(buf);
	}

	if (Buffer.isBuffer(buf)) {
		buf = buf.toString();
	}

	const svgo = new SVGO(opts);

	return svgo.optimize(buf).then(res => Buffer.from(res.data));
};
