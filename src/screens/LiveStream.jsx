// import { WebView } from 'react-native-webview';
import { getSocket } from '../helpers/socket-manager';
import { mediaDevices, RTCPeerConnection, RTCView, RTCIceCandidate, RTCSessionDescription, } from 'react-native-webrtc';
import { useRef, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors, height } from '../theme';

const LiveStream = props => {

  const [type, setType] = useState(null);
  const [localStream, setlocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const socket = getSocket();

  const peerConnection = useRef(
    new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302', }, { urls: 'stun:stun1.l.google.com:19302', }, { urls: 'stun:stun2.l.google.com:19302', },],
    }),
  );
  const remoteRTCMessage = useRef(null);

  useEffect(() => {
    console.log('peerConnection.current => ', peerConnection.current);
    peerConnection.current.onTrack = event => {
      console.log('event => ', event)
      setRemoteStream(event.stream);
    };

    peerConnection.current.onicecandidate = event => {
      console.log('onicecandidate => ', event)
      if (event.candidate) {
        // sendICEcandidate({
        //   calleeId: otherUserId.current,
        //   rtcMessage: {
        //     label: event.candidate.sdpMLineIndex,
        //     id: event.candidate.sdpMid,
        //     candidate: event.candidate.candidate,
        //   },
        // });
      } else {
        console.log('End of candidates.');
      }

      peerConnection.current.onopen = (id) => {
        console.log('Peer ID:', id);
      };

    };
  }, [])

  useEffect(() => {
    console.log('socketId => ', socket?.id)
  }, [socket]);

  useEffect(() => {

    console.log('WebRtcScreen socketId => ', socket?.id)
    socket?.on('newCall', data => {
      // console.log('on newCall')
      // remoteRTCMessage.current = data.rtcMessage;
      // otherUserId.current = data.callerId;
      // setType('INCOMING_CALL');
    });

    socket?.on('stream-client-request', ({ clientPeerId, message }) => {
      if (clientPeerId === peerId) {
        console.log('clientPeerId === peerId => ', message);
      }
    });
    socket?.on('stream-status', (message) => {
      console.log('message => ', message);
    });

    socket?.on('callAnswered', data => {
      console.log('on callAnswered')
      remoteRTCMessage.current = data.rtcMessage;
      peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(remoteRTCMessage.current),
      );
      setType('WEBRTC_ROOM');
    });

    socket?.on('ICEcandidate', data => {
      console.log('on ICEcandidate')
      let message = data.rtcMessage;
      if (peerConnection.current) {
        peerConnection?.current.addIceCandidate(new RTCIceCandidate({ candidate: message.candidate, sdpMid: message.id, sdpMLineIndex: message.label }))
          .then(data => { console.log('SUCCESS') })
          .catch(err => { console.log('Error', err) });
      }
    });

    return () => {
      socket?.off('newCall');
      socket?.off('callAnswered');
      socket?.off('ICEcandidate');
    };

  }, []);

  function answerCall(data) {
    socket?.emit('answerCall', data);
  }
  function sendCall(data) {
    console.log('sendCall')
    socket?.emit('call', data);
  }
  function leave() {
    otherUserId.current = null;
    peerConnection.current.close();
    setLocalStream(null);
    props.navigation.goBack();
    setType(null);
  }

  function joinlivestream() {
    socket.emit('stream', peerId);
  }

  // const handleMessage = (event) => {
  //     const message = JSON.parse(event.nativeEvent.data);
  //     console.log('Message from WebView:', message);
  // };

  // const url = 'https://service.demowebsitelinks.com:3014/viewers/'
  const url = 'https://service.demowebsitelinks.com/viewer.html';
  // return <WebView
  //     onMessage={handleMessage}
  //     javaScriptEnabled={true}
  //     domStorageEnabled={true}
  //     startInLoadingState={false}
  //     userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
  //     source={{ uri: url }} style={{ flex: 1 }} />;

  return (
    <View style={{ flex: 1, }}>
      {remoteStream &&
        <View style={{ height: height }}>
          <RTCView
            objectFit={'cover'}
            style={{ flex: 1, backgroundColor: '#050A0E' }}
            streamURL={remoteStream.toURL()}
          />
        </View>}
      <TouchableOpacity onPress={() => {
        // setType('WEBRTC_ROOM');
        // processAccept()
        joinlivestream()
      }}
        style={[{ backgroundColor: colors.green, height: 65, width: 65, },]}>
        <Text>Join Live Stream</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LiveStream;