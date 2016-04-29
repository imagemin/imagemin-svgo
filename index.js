'use strict';
const isSvg = require('is-svg');
const SVGO = require('svgo');

module.exports = opts => buf => {
	opts = Object.assign({}, opts);

	if (Buffer.isBuffer(buf)) {
		buf = buf.toString();
	}

	if (!isSvg(buf)) {
		return Promise.resolve(buf);
	}

	const svgo = new SVGO(opts);

	return new Promise((resolve, reject) => {
		svgo.optimize(buf, res => {
			if (res.error) {
				reject(new Error(res.error));
				return;
			}

			resolve(res.data.replace(/&(?!amp;)/g, '&amp;'));
		});
	});
};
