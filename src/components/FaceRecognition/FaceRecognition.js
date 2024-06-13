import React from 'react';
import FaceBox from '../FaceBox/FaceBox';

const FaceRecognition = ({ imageUrl, boxLocations }) => {
    return (
        <div id='faceRecognition'>
            <div className='absolute'>
                <img src={imageUrl} id='inputImage' alt='' width='500px' height='auto'/>
                {
                    boxLocations.map((box, i) => {
                        return <FaceBox box={box} key={i} />
                    })
                }
            </div>
        </div>
    )
}

export default FaceRecognition;