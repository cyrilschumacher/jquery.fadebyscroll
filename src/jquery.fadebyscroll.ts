/* The MIT License (MIT)
 * 
 * Copyright (c) 2014 Cyril Schumacher
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

/// <reference path="../bower_components/DefinitelyTyped/jquery/jquery.d.ts"/>
/// <reference path="jquery.fadebyscroll.d.ts"/>

/**
 * @summary JQuery plugin which applies a fade effect on an element according to the scroll position
 * @class
 */
class FadeByScroll {
    'use strict';

    /**
     * @summary Create a plugin instance.
     * @public
     * @param   {JQuery}                percentage  Percentage to which the animation is running.
     * @param   {FadeByScrollOptions}   options     Options.
     * @return  {object}                            Object that was iterated.
     */
    public static fadeByScroll(percentage: number, options: FadeByScrollOptions): Object {
        var element: JQuery = <JQuery>this;
        return element.each(() => {
            new FadeByScroll(element, percentage, options);
        });
    }

    /**
     * @summary Constructor.
     * @constructor
     * @public
     * @param {JQuery}              _element     Element.
     * @param {number}              _percentage  Percentage to which the animation is running.
     * @param {FadeByScrollOptions} _options     Options.
     */
    public constructor(private _element: JQuery, private _percentage: number, private _options: FadeByScrollOptions) {
        this._options = $.extend({ opacityMin: 0, opacityMax: 1, element: this._element.find('*') }, this._options);
        $(window).scroll(this._onScroll);
    }

    /**
     * @summary Specifies the function to be called when the window is scrolled.
     * @private
     */
    private _onScroll = (): void => {
        // Opacity value by default.
        var opacity: number = this._options.opacityMax;

        // Obtains the position of scroll and
        // computes the position compared to position of scroll.
        var scrollPosition: number = $(window).scrollTop();
        var positionByScroll: number = (this._element.height() * this._percentage) / 100;

        // If the position of scroll exceeds the position, we update the opacity.
        if (scrollPosition >= positionByScroll) {
            opacity = 1 - ((scrollPosition - positionByScroll) / positionByScroll);
        }

        // Checks if it doesn't exceeds the minimum and maximum opacity value.
        opacity = Math.min(Math.max(opacity, this._options.opacityMin), this._options.opacityMax);
        // Sets the opacity.
        this._options.element.css('opacity', opacity);
    }
}

$.fn.fadeByScroll = FadeByScroll.fadeByScroll;