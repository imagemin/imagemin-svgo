# imagemin-svgo ![GitHub Actions Status](https://github.com/imagemin/imagemin-svgo/workflows/test/badge.svg?branch=master)

> [SVGO](https://github.com/svg/svgo) imagemin plugin


## Install

```
$ npm install imagemin-svgo
```


## Usage

```js
const imagemin = require('imagemin');
const imageminSvgo = require('imagemin-svgo');

(async () => {
	await imagemin(['images/*.svg'], {
		destination: 'build/images',
		plugins: [
			imageminSvgo({
				plugins: [
					{removeViewBox: false}
				]
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

Pass options to [SVGO](https://github.com/svg/svgo#what-it-can-do).

#### buffer

Type: `Buffer`

Buffer to optimize.


## License

MIT © [imagemin](https://github.com/imagemin)
