import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
        <Tilt className='mt0 br2 shadow-2 Tilt' glareEnable={true} glareMaxOpacity={0.1} glarePosition='all'>
            <img src={brain} alt='Black outline of a brain' id='Logo'></img>
        </Tilt>
    )
}

export default Logo;