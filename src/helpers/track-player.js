import TrackPlayer, { AppKilledPlaybackBehavior, Capability, State } from "react-native-track-player";

export const SetupTrackPlayer = async () => {
    isSetup = false;
    try {
        await TrackPlayer.getCurrentTrack();
        isSetup = true;
    }
    catch {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
            android: {
                appKilledPlaybackBehavior:
                    AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
            },
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.SeekTo,
            ],
            compactCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
            ],
            progressUpdateEventInterval: 2,
        });
        isSetup = true;
    }
    finally {
        return isSetup;
    }
};

export const TrackPlay = async () => {
    await TrackPlayer.play();
}
export const TrackPause = async () => {
    await TrackPlayer.pause();
}
export const TrackAddItem = async (item) => {
    // {
    //     id: 'trackId',
    //     url: require('track.mp3'),
    //     title: 'Track Title',
    //     artist: 'Track Artist',
    //     artwork: require('track.png')
    // }
    await TrackPlayer.add(item);
}

export const GetCurrentTrack = async () => {
    const track = await TrackPlayer.getCurrentTrack();
    return track;
}

export const GetPlayerState = async () => {
    const state = await TrackPlayer.getState();
    console.log('track state => ', state)
    return state;
    // if (state == State.Playing) {
    //     // TrackPlayer.pause();
    // }
    // else {
    //     // TrackPlayer.play();
    // }
}

export const CurrentTrackInfo = async () => {
    const track = await TrackPlayer.getCurrentTrack();
    console.log('CurrentTrackInfo track => ', track)
    if (track != null) {
        const info = await TrackPlayer.getTrack(track);
        return info;
    }
    return {}

}

export function DurationFormat(seconds) {
    let mins = (parseInt(seconds / 60)).toString().padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}