/* tslint:disable-next-line:no-unused-variable */
import * as React from 'react';
import { Svg, Path } from 'react-native-svg';


/* tslint:disable:max-line-length */
export function AttachmentIcon(props: {color?: string}) {
    const color = props.color ? props.color : '#ffffff';
    return (
        <Svg
            viewBox="0 0 20 20"
            style={{
                height: '100%',
                width: '100%'
            }}
        >
            <Path
                fill={color}
                fillRule="evenodd"
                d="m18.46596,1.534c-2.04533,-2.04533 -5.37329,-2.04533 -7.41863,0l-3.73868,3.73868l-2.03597,2.03606l-3.73868,3.73868c-2.04533,2.04525 -2.04533,5.3733 0,7.41854c2.04525,2.04534 5.3733,2.04534 7.41855,0l0.66952,-0.66943c0.44859,-0.44859 0.44859,-1.17601 0,-1.62469c-0.44868,-0.44859 -1.1761,-0.44859 -1.62469,0l-0.66943,0.66952c-1.14945,1.14946 -3.01981,1.14946 -4.16935,0c-1.14945,-1.14954 -1.14945,-3.01989 0,-4.16934l3.73868,-3.73868l2.03606,-2.03596l3.73868,-3.73869c0.55363,-0.55363 1.29392,-0.85857 2.08467,-0.85857c0.79066,0 1.53095,0.30494 2.08458,0.85857c0.55364,0.55364 0.85858,1.29393 0.85858,2.08459c0,0.79074 -0.30494,1.53103 -0.85858,2.08467l-2.42867,2.42867l-0.74654,0.74654l-2.01455,2.01464c-0.3724,0.37231 -0.97832,0.37231 -1.35063,0c-0.3724,-0.37239 -0.3724,-0.97823 0,-1.35063l3.93085,-3.93085c0.44868,-0.44868 0.44868,-1.17601 0,-1.62469c-0.44858,-0.44868 -1.17601,-0.44859 -1.6246,0l-3.93094,3.93094c-1.26819,1.2681 -1.26819,3.33173 0,4.59992c1.26819,1.2682 3.33173,1.2681 4.59992,-0.00009l2.01464,-2.01455l0.74654,-0.74654l2.42867,-2.42867c2.04534,-2.04534 2.04534,-5.3733 0,-7.41864"/>
        </Svg>
    );
}
