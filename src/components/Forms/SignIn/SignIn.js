import React from 'react';
import '../Forms.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      buttonValue: 'Sign in',
      errorMessage: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    const passwordField = document.getElementById("password");
    passwordField.value = '';

    const emailField = document.getElementById("email-address");
    emailField.value = '';

    const signInButton = document.getElementById("mainButton");
    signInButton.disabled = true;
    this.setState({buttonValue: 'Signing in...'})

    fetch('https://smartbrainapi-2r6w.onrender.com/signin', {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      } else {
        this.setState({errorMessage: user})
      }
    })
    .finally(() => {
      signInButton.disabled = false;
      this.setState({buttonValue: 'Sign in'})
    })
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <div id='formContainer'>
        <main id='signIn' className='br3 mv4 w-100 w50-m w-25-1 pa4 mw6 shadow-5 center'>
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f3 fw6 ph0 mh0">Log into your Account</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6 alignLeft" htmlFor="email-address">&nbsp;Email:</label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset bn bg-light-gray w-100 br2"
                  type="email"
                  name="email-address"
                  id="email-address"
                  required
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6 alignLeft" htmlFor="password">&nbsp;Password:</label>
                <input
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset bn bg-light-gray w-100 br2"
                  type="password"
                  name="password"
                  id="password"
                  required
                />
              </div>
            </fieldset>
            {this.state.errorMessage && <p className='dark-red fw7 mt0'>{this.state.errorMessage}</p>}
            <div>
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset b--black grow pointer f6 dib br2"
                type="submit"
                value={this.state.buttonValue}
                id="mainButton"
              />
            </div>
            <div className="lh-copy mt3">
              <p className='pt2 ma1'>Don't Have an Account? </p>
              <p onClick={() => onRouteChange('register')} className="f6 link dim black db b pointer">Register Here</p>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default SignIn;