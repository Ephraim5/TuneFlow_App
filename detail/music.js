import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Modal, ActivityIndicator, StatusBar, FlatList, TextInput, TouchableOpacity, Keyboard, Dimensions, Platform, ScrollView, ImageBackground } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP,heightPercentageToDP } from 'react-native-responsive-screen';
import axios from 'axios';
import MixCard from '../components/MixCard';
import ShowCard from '../components/ShowCard';

const Music = ({route}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [tend, setTend] = useState([]);
    const [songs, setSongs] = useState([]);
    const {  title } = route.params;

    useEffect(() => {
        const fetchSongs = async () => {
            const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${title} ${'shows'}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'f8f15b92eamsh69750d54920ffb6p11e1b2jsn9c8fab99fa0f',
                    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
                },
            };

            try {
                const response = await axios.get(url, options);
                setSongs(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSongs();
    }, []);

    useEffect(() => {
        setIsLoading(true)
        const fetchSongs = async () => {
            const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=New ${title}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'f8f15b92eamsh69750d54920ffb6p11e1b2jsn9c8fab99fa0f',
                    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
                },
            };

            try {
                const response = await axios.get(url, options);
                setTend(response.data.data);

                setTimeout(() => {
                    setIsLoading(false)
                }, 3000)
            } catch (error) {
                console.error(error);
            }
        };

        fetchSongs();
    }, []);
    return (
        <ScrollView style={styles.container}>
            <StatusBar hidden={false} />
            <ShimmerPlaceholder
                visible={!isLoading}
                LinearGradient={LinearGradient}
                shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
                style={{ height: widthPercentageToDP('51%'), width: widthPercentageToDP("101%"), borderRadius: 4, }}
            >
                <View>
                    <Image source={require('../assets/music/y.gif')} style={{ width: widthPercentageToDP("100%"), borderRadius: 4, height: widthPercentageToDP('50%') }} blurRadius={2} />
                    <Text style={{ textAlign: 'center', fontSize: 28, fontWeight: 'bold', top: -widthPercentageToDP("28%"), color: 'white' }}>Discover  New {title}</Text>
                </View>
            </ShimmerPlaceholder>
            <View style={styles.bestContainer}>

                <Text style={styles.text}>Newest {title} </Text>

                <ScrollView horizontal={true}>
                    {tend.map(dat =>
                        <MixCard key={dat.id} title={dat.title} name={dat.artist.name} img={dat.album.cover_medium} stillWait={isLoading} />
                    )}
                </ScrollView>
            </View>
            <View style={styles.bestContainer2}>
                <Text style={styles.text}>Shows You Won't Miss Out</Text>

                <ScrollView horizontal={true}>
                    {songs.map(dat =>
                        <ShowCard key={dat.id} title={dat.title} name={dat.artist.name} img={dat.album.cover_medium} stillWait={isLoading} />
                    )}
                </ScrollView>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    bestContainer: {
        marginTop: 20,
        flex: 1,
        minHeight: 200,
        height: 'auto',
        marginBottom: 120,
        paddingLeft: 20,
    },
    bestContainer2: {
        marginTop: -heightPercentageToDP("8%"),
        flex: 1,
        minHeight: 200,
        height: 'auto',
        marginBottom: 120,
        paddingLeft: 20,
    },
    text: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 5,
    }
})

export default Music;
