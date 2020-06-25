import * as React from 'react';
import { Svg, Path } from 'react-native-svg';
import { CategoryInput } from '../types';
import { getCodeWithColor } from '../utils';


export function Icon131(props: CategoryInput) {
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
                d="M20.905 29.747a7.963 7.963 0 0 0 4.3 1.253c1.567 0 3.028-.45 4.262-1.228C33.587 30.139 36 33.682 36 38H14c0-4.446 2.558-8.07 6.905-8.253zM19.205 23a6 6 0 1 1 12 0 6 6 0 0 1-12 0zm15.25-6.86h.379l1.59-1.59h1.284l-1.59 1.59h1.44l1.59-1.59h1.285l-1.59 1.59h1.44l1.59-1.59h1.285l-1.59 1.59h1.366l.603-.603v4.009c0 .25-.203.454-.454.454h-8.175a.454.454 0 0 1-.454-.454V16.14zm2.76-2.166l-1.384.289 1.339-2.135 1.383-.289-1.339 2.135zm2.616-.545l-1.383.288 1.338-2.135 1.384-.289-1.34 2.136zm2.62-.547l-1.387.29 1.34-2.136.126-.026a.454.454 0 0 1 .538.352l.278 1.333-.895.187zM34 14.55c0-.248.134-.463.333-.582l-.157-.752a.454.454 0 0 1 .352-.537l1.409-.294-.971 1.548a.68.68 0 0 1 .368.433c.017.06.028.12.028.184a.673.673 0 0 1-.908.64.679.679 0 0 1-.454-.64z"/>
        </Svg>
    );
}
