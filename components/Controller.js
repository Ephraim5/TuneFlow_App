import React from 'react';
import { StyleSheet, Text, View, Image, Modal, ActivityIndicator, StatusBar, FlatList, TextInput, TouchableOpacity, Keyboard, Dimensions, Platform } from 'react-native';
import { Asset } from 'expo-asset';
import axios from 'axios';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Controller = () => {
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(null);
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const [atom, setAtom] = useState(null);
    const [count, setCount] = useState(0)
    const playSong = async (song) => {
        if (sound !== null) {
            await sound.unloadAsync(); 
        }
        setAtom(song);

        const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: song.preview },
            { shouldPlay: true }
        );
        newSound.setOnPlaybackStatusUpdate(updatePlaybackStatus);
        setSound(newSound);
        setCurrentSong(song);
        setIsPlaying(true);

    };
    const updatePlaybackStatus = (status) => {
        if (status.isLoaded) {
            setDuration(status.durationMillis);
            setPosition(status.positionMillis);
            setIsPlaying(status.isPlaying);
        }
    };
    const pauseSong = async () => {
        if (sound !== null) {
            await sound.pauseAsync();
            setIsPlaying(false);
        }
    };
    const onSliderValueChange = async (value) => {
        if (sound) {
            const seekPosition = value * duration;
            await sound.setPositionAsync(seekPosition);
        }
    };
    
    
}

const styles = StyleSheet.create({})

export default Controller;
