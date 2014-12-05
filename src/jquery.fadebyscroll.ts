/* The MIT License (MIT)
 * 
 * Copyright (c) 2014 Cyril Schumacher.fr
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/// <reference path="jquery.fadebyscroll.d.ts"/>

import $ = require('jquery');

/**
 * @summary Apply an opacity on the content of an element after exceeding a limit.
 * @param {number}              percentage   Percentage to which the animation is running.
 * @param {FadeByScrollOptions} options      Options.
 */
$.fn.fadeByScroll = function(percentage: number, options: FadeByScrollOptions) {
    'use strict';
    
    // Create settings with default value.
    var settings: FadeByScrollOptions = $.extend({ opacityMin: 0, opacityMax: 1, element: this.find('*') }, options);

    // Opacity value by default.
    var opacity: number = settings.opacityMax;

    // Obtains the position of scroll and
    // computes the position compared to position of scroll.
    var scrollPosition: number = $(window).scrollTop();
    var positionByScroll: number = (this.height() * percentage) / 100;

    // If the position of scroll exceeds the position, we update the opacity.
    if (scrollPosition >= positionByScroll) {
        opacity = 1 - ((scrollPosition - positionByScroll) / positionByScroll);
    }

    // Checks if it doesn't exceeds the minimum and maximum opacity value.
    opacity = Math.min(Math.max(opacity, settings.opacityMin), settings.opacityMax);
    // Sets the opacity.
    settings.element.css('opacity', opacity);
}