import React, {Component} from 'react';
import './login.scss';

interface State  {
  email: string;
  password: string;
}

class Login extends Component<any, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      email: '', 
      password: ''
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
  }

  handlePassChange(event: any) {
    this.setState({password: event.target.value});
  }

  handleEmailChange(event: any) {
    this.setState({email: event.target.value});
  }

  handleLogin(event: any) {
    event.preventDefault();
    console.log('loggin in...');
    console.log(this.state);
  }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="login-page">
                <div className="form">
                    <form className="login-form" onSubmit={this.handleLogin}>
                        <input type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="username"/>
                        <input type="password" value={this.state.password} onChange={this.handlePassChange}  placeholder="password"/>
                        <button type="submit" value="Login">Login</button>
                        <p className="error-message">Invalid Login Data</p>
                    </form>
                </div>
            </div>
        );
    }

}

export default Login;