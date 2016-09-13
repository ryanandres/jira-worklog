import React from 'react';

class LoginBox extends React.Component {

    constructor(props) {
        super(props);

        this.handleBaseUrlChange = this.handleBaseUrlChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);

        this.state = { baseUrl: '', user: '', password: '' };

        storage.get('credentials', (error, data) => {
            if (error) throw error;

            if (data && data.baseUrl && data.user && data.password) {
                this.setState(data);
            }
        });
    }

    handleBaseUrlChange(event){
        this.setState({baseUrl: event.target.value});
    }

    handleUserChange(event){
        this.setState({user: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }

    handleUpdateClick(event){
        this.props.onSubmit(this.state.baseUrl, this.state.user, this.state.password);
        storage.set('credentials', { baseUrl: this.state.baseUrl, user: this.state.user, password: this.state.password }, (error) => {
            if (error) throw error;
        });
    }

    render(){
        return (
            <div className="form-inline">
                <div className="form-group">
                    <label className="sr-only" htmlFor="inputBaseUrl">Base URL</label>
                    <input type="url" className="form-control" id="inputBaseUrl" placeholder="Base URL" value={this.state.baseUrl} onChange={this.handleBaseUrlChange} />
                </div>
                <div className="form-group">
                    <label className="sr-only" htmlFor="inputEmail">Email</label>
                    <input type="email" className="form-control" id="inputEmail" placeholder="Email" value={this.state.user} onChange={this.handleUserChange} />
                </div>
                <div className="form-group">
                    <label className="sr-only" htmlFor="inputPassword">Password</label>
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                </div>
                <button type="button" className="btn btn-default" onClick={this.handleUpdateClick}>Update</button>
            </div>
        )
    }
}

export default LoginBox;
