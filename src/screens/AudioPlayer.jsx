import { Image, ImageBackground, Text, View, TouchableOpacity } from "react-native";
import { colors, fonts, height, isDarkMode, width } from "../theme"
import globalstyle from "../theme/style";
import LinearGradient from "react-native-linear-gradient";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/Feather";

import { useEffect, useState } from 'react';
import { CurrentTrackInfo, DurationFormat, GetPlayerState, TrackPause, TrackPlay } from '../helpers/track-player';
import TrackPlayer, { Event, State, useProgress, useTrackPlayerEvents } from 'react-native-track-player';


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

    return (
        <View style={[globalstyle.fullview, { backgroundColor: colors.deepblue, height: height }]}>
            <ImageBackground source={require('./../../assets/images/meditation.jpg')} style={{ width: width, height: width + 100, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }} blurRadius={20}>
                <Image source={require('./../../assets/images/meditation.jpg')} style={{ width: width - 100, height: width - 100, borderRadius: 20, marginBottom: -34, zIndex: 1 }} />
                <View style={{ width: width, height: width, position: 'absolute', backgroundColor: colors.deepblue, top: 0, left: 0, opacity: 0.5, zIndex: 0 }} />
                <LinearGradient colors={['transparent', colors.deepblue]} style={{ width: width, height: width, position: 'absolute', bottom: 0, left: 0, zIndex: 0 }} />
            </ImageBackground>
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
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#555"
                    tapToSeek={true}
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
            <View style={{ width: 300, marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 40 }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { }}>
                    <Icon name="refresh-ccw" style={{ color: colors.white, fontSize: 25, }} />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    // style={{ width: 70, height: 70, backgroundColor: colors.orange, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => handlePlayPress()}
                >
                    <Image source={isPlaying ? require('./../../assets/images/pause.png') : require('./../../assets/images/play.png')} style={{ width: 80, height: 80 }} />
                    {/* <Icon name={isPlaying ? "pause" : "play"} style={{ color: colors.white, fontSize: 40, marginRight: -6 }} /> */}
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { }}>
                    <Icon name="heart" style={{ color: colors.white, fontSize: 25, }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AudioPlayer;