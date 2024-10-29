import React from 'react';
import { StyleSheet, View } from 'react-native';

const Progress = () => {
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const onSliderValueChange = async (value) => {
        if (sound) {
            const seekPosition = value * duration;
            await sound.setPositionAsync(seekPosition);
        }
    };
    return (
        <View>
            
        </View>
    );
}

const styles = StyleSheet.create({})

export default Progress;
