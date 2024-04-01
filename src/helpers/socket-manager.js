import { io } from 'socket.io-client';

// const socket = io('https://service.demowebsitelinks.com:3011');
// const socket = io('http://172.17.2.194:8024');
socket = null

export function connectSocket(userid) {
    console.log('SOCKET_URL => ', process.env.SOCKET_URL);

    socket = io('http://172.17.2.194:8024', { query: { 'userid': userid } });

    // socket = io(process.env.SOCKET_URL ? process.env.SOCKET_URL : 'https://service.demowebsitelinks.com:3011');

    // socket = io('http://172.17.2.194:8024');

    socket.on('connect', () => {
        // console.log('connect ', socket)
        console.log('socket?.id => ', socket?.id)
    });

    socket.on('disconnect', () => {
        console.log('disconnect')
    });

    socket.on("connect_error", (error) => {
        console.log('connect_error => ', error);
    });

    // socket?.on('new-message-2', data => {
    //     console.log('new-message-2 => ', data)
    // });

    // socket?.on('new-message-1', data => {
    //     console.log('new-message-1 => ', data)
    // });
}

export function getSocket() {
    return socket;
}

export function emit(eventName, data) {
    if (socket) {
        socket.emit(eventName, data);
    }
}

export function addListener(eventName, callback) {
    console.log('eventName => ', eventName)
    if (socket) {
        socket.on(eventName, callback);
    }
}