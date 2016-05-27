import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

export default class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const email = String(this.refs.email.value).trim();
    const password = String(this.refs.password.value).trim();

    const errors = {};

    if (!email) {
      errors.email = 'Email required';
    }
    if (!password) {
      errors.password = 'Password required';
    }

    this.setState({
      errors
    });

    if (Object.keys(errors).length) {
      return;
    }

    Meteor.loginWithPassword(email, password, err => {
      if (err) {
        this.setState({
          errors: {
            none: err.reason
          },
        });
      } else {
        this.context.router.push('/');
      }
    });
  }

  render() {
    const {errors} = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'has-error';

    const link = <Link to="/join" className="link-auth-alt"> Need an account? Join Now.
                 </Link>;

    return (
      <div>
        <h1 className="title-auth">Login</h1>
        <p className="subtitle-auth">
          Signing in allows you to view private lists
        </p>
        <form onSubmit={this.onSubmit}>
          <div className="list-errors">
            {errorMessages.map(msg => (
             <div className="alert alert-danger" key={msg}>
               {msg}
             </div>
             ))}
          </div>
          <div className={`form-group ${errorClass('email')}`}>
            <div className="input-group">
              <div className="input-group-addon">
                <span className="glyphicon glyphicon-user"></span>
              </div>
              <input
                type="email"
                name="email"
                ref="email"
                placeholder="Your Email"
                className="form-control" />
            </div>
          </div>
          <div className={`form-group ${errorClass('password')}`}>
            <div className="input-group">
              <div className="input-group-addon">
                <span className="glyphicon glyphicon-lock"></span>
              </div>
              <input
                type="password"
                name="password"
                ref="password"
                placeholder="Password"
                className="form-control" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
      );
  }
}

LoginPage.contextTypes = {
  router: React.PropTypes.object,
};