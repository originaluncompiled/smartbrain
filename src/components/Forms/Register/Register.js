import React from 'react';
import '../Forms.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onSubmitRegister = () => {
    fetch('https://smartbrainapi-2r6w.onrender.com/register', {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home')
        }
      })
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <div id='formContainer'>
        <main id='register' className='br3 mv4 w-100 w50-m w-25-1 pa4 mw6 shadow-5 center'>
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f3 fw6 ph0 mh0">Register an Account</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6 alignLeft" htmlFor="name">&nbsp;Name:</label>
                <input
                  onChange={this.onNameChange}
                  className="pa2 input-reset bn bg-light-gray w-100 br2"
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6 alignLeft" htmlFor="email-address">&nbsp;Email:</label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset bn bg-light-gray w-100 br2"
                  type="email"
                  name="email-address"
                  id="email-address"
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
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitRegister}
                className="b ph3 pv2 input-reset b--black grow pointer f6 dib br2"
                type="submit"
                value="Register"
              />
            </div>
            <div className="lh-copy mt3">
              <p className='pt2 ma1'>Already Have an Account? </p>
              <p onClick={() => onRouteChange('signin')} className="f6 link dim black db b pointer">Sign in</p>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Register;