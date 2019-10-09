import React, {Component} from 'react';
import './login.scss';

interface State  {
  email: string;
  password: string;
}

class Login extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      email: '', 
      password: ''
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt: any) {
    let target = evt.target;
    let name = target.name;
    let value = target.value;

    this.setState({
      [name]: value  
    });
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
                        <input type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="username"/>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange}  placeholder="password"/>
                        <button type="submit" value="Login">Login</button>
                        <p className="error-message">Invalid Login Data</p>
                    </form>
                </div>
            </div>
        );
    }

}

export default Login;