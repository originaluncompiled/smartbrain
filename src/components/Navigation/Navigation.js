import React from 'react';

const Navigation = ({ onRouteChange }) => {
    return (
        <nav id='navbar'>
            <p
                onClick={() => onRouteChange('signout')}
                className='f3 link white underline ma3 pointer'
                style={{padding: '0 1rem'}}
            >Sign Out</p>
        </nav>
    )
}

export default Navigation;