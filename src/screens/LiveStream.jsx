import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import WebView from 'react-native-webview'
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalstyle from '../theme/style';
import Icon from "react-native-vector-icons/Feather";
import { backgroungImage, colors, isDarkMode, isRTL } from '../theme';

const LiveStream = ({navigation}) => {

  const [url, setUrl] = useState(false)

  axios.get('https://reverendsameembalius.com:3013/stream/get-live-stream', {
  headers: {
    'Content-Type': 'application/json', // Adjust content type if needed
    // Include other headers as necessary
  }
})
  .then(response => {
    const res = response.data
    if (res) setUrl(res);

    console.log('res', res); // Handle the data from the response
  })
  .catch(error => {
    console.error('There was an error making the request:', error);
  });
  return (
    <ImageBackground style={{flex: 1, backgroundColor: colors.headerbgcolor}} source={backgroungImage}>
      {url ?  <WebView source={{uri: url}} /> : <SafeAreaView  style={globalstyle.fullview}>
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
            navigation.goBack();
            }}
            style={[{ padding: 10, paddingHorizontal: 15, borderRadius: 40, overflow: 'hidden', marginRight: 15 }]} >
          <Icon name={isRTL ? 'chevron-right' : 'chevron-left'} size={22} color={isDarkMode ? colors.black : colors.black} />
        </TouchableOpacity >
        <Text style={{textAlign: 'center', fontSize: 18, fontWeight: '700', color: '#000' }}>No Live Stream Found</Text>
        </SafeAreaView>}
    </ImageBackground>
  )
}

export default LiveStream

// import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { colors, fonts, height, width } from '../theme';
// import Icon from 'react-native-vector-icons/Feather';
// import { useEffect, useRef, useState } from 'react';
// import { emit, getSocket } from '../helpers/socket-manager';
// import { mediaDevices, RTCPeerConnection, RTCView, RTCIceCandidate, RTCSessionDescription, } from 'react-native-webrtc';
// import InCallManager from 'react-native-incall-manager';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// // import SocketIOClient from 'socket.io-client';
// // import io from 'socket.io-client';

// const LiveStream = (props) => {

//   const otheruser = props?.userInfo?.id == 3
//     ? { id: 9, first_name: 'Sarah', last_name: 'Thompson', profile_picture: require('./../../assets/images/profile-4.jpg') }
//     : { id: 3, first_name: 'John', last_name: 'Martin', profile_picture: require('./../../assets/images/profile-1.jpeg') };
//   console.log('otheruser => ', otheruser)
//   const [type, setType] = useState(null);
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [isMicOn, setMicOn] = useState(true);
//   const [isCameraOn, setCameraOn] = useState(true);
//   const otherUserId = useRef(otheruser.id);

//   const socket = getSocket();
//   const peerConnection = useRef(new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302', }, { urls: 'stun:stun1.l.google.com:19302', }, { urls: 'stun:stun2.l.google.com:19302', },], }));
//   let remoteRTCMessage = useRef(null);
//   let isFront = false;

//   useEffect(() => {

//     console.log('WebRtcScreen socketId => ', socket?.id)
//     socket?.on('newCall', data => {
//       console.log('on newCall')
//       remoteRTCMessage.current = data.sdpOffer;
//       otherUserId.current = data.callerId;
//       setType('INCOMING_CALL');
//     });

//     socket?.on('callAnswered', data => {
//       console.log('on callAnswered', data.sdpAnswer)
//       remoteRTCMessage.current = data.sdpAnswer;
//       peerConnection.current.setRemoteDescription(new RTCSessionDescription(remoteRTCMessage.current));
//       setType('WEBRTC_ROOM');
//     });

//     socket?.on('IceCandidate', data => {
//       console.log('on IceCandidate')
//       let message = data.iceCandidate;
//       if (message && message.candidate && peerConnection.current) {
//         console.log('message.candidate => ', message.candidate)
//         peerConnection?.current.addIceCandidate(new RTCIceCandidate({ candidate: message.candidate, sdpMid: message.id, sdpMLineIndex: message.label }))
//           .then(data => { console.log('SUCCESS', data) })
//           .catch(err => { console.log('Error', err) });
//       }
//     });

//     return () => {
//       socket?.off('newCall');
//       socket?.off('callAnswered');
//       socket?.off('IceCandidate');
//       socket?.off('testmsg');
//     };

//   }, [socket]);

//   useEffect(() => {
//     if (localStream) {
//       localStream.getTracks().forEach(
//         track => {
//           peerConnection.current.addTrack(track, localStream)
//           console.log('addTrack');
//         }
//       )
//     }

//     peerConnection.current.ontrack = event => {
//       console.log('onTrack event => ', event);
//       if (event.streams && event.streams.length > 0) {
//         // Access the first stream if available
//         const remoteStream = event.streams[0];
//         setRemoteStream(remoteStream);
//         console.log('Remote stream received:', remoteStream);

//         // You can now use remoteStream for display or other purposes
//       } else {
//         console.log('No streams in the ontrack event');
//       }
//     };
    
