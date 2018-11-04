import React from 'react';
import config from './chatRoom.config';
import moment from 'moment';

const Message = ({avatar, username, text, isMyMessage}) => {
    const imgUrl = (config.baseUrl).concat('', avatar);
    return (
        <li className={`cr-message ${isMyMessage ? "right" : "left"}`}>
            <div className="cr-info">
                <div className="cr-avatar">
                    <img src={imgUrl} alt={`${username}'s profile pic`} />
                </div>
                <div className="cr-username">
                    {username}
                </div>
            </div>
            <div className="cr-bubble">
                <div className="cr-bubble-text">
                    {text}
                </div>
                <div className="cr-bubble-date">
                {moment().calendar()}
                </div>
            </div>
        </li>
    );
};

export default Message;