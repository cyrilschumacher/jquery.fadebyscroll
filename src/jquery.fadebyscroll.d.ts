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

/**
 * Static members of jQuery.
 */
interface JQueryStatic {
    /**
     * @summary Create a plugin instance.
     * @param   {JQuery}                percentage  Percentage to which the animation is running.
     * @param   {FadeByScrollOptions}   options     Options.
     * @return  {object}                            Object that was iterated.
     */
    fadeByScroll(percentage: number, options: FadeByScrollOptions): Object;
}

/**
 * Options for FadeByScroll plugins.
 */
interface FadeByScrollOptions {
    /**
     * @summary Opacity minimum.
     * @member  {number}
     */
    opacityMin: number;

    /**
     * @summary Opacity maximum.
     * @member  {number}
     */
    opacityMax: number;

    /**
     * @summary Element which will be used to apply the opacity.
     * @member  {JQuery}
     */
    element: JQuery;
}