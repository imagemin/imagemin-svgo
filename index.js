'use strict';
const isSvg = require('is-svg');
const SVGO = require('svgo');

module.exports = options => async buffer => {
	options = {multipass: true, ...options};

	if (!isSvg(buffer)) {
		return Promise.resolve(buffer);
	}

	if (Buffer.isBuffer(buffer)) {
		buffer = buffer.toString();
	}

	const svgo = new SVGO(options);
	const {data} = await svgo.optimize(buffer);
	return Buffer.from(data);
};
