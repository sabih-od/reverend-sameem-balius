import { Image, ImageBackground, Text, View, TouchableOpacity } from "react-native";
import { IOS, backgroungImage, colors, fonts, height, isDarkMode, width } from "../theme"
import globalstyle from "../theme/style";
import LinearGradient from "react-native-linear-gradient";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/Feather";

import { useEffect, useState } from 'react';
import { CurrentTrackInfo, DurationFormat, GetPlayerState, TrackPause, TrackPlay } from '../helpers/track-player';
import TrackPlayer, { Event, State, useProgress, useTrackPlayerEvents } from 'react-native-track-player';
import RNFS from 'react-native-fs';
import ReactNativeBlobUtil from "react-native-blob-util";
import { UpdateDownlaods } from "../redux/reducers/AppStateReducer";
import { showToast } from "../helpers/toastConfig";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


const AudioPlayer = (props) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [trackInfo, setTrackInfo] = useState(false);

    const progress = useProgress()
    // console.log('progress => ', progress)

    useEffect(() => {
        // const checkState = async () => {
        //     // const trackstate = await GetPlayerState();
        //     // console.log('checkState => ', trackstate)
        //     // setIsPlaying(trackstate)

        //     let info = await CurrentTrackInfo();
        //     console.log('CurrentTrackInfo => ', info)
        //     setTrackInfo(info)



        //     // let queue = await TrackPlayer.getQueue();
        //     // console.log('queue => ', queue)
        //     // await TrackPlayer.reset();

        // }
        // checkState();

        const abc = async () => {
            let info = await CurrentTrackInfo();
            console.log('CurrentTrackInfo => ', info)
            setTrackInfo(info)
        }
        abc()

        return async () => {
            const reset = await TrackPlayer.reset();
        }
    }, [])

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
        let info = await CurrentTrackInfo();
        console.log('CurrentTrackInfo => ', info)
        setTrackInfo(info)
    });


    useTrackPlayerEvents([Event.PlaybackState], async (event) => {
        console.log('event => ', event)
        if (event.state == State.Playing) {
            setIsPlaying(true)
        }
        if (event.state == State.Paused) {
            setIsPlaying(false)
        }
    });

    async function handlePlayPress() {
        const currentState = await TrackPlayer.getState();
        console.log(currentState);
        if (currentState == State.Playing) {
            setIsPlaying(false)
            TrackPlayer.pause();
        }
        else {
            TrackPlayer.play();
            setIsPlaying(true)
        }
    }

    const filename = Math.round(Math.random() * 10000000)
    const path = `${RNFS.DocumentDirectoryPath}/${filename}`;
    function downloadAudio(url) {
        console.log('url => ', url)
        ReactNativeBlobUtil.config({
            fileCache: true,
            path: path,
        }).fetch('GET', url, {})
            .then((res) => {
                console.log('response => ', res);
                console.log('res => ', res.info());
                console.log('path => ', path)
                // setImagePath(path)
                const newinfo = { ...trackInfo, url: path }
                console.log('newinfo => ', newinfo)
                if (props.downloads) {
                    let abcd = [...props.downloads, { ...newinfo }]
                    console.log('abcd => ', abcd)
                    props.UpdateDownlaods(abcd)
                } else {
                    let abcd = [{ ...newinfo }]
                    console.log('abcd => ', abcd)
                    props.UpdateDownlaods(abcd)
                }
                showToast('success', `${newinfo?.title} download completed`)
            }).catch((errorMessage, statusCode) => {
                // error handling
                console.log('errorMessage => ', errorMessage)
                console.log('statusCode => ', statusCode)
            })
    }

    useEffect(() => {
        // let cs = {
        //     "artwork": {
        //         "__packager_asset": true,
        //         "width": 500,
        //         "height": 500,
        //         "uri": "http://localhost:8081/assets/assets/images/meditation.jpg?platform=ios&hash=b96e33f238683ffc7b8d360dfa875337",
        //         "scale": 1
        //     },
        //     "id": 4,
        //     "title": "Thu 24 Aug, Daily Gospel",
        //     "url": "/Users/iftikhar.tabish/Library/Developer/CoreSimulator/Devices/108826D3-F5F0-4683-BA59-ECEEC41DC5B5/data/Containers/Data/Application/5D875E08-90A6-41CC-864C-5577E9DC0F48/Documents/8611680",
        //     "artist": "Lectio Divina: A conversation with GOD"
        // }
        // console.log('props.downlaods => ', props.downlaods)
        // const downlaods = props.downlaods
        // downlaods.push(cs)
        // console.log('downloads => ', downloads)
    }, [])

    return (
        <View style={[globalstyle.fullview, { backgroundColor: isDarkMode ? colors.deepblue : colors.headerbgcolor, height: height }]}>
            <Image style={[{ width: width, height: height, position: 'absolute', zIndex: 0 }]} resizeMode="cover" source={backgroungImage} />
            <View style={{ width: width, height: width + 100, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Image source={require('./../../assets/images/meditation.jpg')} style={{ width: width - 100, height: width - 100, borderRadius: 20, marginBottom: -34, zIndex: 1 }} />
            </View>
            {/* <ImageBackground source={require('./../../assets/images/meditation.jpg')} style={{ width: width, height: width + 100, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }} blurRadius={20}>
                <Image source={require('./../../assets/images/meditation.jpg')} style={{ width: width - 100, height: width - 100, borderRadius: 20, marginBottom: -34, zIndex: 1 }} />
                <View style={{ width: width, height: width, position: 'absolute', backgroundColor: colors.deepblue, top: 0, left: 0, opacity: 0.5, zIndex: 0 }} />
                <LinearGradient colors={['transparent', colors.deepblue]} style={{ width: width, height: width, position: 'absolute', bottom: 0, left: 0, zIndex: 0 }} />
            </ImageBackground> */}
            <View style={{ marginTop: -50 }}>
                <Text style={{ fontFamily: fonts.primarySemiBold, fontSize: 22, color: isDarkMode ? colors.white : colors.black, textAlign: 'center' }}>{trackInfo?.title}</Text>
                <Text style={{ fontFamily: fonts.primary, fontSize: 16, color: isDarkMode ? colors.white : colors.black, textAlign: 'center' }}>{trackInfo?.artist}</Text>
            </View>
            <View style={{ marginTop: 50, width: width - 40, marginHorizontal: 20 }}>
                <Slider
                    style={{ width: width - 40, height: 40 }}
                    minimumValue={0}
                    value={progress?.position}
                    maximumValue={progress?.duration}
                    minimumTrackTintColor={colors.orange}
                    maximumTrackTintColor={IOS ? "#555" : isDarkMode ? '#fff' : '#666'}
                    tapToSeek={true}
                    thumbTintColor={colors.orange}
                    onValueChange={(value) => {
                        console.log(Math.round(value))
                        TrackPlayer.seekTo(Math.round(value))
                        // progress.position = Math.round(value)
                    }}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                    <Text style={{ fontFamily: fonts.primary, color: isDarkMode ? colors.white : colors.black }}>{DurationFormat(progress?.position)}</Text>
                    <Text style={{ fontFamily: fonts.primary, color: isDarkMode ? colors.white : colors.black }}>{DurationFormat(progress?.duration)}</Text>
                </View>
            </View>
            <View style={{ width: width - 30, marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 40 }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={async () => {
                        await TrackPlayer.seekTo(0)
                        await TrackPlayer.play()
                    }}
                >
                    <Icon name="refresh-ccw" style={{ color: isDarkMode ? colors.white : colors.black, fontSize: 25, }} />
                </TouchableOpacity>
                {/* <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={async () => {
                        await TrackPlayer.seekTo(0)
                        await TrackPlayer.play()
                    }}
                >
                    <Icon name="minus-circle" style={{ color: isDarkMode ? colors.white : colors.black, fontSize: 30, }} />
                </TouchableOpacity> */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    // style={{ width: 70, height: 70, backgroundColor: colors.black, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => handlePlayPress()}
                >
                    <Image source={isPlaying ? require('./../../assets/images/pause.png') : require('./../../assets/images/play.png')} style={{ width: 80, height: 80 }} />
                    {/* <Icon name={isPlaying ? "pause" : "play"} style={{ color: isDarkMode ? colors.white: colors.black, fontSize: 40, marginRight: -6 }} /> */}
                </TouchableOpacity>
                {/* <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={async () => {
                        await TrackPlayer.seekTo(0)
                        await TrackPlayer.play()
                    }}
                >
                    <Icon name="plus-circle" style={{ color: isDarkMode ? colors.white : colors.black, fontSize: 30, }} />
                </TouchableOpacity> */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { downloadAudio(trackInfo?.url) }}>
                    <Icon name="download-cloud" style={{ color: isDarkMode ? colors.white : colors.black, fontSize: 25, }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const setStateToProps = state => ({
    downloads: state.appstate.downloads,
})

const mapDispatchToProps = dispatch => {
    return {
        UpdateDownlaods: bindActionCreators(UpdateDownlaods, dispatch),
    }
}

export default connect(setStateToProps, mapDispatchToProps)(AudioPlayer);