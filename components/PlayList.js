import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const PlayList = ({ title, img, name }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 6000);
    }, []);
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.container} onPress={() => console.log({ "name": name, "image": img })}>

                <ShimmerPlaceholder
                    visible={!isLoading}
                    LinearGradient={LinearGradient}
                    shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
                    style={{ height: 60, width: 60, borderRadius: 4 }}
                >
                    <Image style={{ height: 60, width: 60, borderRadius: 4 }} source={img} />
                </ShimmerPlaceholder>

                <View style={styles.textCont}>
                    {!isLoading && (
                        <Text style={styles.text}>{title.length > 18 ? title.slice(0, 18) + '...' : title}</Text>
                    )}
                </View>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        minWidth: 170,
        maxWidth: 210,
        flex: 1,
        maxHeight: 60,
        backgroundColor: "rgba(22, 22, 22, 1)",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 4,
        overflow: 'hidden',
        marginRight: 8,
        marginBottom: 9,
        elevation: 10,
    },
    textCont: {
        textAlign: 'center',
        width: '55%',
    },
    text: {
        color: 'white',
    }
});

export default PlayList;
