import React from 'react';

const Rank = ({ name, entries }) => {
    return (
        <div id='rank'>
            <div className='white f3'>
                <span style={{fontStyle: 'italic', fontWeight:'600'}}>{name}</span>, your total image entry count is...
            </div>
            <div className='white f1'>
                {entries}
            </div>
        </div>
    )
}

export default Rank;