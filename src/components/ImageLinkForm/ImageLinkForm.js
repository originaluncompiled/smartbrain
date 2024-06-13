import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit, buttonValue, inputValue }) => {
    return (
        <div id='imageInput'>
            <p className='f3'>This <span style={{fontStyle: 'italic'}}>MagicBrain</span>™ will Highlight All the Faces in your Picture!</p>
            <div className='center'>
                <div className='pa4 br3 shadow-5 form'>
                    <input
                        className='f4 pa2 w-70 bn'
                        type='text'
                        placeholder='Insert Image URL'
                        value={inputValue}
                        onChange={onInputChange}
                    />
                    <button
                        id='mainButton'
                        className='inputButton w-30 grow f4 ph3 pv2 dib white bg-gray'
                        onClick={onPictureSubmit}
                    >{buttonValue}</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;