import React from 'react';
import './FaceBox.css';

const FaceBox = ({ box }) => {
    return (
        <div
            className='boundingBox'
            style={{
                top: box.topRow,
                left: box.leftCol,
                bottom: box.bottomRow,
                right: box.rightCol,
            }}>
        </div>
    )
}

export default FaceBox;