import React, {Component} from 'react';
import {avatarsUrl} from './chatRoom.config'; 
import {getRandomInt} from './chatRoom.utils';


export default class JoinChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        };
    }
    onSubmit = () => {
        sessionStorage.setItem("cr-userName", this.state.userName);
        sessionStorage.setItem("cr-userAvater", this.getUserAvater());

        this.props.handleLoginAction();     
    }
    /**
     * Randomly choose an avatar mage for the user
     */
    getUserAvater() {
        const randomNumber = getRandomInt(0, 4);
        return avatarsUrl[randomNumber];
    }

    handleInputChange = (event) => {
        this.setState({
            userName: event.target.value
        });
    }
    
    render() {
        return (
            <div className="cr-join-chat">
                <h1 className="cr-main-title">Welcom to Spot.IM Chat Room</h1>
                <h1 className="cr-title">In order to join the chat please enter user name</h1>
                <div className="cr-login-input">
                    <input 
                        type="text"
                        maxlength="30"
                        value={this.state.userName}
                        onChange={this.handleInputChange} 
                    /> 
                    <button onClick={this.onSubmit}>Start Chatting</button>
                </div>
            </div>
        );
    }
}