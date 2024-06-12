import React from 'react';
import FaceBox from '../FaceBox/FaceBox';

const FaceRecognition = ({ imageUrl, boxLocations }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img src={imageUrl} id='inputImage' alt='' width='500px' height='auto'/>
                {boxLocations.map((box, i) => {
                    return <FaceBox box={box} key={i} />
                })}
            </div>
        </div>
    )
}

export default FaceRecognition;