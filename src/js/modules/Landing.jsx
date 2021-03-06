import React from 'react'
import RegistrationForm from './register/RegistrationForm'
import AlertContainer from 'react-alert';
import createHistory from 'history/createBrowserHistory'
import LoginService from './login/LoginService';
const history = createHistory();

export default class extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      alertBox: {
        error: (message) => {
          this.msg.error(message);
        }
      }
    }
    this.alertOptions = {
      offset: 14,
      position: 'top right',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    };
  }

  /* Render Method */
  render() {
    let registered =  (registeredUser) => {
      // The user has been succesfully registered, try to automatically login
      //let loginService = new LoginService();
      LoginService.login(registeredUser.email, registeredUser.password)
      .then( () => {
        this.props.loggedIn();
      } )
      .catch( (error) => {
        console.error('error:' + error);
        //TODO: what do we do if registration suceeded, but login failed?
      })
    }

    return(
      <div id="landing">
        <AlertContainer ref={(a) => this.msg = a} {...this.alertOptions} />
        <div className="col-md-4">
          <h3>Sketch your way to a great API.</h3>
        </div>
        <div className="col-md-3 registration-section">
            <RegistrationForm alertBox={this.state.alertBox} registrationSuceeded={registered} />
        </div>
      </div>
    )
  }
}
