/* 
 * Copyright (c) 2014 Gloey Apps
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014
 */

/*jslint browser:true, nomen:true, vars:true, plusplus:true, bitwise: true*/
/*global define*/

define(function (require, exports, module) {
    'use strict';
    
    // import dependencies
    var Engine = require('famous/core/Engine');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ResizableImage = require('famous-resizableImage');

    // create the main context
    var mainContext = Engine.createContext();

    var maxWidth = 300;
    var maxHeight = 300;
    var minWidth = 50;
    var minHeight = 50;
    
    var modifier = new StateModifier({
        size: [maxWidth, maxHeight],
        origin: [0.2, 0.2],
        align: [0.2, 0.2]
    });
    var resizableImage = new ResizableImage({
        left: {
            inset: 10,
            classes: ['left']
        },
        right: {
            inset: 10,
            classes: ['right']
        },
        top: {
            inset: 10,
            classes: ['top']
        },
        bottom: {
            inset: 10,
            classes: ['bottom']
        },
        middle: {
            classes: ['middle']
        }
    });
    
    function animate() {
        var r = {duration: 2000};
        
        // right top
        modifier.setAlign([0.8, 0.2], r);
        modifier.setOrigin([0.8, 0.2], r);
        modifier.setSize([maxWidth, minHeight], r);
        
        // right bottom
        modifier.setAlign([0.8, 0.8], r);
        modifier.setOrigin([0.8, 0.8], r);
        modifier.setSize([minWidth, minHeight], r);
        
        // left bottom
        modifier.setAlign([0.2, 0.8], r);
        modifier.setOrigin([0.2, 0.8], r);
        modifier.setSize([minWidth, maxWidth], r);
        
        // left top
        modifier.setAlign([0.2, 0.2], r);
        modifier.setOrigin([0.2, 0.2], r);
        modifier.setSize([maxWidth, maxWidth], r, animate);
    }
    
    animate();
        
    mainContext.add(modifier).add(resizableImage);
});
