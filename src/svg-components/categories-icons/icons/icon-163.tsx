import * as React from 'react';
import { Svg, Path } from 'react-native-svg';
import { CategoryInput } from '../types';
import { getCodeWithColor } from '../utils';


export function Icon163(props: CategoryInput) {
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
                d="M30.818 16.696a8.915 8.915 0 0 0-4.904 2.491v-2.494h-4.957V34.36h4.957v-2.494a8.915 8.915 0 0 0 4.904 2.491V39H16V12h14.818v4.696zm-12.496-1.132a1.242 1.242 0 1 0 0-2.484 1.242 1.242 0 0 0 0 2.484zm0 22.442a1.242 1.242 0 1 0 0-2.484 1.242 1.242 0 0 0 0 2.484zm9.994-.002a1.242 1.242 0 1 0 0-2.484 1.242 1.242 0 0 0 0 2.484zm0-22.44a1.242 1.242 0 1 0 0-2.484 1.242 1.242 0 0 0 0 2.484zm4.005 17.53a7.567 7.567 0 1 1 0-15.135 7.567 7.567 0 0 1 0 15.135zm2.849-5.87c0-1.145-.61-1.844-2.124-2.377-1.08-.408-1.525-.674-1.525-1.093 0-.357.267-.712 1.094-.712.915 0 1.5.293 1.83.433l.368-1.437c-.419-.204-.992-.382-1.843-.42V20.5h-1.245v1.207c-1.36.268-2.149 1.144-2.149 2.263 0 1.232.929 1.867 2.288 2.325.941.317 1.348.624 1.348 1.107 0 .508-.496.788-1.22.788-.827 0-1.577-.267-2.11-.56l-.382 1.488c.483.279 1.309.508 2.161.547v1.206h1.246v-1.296c1.462-.254 2.263-1.22 2.263-2.35z"/>
        </Svg>
    );
}
