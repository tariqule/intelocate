import * as React from 'react';
import { Svg, Path } from 'react-native-svg';
import { CategoryInput } from '../types';
import { getCodeWithColor } from '../utils';


export function Icon64(props: CategoryInput) {
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
                d="M30.487 19.567c-.613-.135-1.186-.226-1.733-.034-.39.138-.66.403-.88.705 1.847.02 3.922.871 5.186 2.135 2.092 2.092 2.116 5.473.054 7.535-.865.865-1.94 1.34-3.028 1.34-1.26 0-2.433-.64-3.06-1.668-.752-1.24-.526-2.268-.344-3.093.133-.604.248-1.124.034-1.733-.139-.394-.408-.665-.713-.887-.014 1.871-.847 3.912-2.127 5.192a5.368 5.368 0 0 1-3.817 1.587 5.22 5.22 0 0 1-3.718-1.533c-.997-.996-1.463-2.232-1.314-3.476.131-1.09.745-2.065 1.643-2.611.582-.354 1.17-.526 1.799-.526.47 0 .889.093 1.294.182.614.135 1.187.226 1.732.033.39-.137.66-.403.882-.705-1.848-.02-3.923-.871-5.186-2.134-2.093-2.092-2.117-5.473-.055-7.536.865-.864 1.94-1.34 3.028-1.34 1.261 0 2.433.64 3.06 1.669.752 1.239.526 2.267.343 3.093-.133.603-.247 1.124-.033 1.733.139.393.408.665.713.886.014-1.871.847-3.912 2.127-5.192a5.367 5.367 0 0 1 3.817-1.587 5.22 5.22 0 0 1 3.718 1.533c.997.997 1.463 2.232 1.314 3.476-.132 1.09-.745 2.066-1.643 2.612-.582.353-1.17.526-1.8.526-.469 0-.888-.093-1.293-.182zm-5.362.053a1.504 1.504 0 1 0 0 3.01 1.504 1.504 0 0 0 0-3.01zM12.209 40.566h2.952a1.925 1.925 0 0 0 0-3.85H12.21a3.609 3.609 0 1 1 6.386 0h14.97a1.925 1.925 0 1 1 0 3.85h-14.97a3.609 3.609 0 0 1-6.386 0zm20.373-1.925a.962.962 0 0 0 1.925 0 .962.962 0 1 0-1.925 0z"/>
        </Svg>
    );
}
