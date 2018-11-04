import React from 'react';
import ChatRoom from '../App';
import {ChatRoom as ChatRoomComp} from '../components'
import renderer from 'react-test-renderer';

let store = {};
const mockedSessionStorage = {
    getItem: key => {
        return key in store ? store[key] : null;
    },
    setItem: (key, value) => {
        store[key] = `${value}`;
    },
    removeItem: (key) => {
        delete store[key];
    },
    clear: () => {
        store = {};
    }
};

test('test login to chat', () => {
    Object.defineProperty(window, 'sessionStorage', {
        value: mockedSessionStorage,
        writable: true
    });
    
    const component = renderer.create(
      <ChatRoom />
    );

    const tree = component.toJSON();

    console.log(tree);

    expect(tree).toMatchSnapshot();
});

test('test chat view', () => {
    store = {
        'cr-userAvater': '/avatars/004-jigglypuff.png',
        'cr-userName': 'Noa'
    };

    Object.defineProperty(window, 'sessionStorage', {
        value: mockedSessionStorage,
        writable: true
    });

    const component = renderer.create(
        <ChatRoom />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});