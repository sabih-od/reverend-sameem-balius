import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RTCPeerConnection, mediaDevices } from 'react-native-webrtc';
import io from 'socket.io-client';

const App = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerId, setPeerId] = useState(null);
  const [socket, setSocket] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState('');

  useEffect(() => {
    const initializeSocket = () => {
      const newSocket = io('https://service.demowebsitelinks.com:3011');
      setSocket(newSocket);
    };

    initializeSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const initializePeer = async () => {
      const configuration = {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' },
        ],
      };
      const peer = new RTCPeerConnection(configuration);

      // Add local stream to peer connection
      // if (localStream) {
      //   localStream.getTracks().forEach((track) => {
      //     peer.addTrack(track, localStream);
      //   });
      // }

      peer.onTrack = event => {
        console.log('event => ', event)
        setRemoteStream(event.stream);
      };
      // Setup ice handling
      peer.onicecandidate = event => {
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
      };

      // Event listeners for incoming calls
      // peer.ontrack = (event) => {
      //   setRemoteStream(event.streams[0]);
      // };
      // // peer.onaddstream = (event) => {
      // //   setRemoteStream(event.stream);
      // // };

      // peer.onicecandidate = (event) => {
      //   if (event.candidate) {
      //     // Send ICE candidate to peer
      //   }
      // };

      peer.onnegotiationneeded = () => {
        // Handle negotiation
      };

      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);

      // Send offer to peer

      setPeerId(peer);
    };

    initializePeer();

    return () => {
      if (peerId) {
        peerId.close();
      }
    };
  }, [localStream]);

  useEffect(() => {
    if (socket) {
      socket.on('stream-status', (message) => {
        console.log('stream-status => ', message)
        // if (message === 'Disconnect') {
        //   setRemoteStream(null);
        // } else if (message === 'Connect') {
        // }
      });

      socket.on('stream-client-request', ({ clientPeerId, message }) => {
        console.log('stream-client-request clientPeerId => ', clientPeerId)
        console.log('stream-client-request message => ', message)
        if (clientPeerId === peerId) {
          if (message === 'Reject') {

          } else if (message === 'Accept') {


          }
        }
      });
    }
  }, [socket, peerId]);

  const joinStream = () => {
    console.log('peerId => ', peerId)
    if (peerId) {
      socket.emit('stream', peerId);

    } else {
      // Handle peer not initialized
    }
  };

  const renderRemoteStream = () => {
    if (remoteStream) {
      return <RTCView streamURL={remoteStream.toURL()} style={styles.remoteVideo} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        {localStream && <RTCView streamURL={localStream.toURL()} style={styles.currentUserVideo} />}
        <View style={styles.remoteVideoContainer}>{renderRemoteStream()}</View>
        <Button onPress={joinStream} title="Join Stream" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentUserVideo: {
    width: '100%',
    aspectRatio: 1,
  },
  remoteVideoContainer: {
    width: '100%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: 'black',
  },
  nostream: {
    alignItems: 'center',
  },
});

export default App;
