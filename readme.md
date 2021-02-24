# imagemin-svgo [![Build Status](https://travis-ci.org/imagemin/imagemin-svgo.svg?branch=master)](https://travis-ci.org/imagemin/imagemin-svgo)

> [SVGO](https://github.com/svg/svgo) imagemin plugin


## Install

```
$ npm install imagemin-svgo
```


## Usage

```js
const imagemin = require('imagemin');
const imageminSvgo = require('imagemin-svgo');
const {extendDefaultPlugins} = require('svgo');

(async () => {
	await imagemin(['images/*.svg'], {
		destination: 'build/images',
		plugins: [
			imageminSvgo({
				plugins: extendDefaultPlugins([
					{name: 'removeViewBox', active: false}
				])
			})
		]
	});

	console.log('Images optimized');
})();
```


## API

### imageminSvgo([options])(buffer)

Returns a `Promise<Buffer>`.

#### options

Type: `Object`

Pass options to [SVGO](https://github.com/svg/svgo#configuration).

#### buffer

Type: `Buffer`

Buffer to optimize.


## License

MIT © [imagemin](https://github.com/imagemin)
