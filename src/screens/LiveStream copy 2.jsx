import React, { useEffect, useRef, useState } from 'react';
import { View, Button, Alert, Text } from 'react-native';
import Peer from 'react-native-peerjs';
import { RTCPeerConnection, RTCView, mediaDevices } from 'react-native-webrtc';
import io from 'socket.io-client';
// import { getSocket } from '../helpers/socket-manager';

const YourComponent = () => {
  const [peer, setPeer] = useState(null);
  const [peerId, setPeerId] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const currentUserVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  // const socket = getSocket();

  console.log(remoteStream?.getVideoTracks().map(track => ({
    enabled: track.enabled,
    kind: track.kind,
    label: track.label,
    muted: track.muted,
    readyState: track.readyState,
  })));


  const socket = io('https://service.demowebsitelinks.com:3011');
  useEffect(() => {

    console.log('socket => ', socket)

    socket?.on('stream-client-request', ({ clientPeerId, message }) => {
      console.log('clientPeerId => ', clientPeerId);
      console.log('message => ', message);
      if (clientPeerId === peerId) {
        console.log('clientPeerId === peerId => ', message);
      }
    });
    socket?.on('stream-status', (message) => {
      console.log('stream-status message => ', message);
    });

    // const socket = io('https://service.demowebsitelinks.com:3011');

    const initializePeer = async () => {

      // const localPeer = new Peer();
      // // localPeer.on('error', console.log);
      // console.log('localPeer => ', localPeer)

      const peerInstance = new Peer(
        undefined,
        {
          config: {
            iceServers: [
              { urls: 'stun:stun.l.google.com:19302' },
              { urls: 'stun:stun1.l.google.com:19302' },
              { urls: 'stun:stun2.l.google.com:19302' }
            ]
          }
        }
      );

      console.log('peerInstance => ', peerInstance)

      peerInstance.on('open', id => {
        console.log('id => ', id)
        setPeerId(id);
      });

      peerInstance.on('track', event => {
        console.log('event => ', event)
      })

      peerInstance.on('call', call => {
        // mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        console.log("call => ");
        call.answer();
        call.on('stream', remoteStream => {
          const videoTrack = remoteStream.getVideoTracks()[0];
          console.log('remoteStream => ', remoteStream?.toURL())
          if (videoTrack) {
            console.log('Video track is enabled:', videoTrack.enabled);
          }
          setRemoteStream(remoteStream);
        });
        call.on('close', () => {
          console.log('closeCall');
        });
        // });
      });

      peerInstance.oniceconnectionstatechange = (event) => {
        console.log(`ICE connection state: ${peerInstance.iceConnectionState}`);
      };

      // peerInstance.on('stream', remoteStream => {
      //   console.log('remoteStream => ', remoteStream)
      //   setRemoteStream(remoteStream);
      // });

      setPeer(peerInstance);
    };

    initializePeer();

    return () => {
      if (peer) {
        peer.destroy();
      }
      socket.disconnect();
    };
  }, []);

  const joinStream = () => {
    if (peerId) {
      // Send peerId to server for stream initiation
      // Assuming you have socket functionality implemented separately
      console.log('peerId => ', peerId)
      socket?.emit('stream', peerId);
    } else {
      Alert.alert('Peer not initialized yet!');
    }
  };

  return (
    <View>
      {/* <RTCView streamURL={remoteStream?.toURL()} style={{ width: 200, height: 200 }} ref={remoteVideoRef} /> */}
      {remoteStream ? <RTCView
        objectFit={'cover'}
        style={{ flex: 1, backgroundColor: '#050A0E' }}
        streamURL={remoteStream?.toURL()}
      /> : <Text>No Stream Available</Text>}
      <Button title="Join Stream" onPress={joinStream} />
    </View>
  );
};

export default YourComponent;
