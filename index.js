import {Buffer} from 'node:buffer';
import isSvg from 'is-svg';
import {optimize} from 'svgo';

const imageminSvgo = options => async buffer => {
	options = {
		multipass: true,
		...options,
	};

	const normalizedInput = Buffer.isBuffer(buffer) ? buffer.toString() : buffer;

	if (!isSvg(normalizedInput)) {
		return buffer;
	}

	const {data} = optimize(normalizedInput, options);
	return Buffer.from(data);
};

export default imageminSvgo;
