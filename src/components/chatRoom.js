
import React, {Component} from 'react'
import logo from '../assets/spotim-logo.jpg'
import {Container, Image} from 'semantic-ui-react'
import styled from 'styled-components';
import ReactDOM from "react-dom";
import Message from './chatRoom.message';
import {formatMessage, getMassageID, checkMessageOwner, updateMessagesList} from './chatRoom.utils';

export default class Chatroom extends Component {
    constructor(props) {
        super(props);
        this.clientSocket = props.socket();

        this.state = {
            messages: [],
        };
    }

    componentDidMount() {
        this.clientSocket.registerToMessageEvent(this.registerToMessageEvent)
    }

    componentDidUpdate() {
        this.scrollToLastMessage();
    }

    scrollToLastMessage() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }

    registerToMessageEvent = (message) => {
        const {lastSentMessageId} = this.state;

        if (message) {
            const isMyMessage = checkMessageOwner(message, lastSentMessageId);
            message.isMyMessage = isMyMessage;

            this.setState({
                messages: updateMessagesList(message, this.state.messages),
                lastSentMessageId: isMyMessage ? null : lastSentMessageId
            });
        }
    }

    handleMessageSubmit = (event) => {
        event.preventDefault();

        const messageText = ReactDOM.findDOMNode(this.refs.msg).value;

        if (messageText.length) { 
            const uniqueId = getMassageID();
            const {userName, userAvatar} = this.props;
    
            const newMessage = formatMessage(userAvatar, userName, messageText, uniqueId);
    
            this.setState({
                ...this.state,
                lastSentMessageId: uniqueId
            });
    
            this.clientSocket.sendMessage(newMessage);
            ReactDOM.findDOMNode(this.refs.msg).value = "";
        }  
    };

    handleLogout = () => {
        sessionStorage.removeItem('cr-userName');
        sessionStorage.removeItem('cr-userAvater');

        this.props.handleLogoutAction();
    };

    render() {
        return (
            <div className="cr-chat-view">
                <div className="cr-chat-banner">
                    <h3>Spot.IM</h3>
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
                <ul className="chats" ref="chats">
                    {
                        this.state.messages.map((message) => 
                            <Message {...message} />
                        )
                    }
                </ul>
                <form className="input" onSubmit={this.handleMessageSubmit}>
                    <input type="text" ref="msg" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
