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

/*jslint browser:true, nomen:true, vars:true, plusplus:true*/
/*global define*/

/**
 * @module
 */
define(function (require, exports, module) {
    'use strict';

    // import dependencies
    var RenderNode = require('famous/core/RenderNode');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var View = require('famous/core/View');
    var FlexibleLayout = require('famous/views/FlexibleLayout');
    var BkImageSurface = require('famous-bkImageSurface');
    
    /**
     * @class
     * @extends View
     * @param {Object} [options] Configuration options
     */
    function ResizableImage(options) {
        View.apply(this, arguments);
        
        // Create layouts
        var horzLayout = new FlexibleLayout({
            ratios: [true, 1, true],
            direction: 0
        });
        var vertLayout = new FlexibleLayout({
            ratios: [true, 1, true],
            direction: 1
        });
        
        // Create sides
        this.top = this._createSide('top', 0);
        this.right = this._createSide('right', 1);
        this.bottom = this._createSide('bottom', 2);
        this.left = this._createSide('left', 3);
        
        // Create middle
        this.middle = {
            modifier: new Modifier({
                size: [undefined, undefined]
            }),
            surface: new BkImageSurface({
                classes: this.options.middle.classes
            })
        };
        this.middle.renderable = new RenderNode(this.middle.modifier);
        this.middle.renderable.add(this.middle.surface);
        
        // Add everything to the render-tree
        vertLayout.sequenceFrom([
            this.top.renderable,
            this.middle.renderable,
            this.bottom.renderable
        ]);
        horzLayout.sequenceFrom([
            this.left.renderable,
            vertLayout,
            this.right.renderable
        ]);
        this.add(horzLayout);
    }
    ResizableImage.prototype = Object.create(View.prototype);
    ResizableImage.prototype.constructor = ResizableImage;

    ResizableImage.DEFAULT_OPTIONS = {
        insets: [], // top, right, bottom, left
        imageUrl: null,
        left: {
            inset: 0,
            imageUrl: null,
            classes: []
        },
        right: {
            inset: 0,
            imageUrl: null,
            classes: []
        },
        top: {
            inset: 0,
            imageUrl: null,
            classes: []
        },
        bottom: {
            inset: 0,
            imageUrl: null,
            classes: []
        },
        middle: {
            imageUrl: null,
            classes: []
        }
    };
    
    /**
     * todo
     */
    ResizableImage.prototype._createSide = function (name, index) {
        var inset = this.options[name].inset;
        if (!inset && (index < this.options.insets.length)) {
            inset = this.options.insets[index];
        }
        var modifier = new Modifier({
            size: [(index % 2) ? inset : undefined, (index % 2) ? undefined : inset]
        });
        var renderable = new RenderNode(modifier);
        var surface;
        if (inset > 0) {
            surface = new BkImageSurface({
                classes: this.options[name].classes
            });
            renderable.add(surface);
        }
        return {
            inset: inset,
            modifier: modifier,
            surface: surface,
            renderable: renderable
        };
    };

    module.exports = ResizableImage;
});
