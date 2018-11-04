import React, {Component} from 'react';
import clientSocket from './socket';
import {UserLogin, ChatRoom} from './components';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: 
                sessionStorage.getItem('cr-userName') && sessionStorage.getItem('cr-userAvater')
        };
    }

    handleLoginAction = () => {
        this.setState({isLogin: true});
    }

    handleLogoutAction = () => {
        this.setState({isLogin: false});
    }

    render() {
        return (
            <div className="cr-container">
                {this.state.isLogin ? 
                    <ChatRoom 
                        socket={clientSocket}
                        userName={sessionStorage.getItem('cr-userName')}
                        userAvatar={sessionStorage.getItem('cr-userAvater')}
                        handleLogoutAction={this.handleLogoutAction} /> 
                    :
                    <UserLogin 
                        handleLoginAction={this.handleLoginAction} />
                }
            </div>
        );
    }
}