# kiforks/disallow-media-duplicate
The rule that disables duplicate media queries.

## Installation

```bash
npm install kiforks/disallow-media-duplicate --save-dev
```

## Usage

If your project does not already have stylelint, then in the root of the project create the file `.stylelintrc`, or with the extension `.stylelintrc.js` so that the code editor can highlight the syntax.

Then add `kiforks/disallow-media-duplicate` to the `.stylelintrc` config file.

_.stylelintrc_
```json
{
    "plugins": [
      "kiforks/disallow-media-duplicate"
    ],
    "rules": {
	    "kiforks/disallow-media-duplicate": true
    }
}
```

**ATTENTION!** This config is for media [mixins](https://gist.github.com/kifork/0c449aace117fb4db7695aea34b63925) instead of **media queries**:
```scss
/* BAD */
.block {
	@include media-min(xs) {
		width: 300px;
	}

	@include media-min(xs) {
		height: 305px;
	}
}

/* GOOD */
.block {
	@include media-min(xs) {
		width: 300px;
        height: 305px;
	}
}
```