//     // peerConnection.current.onaddtrack = event => {
//     //   console.log('onaddtrack event => ', event)
//     //   setRemoteStream(event.stream);
//     // };

//     // peerConnection.current.onaddstream = event => {
//     //   console.log('onaddstream event => ', event)
//     //   setRemoteStream(event.stream);
//     // };
//     // Setup ice handling
//     peerConnection.current.onicecandidate = event => {
//       console.log('onicecandidate event => ', event)
//       if (event.candidate) {
//         socket?.emit('IceCandidate', {
//           calleeId: otherUserId.current,
//           iceCandidate: {
//             id: event.candidate.sdpMid,
//             label: event.candidate.sdpMLineIndex,
//             candidate: event.candidate.candidate,
//           },
//         });
//       } else {
//         console.log('End of candidates.');
//       }
//     };
//   }, [localStream])

//   useEffect(() => {
//     mediaDevices.enumerateDevices().then(sourceInfos => {
//       let videoSourceId;
//       for (let i = 0; i < sourceInfos.length; i++) {
//         const sourceInfo = sourceInfos[i];
//         if (sourceInfo.kind == 'videoinput' && sourceInfo.facing == (isFront ? 'user' : 'environment')) {
//           videoSourceId = sourceInfo.deviceId;
//         }
//       }

//       mediaDevices.getUserMedia({
//         audio: true,
//         video: {
//           mandatory: {
//             minWidth: 500, // Provide your own width, height and frame rate here
//             minHeight: 300,
//             minFrameRate: 30,
//           },
//           facingMode: isFront ? 'user' : 'environment',
//           optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
//         },
//       }).then(stream => { // Got stream!
//         setLocalStream(stream);
//       }).catch(error => { // Log error
//       });
//     });
//   }, []);

//   useEffect(() => {
//     InCallManager.start();
//     InCallManager.setKeepScreenOn(true);
//     InCallManager.setForceSpeakerphoneOn(true);
//     return () => {
//       InCallManager.stop();
//     };
//   }, []);


//   async function processCall() {
//     const sessionDescription = await peerConnection.current.createOffer();
//     await peerConnection.current.setLocalDescription(sessionDescription);
//     socket?.emit('makeCall', {
//       calleeId: otherUserId.current,
//       sdpOffer: sessionDescription,
//     });
//   }

//   async function processAccept() {
//     peerConnection.current.setRemoteDescription(new RTCSessionDescription(remoteRTCMessage.current));
//     const sessionDescription = await peerConnection.current.createAnswer();
//     await peerConnection.current.setLocalDescription(sessionDescription);
//     socket?.emit('answerCall', {
//       callerId: otherUserId.current,
//       sdpAnswer: sessionDescription,
//     });
//   }


//   function leave() {
//     otherUserId.current = null;
//     peerConnection.current.close();
//     localStream.getTracks().forEach(
//       track => track.stop()
//     );
//     setLocalStream(null);
//     props.navigation.goBack();
//     setType(null);
//   }

//   /* -------------- On Call Functions ---------- */
//   function switchCamera() {
//     localStream.getVideoTracks().forEach(track => {
//       track._switchCamera();
//     });
//   }
//   function toggleCamera() {
//     isCameraOn ? setCameraOn(false) : setCameraOn(true);
//     localStream.getVideoTracks().forEach(track => {
//       isCameraOn ? (track.enabled = false) : (track.enabled = true);
//     });
//   }
//   function toggleMic() {
//     isMicOn ? setMicOn(false) : setMicOn(true);
//     localStream.getAudioTracks().forEach(track => {
//       isMicOn ? (track.enabled = false) : (track.enabled = true);
//     });
//   }
//   /* -------------- On Call Functions ---------- */

//   useEffect(() => {
//     console.log('remoteStream => ', remoteStream)
//     // console.log('peerConnection.current => ', peerConnection.current)
//   }, [remoteStream])

//   function sendmes() {
//     console.log('props.userInfo.id => ', props.userInfo.id)
//     socket?.emit('testmsg', { id: props.userInfo.id == 3 ? 9 : 3, message: 'Live Stream Here' })
//   }

//   return (
//     <View style={{ flex: 1, }}>
//       {/* <TouchableOpacity>
//         <Text onPress={() => {
//           sendmes()
//         }}>Test</Text>
//       </TouchableOpacity> */}
//       {remoteStream ? (
//         <RTCView objectFit={'cover'} style={{ flex: 1, backgroundColor: '#050A0E', }} streamURL={remoteStream.toURL()} />
//       ) :
//         <ImageBackground blurRadius={8} style={[{ resizeMode: 'cover', alignItems: 'center', justifyContent: 'center', width: width, height: (height / 2) }]} source={otheruser.profile_picture}>
//           <View style={{ width: 100, height: 100, borderRadius: 100, overflow: 'hidden', shadowColor: "#000000", shadowOffset: { width: 0, height: 3, }, shadowOpacity: 0.17, shadowRadius: 3.05, elevation: 4 }}>
//             <Image source={otheruser.profile_picture} style={{ width: '100%', height: '100%', }} />
//           </View>
//         </ImageBackground>
//       }

