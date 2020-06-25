import * as React from 'react';
import { Svg, Path } from 'react-native-svg';
import { CategoryInput } from '../types';
import { getCodeWithColor } from '../utils';


export function Icon13(props: CategoryInput) {
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
                d="M31.5123279,17.1694069 L31.5123279,11.9445192 L26.6624884,13.290187 L26.6624884,13.5651811 L25.7264781,13.5651811 L25.7264781,12.9069985 L23.8087453,12.9069985 L23.8087453,13.5651811 L22.5135682,13.5651811 L22.5135682,13.5787054 C19.4247342,13.6418188 16.9301579,16.2520086 16.9301579,19.4617756 L18.8435371,19.4617756 C18.8435371,17.3046499 20.5392395,15.550999 22.6224066,15.550999 L22.6224066,15.548745 L23.8087453,15.548745 L23.8087453,17.5075144 C21.6842195,17.9695946 20.0734111,19.930618 20.0734111,22.2635596 L20.0734111,38.6865671 C20.0734111,39.3785604 20.6219567,39.9443269 21.2902245,39.9443269 L28.2471756,39.9443269 C28.9154434,39.9443269 29.4618122,39.3785604 29.4618122,38.6865671 L29.4618122,22.2635596 C29.4618122,19.930618 27.8510038,17.9695946 25.7264781,17.5075144 L25.7264781,15.548745 L26.6624884,15.548745 L26.6624884,15.8237391 L31.5123279,17.1694069 Z"/>
        </Svg>
    );
}
