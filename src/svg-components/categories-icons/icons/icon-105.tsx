import * as React from 'react';
import { Svg, Path } from 'react-native-svg';
import { CategoryInput } from '../types';
import { getCodeWithColor } from '../utils';


export function Icon105(props: CategoryInput) {
    return (
        <Svg
            viewBox="0 0 50 50"
            style={{
                height: '100%',
                width: '100%'
            }}
        >
            <Path
                fill={getCodeWithColor(props).color}
                fillRule="evenodd"
                /* tslint:disable:max-line-length */
                d="m14.412,31.724l-1.765,0l0,0.897l-2.647,0l0,-5.38l2.647,0l0,0.897l1.765,0l0,-0.896c0,-0.4 0.064,-0.784 0.182,-1.142c-2.15,-0.684 -3.71,-2.725 -3.71,-5.135c0,-2.97 2.37,-5.379 5.293,-5.379c1.412,0 2.695,0.562 3.644,1.477c0.556,-2.885 3.059,-5.063 6.061,-5.063c3.412,0 6.176,2.81 6.176,6.276c0,2.283 -1.2,4.281 -2.993,5.38l0.346,0c1.95,0 3.53,1.605 3.53,3.586l0.882,0l5.295,-3.587l0.882,0l0,12.552l-0.882,0l-5.294,-3.586l-0.883,0l0,1.793c0,1.98 -1.58,3.586 -3.53,3.586l-11.47,0c-1.949,0 -3.53,-1.606 -3.53,-3.586l0,-2.69l0.001,0zm8.287,-8.069a6.23,6.23 0 0 1 -1.432,-1.208c-0.12,0.427 -0.291,0.832 -0.505,1.208l1.938,0l-0.001,0zm-1.23,-5.38c0,2.476 1.976,4.483 4.412,4.483c2.437,0 4.412,-2.007 4.412,-4.482c0,-2.476 -1.975,-4.483 -4.412,-4.483c-2.436,0 -4.412,2.007 -4.412,4.483l0,-0.001zm-8.822,2.69c0,1.98 1.58,3.587 3.53,3.587c1.948,0 3.529,-1.606 3.529,-3.587c0,-1.98 -1.58,-3.586 -3.53,-3.586c-1.949,0 -3.53,1.606 -3.53,3.586l0.001,0z"/>
        </Svg>
    );
}
