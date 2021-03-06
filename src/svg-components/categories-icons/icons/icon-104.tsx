import * as React from 'react';
import { Svg, Path } from 'react-native-svg';
import { CategoryInput } from '../types';
import { getCodeWithColor } from '../utils';


export function Icon104(props: CategoryInput) {
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
                d="m38.704,31.296c1.088,1.088 2.533,1.53 3.296,1.704c-0.763,0.175 -2.208,0.616 -3.296,1.704c-1.088,1.088 -1.53,2.533 -1.704,3.296c-0.175,-0.763 -0.616,-2.208 -1.704,-3.296c-1.088,-1.088 -2.533,-1.53 -3.296,-1.704c0.763,-0.175 2.208,-0.616 3.296,-1.704c1.088,-1.088 1.53,-2.533 1.704,-3.296c0.175,0.763 0.616,2.208 1.704,3.296zm-15.318,-21.682c1.523,1.524 3.544,2.142 4.614,2.386c-1.069,0.244 -3.091,0.862 -4.614,2.386c-1.524,1.523 -2.142,3.544 -2.386,4.614c-0.244,-1.069 -0.862,-3.091 -2.386,-4.614c-1.523,-1.524 -3.544,-2.142 -4.614,-2.386c1.069,-0.244 3.091,-0.862 4.614,-2.386c1.524,-1.523 2.142,-3.544 2.386,-4.614c0.244,1.069 0.862,3.091 2.386,4.614zm-10.693,11.693c0.761,0.762 1.773,1.07 2.307,1.193c-0.534,0.122 -1.546,0.431 -2.307,1.193c-0.762,0.761 -1.07,1.773 -1.193,2.307c-0.122,-0.534 -0.431,-1.546 -1.193,-2.307c-0.761,-0.763 -1.773,-1.07 -2.307,-1.193c0.534,-0.122 1.546,-0.431 2.307,-1.193c0.762,-0.761 1.07,-1.773 1.193,-2.307c0.122,0.534 0.431,1.546 1.193,2.307z"/>
            <Path
                fill={getCodeWithColor(props).color}
                fillRule="evenodd"
                /* tslint:disable:max-line-length */
                d="m33.418,12.529l3.756,3.756l-4.256,4.256l-3.756,-3.756l4.256,-4.256zm-5.674,5.675l3.756,3.756l-15.605,15.605l-3.756,-3.756l15.605,-15.605z"/>
        </Svg>
    );
}
