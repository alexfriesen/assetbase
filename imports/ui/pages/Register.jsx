import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

export default class RegisterPage extends React.Component {

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
    const confirm = String(this.refs.confirm.value).trim();

    const errors = {};

    if (!email) {
      errors.email = 'Email required';
    }

    if (!password) {
      errors.password = 'Password required';
    }

    if (confirm !== password) {
      errors.confirm = 'Please confirm your password';
    }

    this.setState({
      errors
    });

    if (Object.keys(errors).length) {
      return;
    }


    Accounts.createUser({
      email,
      password,
    }, err => {
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

    const link = <Link to="/signin" className="link-auth-alt"> Have an account? Sign in
                 </Link>;

    return (
      <div>
        <h1 className="title-auth">Register</h1>
        <p className="subtitle-auth">
          Joining allows you to make private lists
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
          <div className={`form-group ${errorClass('confirm')}`}>
            <div className="input-group">
              <div className="input-group-addon">
                <span className="glyphicon glyphicon-lock"></span>
              </div>
              <input
                type="password"
                name="confirm"
                ref="confirm"
                placeholder="Confirm Password"
                className="form-control" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
      );
  }
}

RegisterPage.contextTypes = {
  router: React.PropTypes.object,
};