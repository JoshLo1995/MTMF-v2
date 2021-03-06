import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";
import classnames from "classnames";

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  // this.props.history does not exist on this page?
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      // this.props.history.push("/members");
      window.location.href = './members'; // Hacky workaround BUT IT WORKS

    }
  }

  // componentWillReceiveProps is DEPRECATED and will need to be replaced at some point
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      // this.props.history.push("/members"); // push user to dashboard when they login
      window.location.href = './members';
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

// // getDerivedStateFromProps() does not have access to the component instance
// // In other words, it has no clue what 'this' is
// static getDerivedStateFromProps(props, state) {
//   debugger;
//   if (props.auth.isAuthenticated) {
//     // props.history.push('/members'); // History does not exist outside of the 'this' instance, so we need to pass it in from a function that does have access to this
//   }
//   if (props.errors) {
//     return({
//       errors: props.errors
//     });
//   }
//   return null;
// }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
 
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  render() {
      const { errors } = this.state;
      return (
        <div className="container">
          <div style={{ marginTop: "4rem" }} className="row">
            <div className="col s8 offset-s2">
              <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
                home
              </Link>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                  <b>Login</b> below
                </h4>
                <p className="grey-text text-darken-1">
                  Don't have an account? <Link to="/signup">Register</Link>
                </p>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames("", {
                      invalid: errors.email || errors.emailnotfound
                    })}
                  />
                  <label htmlFor="email">Email</label>
                  <span className="red-text">
                    {errors.email}
                    {errors.emailnotfound}
                  </span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password || errors.passwordincorrect
                    })}
                  />
                  <label htmlFor="password">Password</label>
                  <span className="red-text">
                    {errors.password}
                    {errors.passwordincorrect}
                  </span>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
  LoginPage.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { loginUser }
  )(LoginPage);