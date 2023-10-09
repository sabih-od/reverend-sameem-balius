import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { IOS, colors, fontSize, fonts, isRTL, width } from '../theme';
import strings, { changeLang } from "../localization/translation";
import { useEffect, useState } from 'react';
import { CurrentTrackInfo, DurationFormat, GetPlayerState, TrackPause, TrackPlay } from '../helpers/track-player';
import TrackPlayer, { Event, State, useProgress, useTrackPlayerEvents } from 'react-native-track-player';
import Slider from "@react-native-community/slider";

const AudioPlayerInner = (props) => {

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
        <View style={{ width: width, marginLeft: -15, marginTop: -10 }}>
            <Slider
                style={
                    IOS ? { width: width, marginBottom: -22, zIndex: 1 } : { width: width + 32, marginLeft: -16, marginBottom: -11, zIndex: 1 }
                }
                minimumValue={0}
                value={progress?.position}
                maximumValue={progress?.duration}
                // minimumTrackTintColor={colors.orange}
                // maximumTrackTintColor="#fff"
                minimumTrackTintColor="transparent"
                maximumTrackTintColor="transparent"
                tapToSeek={true}
                onValueChange={(value) => {
                    console.log(Math.round(value))
                    TrackPlayer.seekTo(Math.round(value))
                    // progress.position = Math.round(value)
                }}
                thumbTintColor={'transparent'}


            />
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <View style={{ flex: progress.position, backgroundColor: colors.orange, height: 4 }} />
                <View style={{ flex: progress.duration - progress.position, backgroundColor: '#fff', height: 4 }} />
            </View>
            <View style={{
                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15,
                paddingHorizontal: 10,
                // backgroundColor: colors.headerbgcolor,
                backgroundColor: colors.darkblue,
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    {/* <TouchableOpacity
                        style={{ width: 30, height: 70, alignItems: 'center', justifyContent: 'center' }}
                        activeOpacity={0.8}
                        onPress={() => props.handleClose(false, null)}
                    >
                        <Icon name="x" style={{ color: colors.white, fontSize: 16 }} />
                    </TouchableOpacity> */}
                    <Image
                        source={trackInfo?.artwork ? { uri: trackInfo?.artwork } : require('./../../assets/images/speaker-placeholder.png')}
                        defaultSource={require('./../../assets/images/speaker-placeholder.png')}
                        style={{ width: 70, height: 70, borderRadius: 15, marginRight: 10 }} />
                    <View style={{ width: width - 140 }}>
                        <Text numberOfLines={1} style={{ fontFamily: isRTL ? fonts.arabicMedium : fonts.primaryBold, textAlign: 'left', fontSize: isRTL ? 17 : fontSize + 1, marginBottom: 2, color: colors.white, fontFamily: isRTL ? fonts.arabicBold : fonts.primary }}>{trackInfo?.title}</Text>
                        <Text numberOfLines={1} style={{ fontFamily: isRTL ? fonts.arabicRegular : fonts.primary, textAlign: 'left', color: '#333', fontSize: fontSize - 2, marginBottom: 2, color: colors.white, fontFamily: isRTL ? fonts.arabicRegular : fonts.primary }}>{trackInfo?.artist}</Text>
                        <Text style={{ fontFamily: fonts.primary, color: colors.white, fontSize: fontSize - 2, textAlign: 'left', }}>{DurationFormat(progress?.position)} - {DurationFormat(progress?.duration)}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => handlePlayPress()}
                    activeOpacity={0.9}
                    style={{ width: 40, height: 40, backgroundColor: colors.orange, marginRight: 10, borderRadius: 30, justifyContent: 'center', alignItems: 'center', }}
                >
                    <Image source={isPlaying ? require('./../../assets/images/pause.png') : require('./../../assets/images/play.png')} style={{ width: 40, height: 40 }} />
                    {/* <Icon name={isPlaying ? "pause" : "play"} style={[{ fontSize: 18, color: colors.white }, isRTL ? { marginLeft: isPlaying ? 0 : -4 } : { marginRight: isPlaying ? 0 : -4 }]} /> */}
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default AudioPlayerInner;