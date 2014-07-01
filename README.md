famous-resizableImage
==========

Lagometer for famo.us showing the FPS, animation-frames times and script times.

![resizableImage](resizableImage.gif)

### [View the demo here](https://rawgit.com/IjzerenHein/famous-resizableImage/master/examples/demo/index.html)


## Getting started

Install using bower:
	
	bower install IjzerenHein/famous-resizableImage
	
If necessary, add to the requirejs paths config:

```javascript
require.config({
    paths: {
        ...
        'famous-resizableImage': 'bower_components/famous-resizableImage/ResizableImage',
        ...
    }
});
```

Create resizable-image:

```javascript
var ResizableImage = require('famous-resizableImage');

TODOD
```

## Constructor options

Options that you can configure through the constructor:

TODO

```javascript
{
    size: [100, 100],
    min: 0,
    max: 34,
    backgroundColor: 'rgba(200, 0, 0, 0.8)',
    borderColor: 'rgba(255, 0, 0, 0.8)',
    textColor: 'rgba(255, 255, 255, 0.8)',
    font: '28px Arial',
    frameColor: '#00FF00',
    scriptColor: '#BBBBFF'
};
```

## Contribute

Feel free to contribute to this project in any way. The easiest way to support this project is by giving it a star.

## Contact
- 	@IjzerenHein
- 	http://www.gloey.nl
- 	hrutjes@gmail.com

© 2014 - Hein Rutjes