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
/// <reference path="../bower_components/DefinitelyTyped/requirejs/require.d.ts"/> 
/// <reference path="jquery.fadebyscroll.d.ts"/> 

/**
 * @summary JQuery plugin which applies a fade effect on an element according to the scroll position
 * @class
 * @author Cyril Schumacher
 * @version 1.1.0
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
        this._applyFadeEffect(this._options.opacityMax);
        
        $(window).scroll(this._onScroll);
    }

    /**
     * @summary Appy fade effect on the element.
     * @private
     * @param {number} opacity Opacity of the element.
     */
    private _applyFadeEffect = (opacity: number): void => {
        this._options.element.css('opacity', opacity);
    }
    
    /**
     * @summary Compute opacity by scroll position and element.
     * @private
     * @param {number} scrollPosition   Position of scroll.
     * @param {number} positionByScroll Element position by scroll.
     */
    private _computeOpacityByScroll = (scrollPosition: number, positionByScroll: number): number => {
        var opacity: number = this._options.opacityMax;
        if (scrollPosition >= positionByScroll) {
            opacity = 1 - ((scrollPosition - positionByScroll) / positionByScroll);
        }
        
        return opacity;
    }
    
    /**
     * @summary Checks if the opacity value is in a defined interval.
     * @private
     * @param {number} opacity Opacity to check.
     */
    private _checkOpacityInterval = (opacity: number): number => {
        return Math.min(Math.max(opacity, this._options.opacityMin), this._options.opacityMax);
    }

    /**
     * @summary Specifies the function to be called when the window is scrolled.
     * @private
     */
    private _onScroll = (): void => {
        // Obtains the position of scroll and
        // computes the position compared to position of scroll.
        var scrollPosition: number = $(window).scrollTop();
        var positionByScroll: number = (this._element.height() * this._percentage) / 100;

        // If the position of scroll exceeds the position, we update the opacity.
        var opacity: number = this._computeOpacityByScroll(scrollPosition, positionByScroll);
        // Checks if it doesn't exceeds the minimum and maximum opacity value.
        opacity = this._checkOpacityInterval(opacity);
        
        // Apply fade effect.
        this._applyFadeEffect(opacity);
    }
}

// Uses AMD or browser globals to create a jQuery plugin.
(function (factory) {
    if ((typeof define === 'function') && define.amd) {
        // AMD.
        define(['jquery'], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}($ => {
    $.fn.fadeByScroll = FadeByScroll.fadeByScroll; 
}));