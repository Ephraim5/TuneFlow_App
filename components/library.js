import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons';
import Header from './Header';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

export default function Library(navigation) {
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 5000);
    }, []);
    useEffect(() => {
        const fetchedSongs = [
            {
                id: 1,
                title: 'Recent',
                artist: 'All Played Songs',
                albumCover: require('../assets/music/resent.jpg'),
            },
            {
                id: 2,
                title: 'Favorite Songs',
                artist: 'Your Favorite Songs',
                albumCover: require('../assets/music/love.gif'),
            },
        ];

        setSongs(fetchedSongs);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={styles.container}>
                <Header />
                <View style={styles.songList}>
                    {songs.map((song) => (
                        <ShimmerPlaceholder
                            visible={!isLoading}
                            LinearGradient={LinearGradient}
                            key={song.id}
                            shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
                            style={{ width: "95%", height: 70, borderRadius: 5, marginBottom: 20, }}
                        >
                            <TouchableOpacity key={song.id} style={styles.songItem} onPress={()=>navigation.navigate("FavoriteSong",{name:song.title,image:song.albumCover})}>
                                <Image source={ song.albumCover } style={styles.albumCover} blurRadius={1}/>
                                <View style={styles.songInfo}>
                                    <Text style={styles.songTitle}>{song.title}</Text>
                                    <Text style={styles.artist}>{song.artist}</Text>
                                </View>
                                <AntDesign name="pluscircle" size={24} color="white" />
                            </TouchableOpacity>
                        </ShimmerPlaceholder>
                    ))}
                </View>

                <View style={styles.Room}>
                    <ShimmerPlaceholder
                        visible={!isLoading}
                        LinearGradient={LinearGradient}
                        shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
                        style={{ width: "46%", height: "45%", borderRadius: 5, }}
                    >
                        <TouchableOpacity style={{ paddingRight: widthPercentageToDP("5%"), width: widthPercentageToDP("42.75%"), height: heightPercentageToDP("24%"), borderRadius: 5, backgroundColor: '#141313', alignItems: 'center', justifyContent: 'center', }}>
                            <MaterialIcons name="create-new-folder" size={100} color="white" />
                            <Text style={{ color: '#d5d5d5', fontSize: 16, }}>Create PlayList</Text>
                        </TouchableOpacity>
                    </ShimmerPlaceholder>
                    <ShimmerPlaceholder
                        visible={!isLoading}
                        LinearGradient={LinearGradient}
                        shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
                        style={{ width: "46%", height: "45%", borderRadius: 5, }}
                    >
                        <TouchableOpacity style={{ paddingRight: widthPercentageToDP("5%"), width: widthPercentageToDP("42.75%"), height: heightPercentageToDP("24%"), borderRadius: 5, backgroundColor: '#141313', alignItems: 'center', justifyContent: 'center', }}>
                            <MaterialIcons name="album" size={100} color="white" />
                            <Text style={{ color: '#ffffff', fontSize: 16, }}>Album</Text>
                        </TouchableOpacity>
                    </ShimmerPlaceholder>
                    <ShimmerPlaceholder
                        visible={!isLoading}
                        LinearGradient={LinearGradient}
                        shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
                        style={{ width: "45%", height: "45%", borderRadius: 5, }}
                    >
                        <TouchableOpacity style={{ paddingRight: widthPercentageToDP("5%"), width: widthPercentageToDP("42.75%"), height: heightPercentageToDP("24%"), borderRadius: 5, backgroundColor: '#141313', alignItems: 'center', justifyContent: 'center', }}>
                            <Entypo name="folder-music" size={100} color="white" />
                            <Text style={{ color: '#d5d5d5', fontSize: 16, }}>Local Music</Text>
                        </TouchableOpacity>
                    </ShimmerPlaceholder>
                    <ShimmerPlaceholder
                        visible={!isLoading}
                        LinearGradient={LinearGradient}
                        shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
                        style={{ width: "45%", height: "45%", borderRadius: 5, }}
                    >
                        <TouchableOpacity style={{ paddingRight: widthPercentageToDP("5%"), width: widthPercentageToDP("42.75%"), height: heightPercentageToDP("24%"), borderRadius: 5, backgroundColor: '#141313', alignItems: 'center', justifyContent: 'center', }}>
                            <Entypo name="download" size={100} color="white" />
                            <Text style={{ color: '#d5d5d5', fontSize: 16, }}>Downloads</Text>
                        </TouchableOpacity>
                    </ShimmerPlaceholder>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10
    },
    header: {
        backgroundColor: '#000',
        paddingVertical: 20,
        paddingHorizontal: 20,
        top: 10,
    },

    Room: {
        marginVertical: 20,
        width: '95%',
        gap: 20,
        padding: 10,
        justifyContent: 'center',
        height: '60%',
        top: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    songList: {
        flex: 1,
        backgroundColor: '#000',
        marginTop: 20,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    songItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    albumCover: {
        width: 50,
        height: 50,
        marginRight: 15,
        borderRadius: 5,
    },
    songInfo: {
        flex: 1,
    },
    songTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
    artist: {
        fontSize: 14,
        color: '#8b8b8b',
    },
});
