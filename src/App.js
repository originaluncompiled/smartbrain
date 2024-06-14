import React, { Component } from 'react';
import './App.css';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Navigation from './components/Navigation/Navigation.js';
import Register from './components/Forms/Register/Register.js';
import SignIn from './components/Forms/SignIn/SignIn.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js';
import ParticlesBg from 'particles-bg'
import { isMobile } from 'react-device-detect';

const initialState = {
  input: '',
  imageUrl: '',
  boxLocations: [],
  route: 'signin',
  isSignedIn: false,
  buttonValue: 'Detect',
  inputValue: '',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

let boxCount = -1;

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  handleShortcut = (event) => {
    if (event.key === 'Enter' && !event.repeat) {
      event.preventDefault();
      event.stopPropagation();
      document.getElementById('mainButton').click();
    }
  };

  componentDidMount() {
    document.addEventListener('keyup', this.handleShortcut);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleShortcut);
  }

  calculateFacesLocation = (data) => {
    const regions = data.outputs[0].data.regions;
    
    if (!data.outputs || !data.outputs[0].data.regions) {
      boxCount = 0;
      return [];
    }

    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    const getFaceBoxes = regions.map(region => {
      const boundingBox = region.region_info.bounding_box;
      return {
        leftCol: boundingBox.left_col * width,
        topRow: boundingBox.top_row * height,
        rightCol: width - (boundingBox.right_col * width),
        bottomRow: height - (boundingBox.bottom_row * height)
      }
    });
    
    boxCount = regions.length;
    
    return getFaceBoxes;
  }

  displayFaceBoxes = (boxesLocation) => {
    this.setState({boxLocations: boxesLocation});
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value,
      inputValue: event.target.value
    });
  }
  
  onPictureSubmit = () => {
    if (!this.state.input) {
      return
    }
    const inputButton = document.getElementsByClassName("inputButton");
    inputButton.disabled = true;
    this.setState({
      buttonValue: 'Detecting...',
      inputValue: '',
      imageUrl: this.state.input
    });

    fetch('https://smartbrainapi-2r6w.onrender.com/imageurl', {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      this.displayFaceBoxes(this.calculateFacesLocation(response));
      if (response && response.outputs) {
        fetch('https://smartbrainapi-2r6w.onrender.com/image', {
          method: 'put',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user , { entries: count }))
        })
        .catch(console.log)
      }
    })
    .catch(err => console.log('Error: ', err))
    .finally(() => {
      inputButton.disabled = false;
      this.setState({
        buttonValue: 'Detect',
        inputValue: '',
        input: ''
      });
    });
  }

  onRouteChange = (route) => {
    if (route === 'signout' || route === 'signin') {
      this.setState(initialState);
      boxCount = -1;
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    const { route, imageUrl, boxLocations } = this.state
    return (
      <div className="App">
        {!isMobile && <ParticlesBg className='particles' color='#C7C7C7' num={150} type='cobweb' bg={true}/>}
        
        { route === 'home'
          ? <main>
              <section className='pa3' id='navContainer' style={{display: 'flex', justifyContent: 'space-between'}} >
                <Logo />
                <Navigation onRouteChange={this.onRouteChange}/>
              </section>
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onPictureSubmit={this.onPictureSubmit}
                buttonValue={this.state.buttonValue}
                inputValue={this.state.inputValue}
              />
              <br />
              <section id='output'>
                <FaceRecognition imageUrl={imageUrl} boxLocations={boxLocations}>
                  {/* FaceBoxes get put here */}
                </FaceRecognition>
                <p
                  id='faceCount'
                  className='white f4'
                >
                  {boxCount === -1 ?
                    '' : (
                      boxCount === 1 ?
                        '1 Face Detected' :
                          `${boxCount} Faces Detected`
                    )
                  }
                </p>
              </section>
            </main>

          : ( route === 'signin' || route === 'signout'
          ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
