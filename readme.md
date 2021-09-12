# imagemin-svgo ![GitHub Actions Status](https://github.com/imagemin/imagemin-svgo/workflows/test/badge.svg?branch=master)

> [SVGO](https://github.com/svg/svgo) imagemin plugin


## Install

```
$ npm install imagemin-svgo
```


## Usage

```js
import imagemin from 'imagemin';
import imageminSvgo from 'imagemin-svgo';

(async () => {
	await imagemin(['images/*.svg'], {
		destination: 'build/images',
		plugins: [
			imageminSvgo({
				plugins: [{
					name: 'removeViewBox',
					active: false
				}]
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
