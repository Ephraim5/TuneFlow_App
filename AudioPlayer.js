import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Button, Slider } from 'react-native';
import Sound from 'react-native-sound';

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

const AudioPlayer = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [sound, setSound] = useState(null);

    useEffect(() => {
        const soundInstance = new Sound('your-audio-file.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Failed to load the sound', error);
                return;
            }
            setDuration(soundInstance.getDuration());
            setSound(soundInstance);
        });

        return () => {
            soundInstance.release();
        };
    }, []);

    useEffect(() => {
        if (sound) {
            const interval = setInterval(() => {
                sound.getCurrentTime((time) => setCurrentTime(time));
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [sound]);

    const play = () => {
        if (sound) {
            sound.play(() => setIsPlaying(true));
        }
    };

    const pause = () => {
        if (sound) {
            sound.pause(() => setIsPlaying(false));
        }
    };

    const seek = (time) => {
        if (sound) {
            sound.setCurrentTime(time);
            setCurrentTime(time); // Update current time to sync slider
        }
    };

    const updateSlider = (time) => {
        setCurrentTime(time);
        // The `onSlidingComplete` prop will call `seek` when the user stops sliding
    };

    return (
        <AudioContext.Provider value={{ isPlaying, play, pause, seek, currentTime, duration }}>
            <View>
                {children}
                <Slider
                    value={currentTime}
                    minimumValue={0}
                    maximumValue={duration}
                    onValueChange={updateSlider}
                    onSlidingComplete={seek}
                />
                <Button title={isPlaying ? "Pause" : "Play"} onPress={isPlaying ? pause : play} />
            </View>
        </AudioContext.Provider>
    );
};

export default AudioPlayer;
