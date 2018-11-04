export const baseUrl = 'https://spotim-demo-chat-server.herokuapp.com';
export const avatarsUrl = [
    '/avatars/001-snorlax.png',
    '/avatars/002-psyduck.png',
    '/avatars/003-pikachu.png',
    '/avatars/005-bullbasaur.png',
    '/avatars/004-jigglypuff.png',
];

const config = {
    messagesLength: 10,
    baseUrl
};

export default {
    avatarsUrl,
    ...config
};
