import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Form,
  Label,
  Input,
  FormGroup,
  Container,
  Button,
  Alert
} from 'reactstrap';

import './Login.css';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
  state = {
    username: '',
    password: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (this.props.isAuthenticated === true) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated === true) {
      this.props.history.push('/dashboard');
    }
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {

      // Check for register errors
      if (error.id === 'LOGIN_FAIL') {
        this.setState(prevState => {
          return {
            msg: error.msg.msg
          };
        });
      } else {
        this.setState(prevState => {
          return {
            msg: null
          };
        });
      }
    }
  }

  onHandleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onHandleSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;
    const user = {
      username,
      password
    };

    this.props.loginUser(user, this.props.history);
  }

  render() {
    return (
      <div className="Login">
        <Container>
          <header className="page-header mb-5 ">
            <h1 className="display-4">Sign In</h1>
          </header>
          { this.state.msg !== null ? (
            <Alert color="danger" className="">{this.state.msg}</Alert>
          ) : null }
          <Form onSubmit={this.onHandleSubmit}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input className="form-control form-control-lg" name="username" id="username" type="text" placeholder="Username" onChange={this.onHandleChange} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input className="form-control form-control-lg" name="password" id="password" type="password" placeholder="Password" onChange={this.onHandleChange} />
            </FormGroup>
            <Button className="btn-login btn-lg" type="submit">Sign In</Button>
          </Form>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
