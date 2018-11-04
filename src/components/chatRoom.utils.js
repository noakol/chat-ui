import config from './chatRoom.config';

export const getMassageID = function() {
    return Date.now() + Math.random().toString().slice(2);
};

export const getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

export const updateMessagesList = function(newMessage, messagesList) {
    // if (messagesList.length >= config.messagesLength) {
    //     messagesList.shift();
    // };
    messagesList.push(newMessage);
    return messagesList;
};

export const checkMessageOwner = function(message, myMessageId) {
    if (!myMessageId || !message) return false;
    return message.id === myMessageId;
};

export const formatMessage = function(avatar, username, text, id) {
    return {
        avatar,
        username,
        text,
        id
    };    
}