const io = require('socket.io-client');

export default function () {
  const socket = io.connect("https://spotim-demo-chat-server.herokuapp.com");

    socket.on("connect", function() {
        console.log("connected to chat server! yey");
    });

    function sendMessage(message) {
        socket.emit("spotim/chat", message);
    };

    function registerToMessageEvent(cb) {
        socket.on("spotim/chat", cb);
    }
    

    return {
        sendMessage,
        registerToMessageEvent
    }
}