//       {(localStream && isCameraOn) ? (
//         <RTCView objectFit={'cover'} style={{ flex: 1, backgroundColor: '#050A0E' }} streamURL={localStream.toURL()} />
//       ) :
//         <ImageBackground blurRadius={8} style={[{ resizeMode: 'cover', alignItems: 'center', justifyContent: 'center', width: width, height: (height / 2) }]} source={require('./../../assets/images/profile-1.jpeg')}>
//           <View style={{ width: 100, height: 100, borderRadius: 100, overflow: 'hidden', shadowColor: "#000000", shadowOffset: { width: 0, height: 3, }, shadowOpacity: 0.17, shadowRadius: 3.05, elevation: 4 }}>
//             <Image source={require('./../../assets/images/profile-1.jpeg')} style={{ width: '100%', height: '100%', }} />
//           </View>
//         </ImageBackground>
//         // <Image style={[{ resizeMode: 'cover', width: width, height: (height / 2) }]} source={require('./../../assets/images/profile-1.jpeg')} />
//       }
//       <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={{ width: width, height: width * 1.5, position: 'absolute', bottom: 0, zIndex: 0 }} />
//       <View style={{ position: 'absolute', bottom: 130, width: width }}>
//         <View style={{ alignItems: 'center' }}>
//           <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: colors.white, marginBottom: -7 }}>
//             {type == null && 'Make a Call to'}
//             {type == 'WEBRTC_ROOM' && 'Connected With'}
//             {type == 'OUTGOING_CALL' && 'Calling to'}
//             {type == 'INCOMING_CALL' && 'Call from'}
//           </Text>
//           <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 26, color: colors.white }}>{`${otheruser?.first_name} ${otheruser?.last_name}`} {otheruser.id}</Text>
//           {/* <Text style={{ fontFamily: fonts.primary, fontSize: 16, color: colors.white }}>{otheruser?.id}</Text> */}
//         </View>
//         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: -5 }}>
//           <View style={{ backgroundColor: colors.primary, width: 10, height: 10, marginBottom: 2, borderRadius: 10, marginRight: 10 }} />
//           <Text style={{ fontFamily: fonts.primary, fontSize: 14, color: colors.white }}>22:15</Text>
//         </View>
//       </View>
//       <View style={{ position: 'absolute', right: 15, bottom: 20, }}>
//         <TouchableOpacity style={[styles.vertbotton, { backgroundColor: '#222', },]}>
//           <Icon name="chevron-down" style={[styles.verticon, { color: '#fff', }]} />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => switchCamera()} style={[styles.vertbotton, { backgroundColor: colors.white, },]}>
//           <Icon name='refresh-ccw' style={styles.verticon} />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => { toggleCamera() }} style={[styles.vertbotton, { backgroundColor: colors.white, },]}>
//           <Icon name={isCameraOn ? "video" : 'video-off'} style={styles.verticon} />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => toggleMic()} style={[styles.vertbotton, { backgroundColor: colors.white, },]}>
//           <Icon name={isMicOn ? "mic" : 'mic-off'} style={styles.verticon} />
//         </TouchableOpacity>
//       </View>

//       <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 20, width: width }}>
//         {type != null && <TouchableOpacity onPress={() => { leave() }}
//           style={[styles.vertbotton, { backgroundColor: colors.red, height: 65, width: 65, },]}>
//           <Icon name="phone-off" style={[styles.verticon, { color: '#fff', fontSize: 22 }]} />
//         </TouchableOpacity>}

//         {/* When You Call SomeOne */}
//         {type == null && <TouchableOpacity onPress={() => {
//           if (otherUserId.current) {
//             // setType('OUTGOING_CALL');
//             processCall()
//           }
//         }}
//           style={[styles.vertbotton, { backgroundColor: colors.green, height: 65, width: 65 },]}>
//           <Icon name="phone" style={[styles.verticon, { color: '#fff', fontSize: 22 }]} />
//         </TouchableOpacity>}

//         {/* When SomeOne Calling You */}
//         {type == 'INCOMING_CALL' && <>
//           <View style={{ width: 30 }} />
//           <TouchableOpacity onPress={() => {
//             setType('WEBRTC_ROOM');
//             processAccept()
//           }}
//             style={[styles.vertbotton, { backgroundColor: colors.green, height: 65, width: 65, },]}>
//             <Icon name="phone-call" style={[styles.verticon, { color: '#fff', fontSize: 22 }]} />
//           </TouchableOpacity>
//         </>}
//       </View>
//     </View>
//   )
// }

// const setStateToProps = (state) => ({
//   userInfo: state.appstate.userInfo,
// });
// const mapDispatchToProps = (dispatch) => {
//   return {
//     // LogOut: bindActionCreators(LogOut, dispatch),
//   }
// };
// export default connect(setStateToProps, mapDispatchToProps)(LiveStream);

// const styles = StyleSheet.create({
//   vertbotton: { marginBottom: 10, borderRadius: 55, width: 55, height: 55, alignItems: 'center', justifyContent: 'center' },
//   verticon: { color: colors.primary, fontSize: 22 }
// });