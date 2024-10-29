import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Animated,Keyboard,Dimensions, StyleSheet, Text, View, FlatList, Image, Easing, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import dataG from './data';
import PlayList from '../components/PlayList';
import ShowCard from '../components/ShowCard';
import MixCard from '../components/MixCard';
import Favorite from '../components/Favorite';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import axios from 'axios';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home(navigation) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [isLoading, setIsLoading] = useState(true);
    const [songs, setSongs] = useState([]);
    const [mixes, setMixes] = useState([]);
    const [tend, setTend] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [artistData, setArtistData] = useState([]);
    const [pickedArtists, setPickedArtists] = useState([]);
    const [pickedArtistStar, setPickedArtistStar] = useState([]);
    const [favourite, setShowFavorite] = useState(false);
    const [animation, setAnimation] = useState(false);
    const [opacity, setOpacity] = useState(new Animated.Value(0));
    const [isKeyboardShown, setIsKeyboardShown] = useState(false);
    const  height = Dimensions.get('window').height;
  
    Keyboard.addListener('keyboardWillShow', () => setIsKeyboardShown(true));
    Keyboard.addListener('keyboardWillHide', () => setIsKeyboardShown(false));
  
    const bounceAnimation = () => {
        Animated.sequence([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 1000,
                easing: Easing.bounce,
                useNativeDriver: false,
            }),
            Animated.delay(4000),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 1000,
                easing: Easing.bounce,
                useNativeDriver: false,
            }),
        ]).start(() => setAnimation(false));
    };



    useEffect(() => {
        const checkPickedArtists = async () => {
            const artists = await AsyncStorage.getItem('pickedArtists');
            if (!artists) {
                setIsModalVisible(true);
            } else {
                setPickedArtists(JSON.parse(artists));
                setShowFavorite(true)
            }
        };
        checkPickedArtists();

    }, []);

    useEffect(() => {
        const fetchArtists = async () => {
            const url = `https://api.deezer.com/search/artist`;

            try {
                const response = await axios.get(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    params: {
                        q: searchText || 'a',
                        limit: 12,
                    },
                });
                setArtistData(response.data.data || []);
            } catch (error) {
                console.error(error);
            }
        };

        fetchArtists();
    }, [searchText]);

    const pickArtist = (artist) => {
        if (!pickedArtists.find(a => a.id === artist.id)) {
            setPickedArtists([...pickedArtists, artist]);
            setPickedArtistStar([...pickedArtists, artist]);
        } else {
            var removeArtist = pickedArtists.filter(a => a.id !== artist.id);
            setPickedArtists([...removeArtist]);
            setPickedArtistStar([...removeArtist]);
        }
    };

    const confirmPickedArtists = async () => {
        if (pickedArtists.length > 3) {
            await AsyncStorage.setItem('pickedArtists', JSON.stringify(pickedArtists));
            const artists = await AsyncStorage.getItem('pickedArtists');
            setPickedArtists(JSON.parse(artists));
            setShowFavorite(true)
            setIsModalVisible(false);
        } else {
            setAnimation(true);
            bounceAnimation();
        }
    };

    useEffect(() => {
        const fetchGospelMusic = async () => {
            const options = {
                method: 'GET',
                url: 'https://api.deezer.com/radio/130/tracks',
                headers: {
                    'x-rapidapi-key': 'f8f15b92eamsh69750d54920ffb6p11e1b2jsn9c8fab99fa0f',
                    'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
                },
                params: {
                    limit: 10,
                }
            };

            try {
                const response = await axios.request(options);
                setSongs(response.data.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching gospel music:', error);
                setIsLoading(false);
            }
        };

        fetchGospelMusic();
    }, []);

    useEffect(() => {
        const fetchSongs = async () => {
            const url = `https://api.deezer.com/chart`;

            try {
                const response = await axios.get(url,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        params: {
                            limit: 10,
                            country: "NG",
                        },
                    }
                );
                setMixes(response.data.tracks.data || []);
                setTimeout(() => {
                    setIsLoading(false)
                }, 2000)
            } catch (error) {
                console.error(error);
            }
        };

        fetchSongs();
    }, []);

    useEffect(() => {
        const fetchSongs = async () => {
            const url = `https://api.deezer.com/search`;

            try {
                const response = await axios.get(url,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        params: {
                            limit: 10,
                            q: 'pop rock r&b gospel',
                            country: "NG",
                        },
                    }
                );
                setTend(response.data.data || []);
                setTimeout(() => {
                    setIsLoading(false)
                }, 2000)
            } catch (error) {
                console.error(error);
            }
        };

        fetchSongs();
    }, []);

    const fadeIn = (animatedValue) => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 7000,
            useNativeDriver: true,
        }).start();
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#000', '#000', '#000', '#001', '#000', '#000']}
                start={{ x: -0.1, y: 0.2 }}
                end={{ x: 1, y: 1 }}
                locations={[0.01, 0.2, 0.3, 1, 1, 1]}
            >
                <View style={{ marginBottom: 20, ...styles.subContainer }}>
                    <Header />
                </View>

                <ScrollView style={{paddingBottom:50,marginBottom:100}}>
                    <View style={styles.subContainer} onLayout={() => fadeIn(fadeAnim)}>
                        <Animated.View
                            style={{
                                opacity: fadeAnim,
                                transform: [{ scale: fadeAnim }],
                            }}
                        >
                            <View style={styles.cardContainer}>
                                {dataG.map(dat =>
                                    <PlayList key={dat.id} title={dat.title} navigation={navigation} name={dat.name} img={dat.image} stillWait={isLoading} />
                                )}
                            </View>
                        </Animated.View>

                        <View style={{ marginBottom: 0, ...styles.bestContainer2 }}>
                            <Text style={styles.text}>Top Mixes</Text>
                            <ScrollView horizontal={true}>
                                {mixes.map(dat =>
                                    <MixCard key={dat.id} navigation={navigation} data={dat} title={dat.title} name={dat.artist.name} img={dat.album.cover_medium} stillWait={isLoading} />
                                )}
                            </ScrollView>
                        </View>
                        {
                            (favourite &&
                                <View style={{ marginBottom: 0, ...styles.bestContainer2 }}>
                                    <Text style={styles.text}>Your Favorite Artist</Text>
                                    <ScrollView horizontal={true}>
                                        {pickedArtists.map(dat =>
                                            <Favorite key={dat.id} navigation={navigation} data={dat}  name={dat.name} img={dat.picture_medium} stillWait={isLoading} />
                                        )}
                                    </ScrollView>
                                </View>
                            )
                        }


                        <View style={styles.showContainer}>
                            <Text style={styles.text}>Radio Top Songs</Text>
                            <ScrollView horizontal={true}>
                                {songs.map(dat =>
                                    <ShowCard key={dat.title} data={dat} navigation={navigation} title={dat.title} name={dat.artist.name} img={dat.album.cover_medium} stillWait={isLoading} />
                                )}
                            </ScrollView>
                        </View>

                        <View style={styles.bestContainer}>
                            <Text style={styles.text}>Trending Now</Text>
                            <ScrollView horizontal={true}>
                                {tend.map(dat =>
                                    <MixCard key={dat.id} navigation={navigation} data={dat} title={dat.title} name={dat.artist.name} img={dat.album.cover_medium} stillWait={isLoading} />
                                )}
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>

            <Modal isVisible={isModalVisible} style={styles.modal} backdropOpacity={0.2} backdropColor='#525D65' keyboardVerticalOffset={200} >
                <View style={{...styles.modalContainer,top: height * ( isKeyboardShown ? 0 : 0.09)}}>
                    <Text style={styles.modalTitle}>Choose Your Favorite Artists</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for an artist"
                        placeholderTextColor="#888"
                        onChangeText={text => setSearchText(text)}
                        value={searchText}
                    />

                    <FlatList
                        data={artistData}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => pickArtist(item)} style={styles.artistItem}>
                                <TouchableOpacity style={{ display: pickedArtistStar.find(a => a.id == item.id) ? 'flex' : 'none', position: 'absolute', zIndex: 10, bottom: 50, left: 35, right: 15, top: 40 }} onPress={() => pickArtist(item)}>
                                    <FontAwesome5 name="star-half-alt" size={20} color="white" />
                                </TouchableOpacity>
                                <Image source={{ uri: item.picture_medium }} style={{ ...styles.artistImage, opacity: pickedArtistStar.find(a => a.id == item.id) ? 0.3 : 1, }} />
                                <Text style={styles.artistName}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        horizontal={false}
                        numColumns={3}
                        pagingEnabled={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}
                    />
                    {animation && (
                        <Animated.View style={[{ width: '100%', height: 45, backgroundColor: 'red', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }, {
                            opacity,
                            transform: [{ scale: opacity }]
                        }]}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>Favorite Artist Should be More Than {pickArtist.length} at list 4 or above!</Text>
                        </Animated.View>)}
                    <TouchableOpacity onPress={confirmPickedArtists} style={styles.confirmButton}>
                        <Text style={styles.confirmButtonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: widthPercentageToDP('100%'),
        height: heightPercentageToDP('100%'),
        backgroundColor: "black",
    },
    subContainer: {
        paddingRight: 15,
        paddingLeft: 15,
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 210,
    },
    text: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    bestContainer: {
        marginBottom: 25,
    },
    bestContainer2: {
        marginBottom: 40,
    },
    showContainer: {
        marginBottom: 25,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    modalContainer: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 10,
        width: widthPercentageToDP('93%'),
        height: heightPercentageToDP('70%'),
        alignItems: 'center',

    },
    modalTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        margin: 12,
    },
    searchInput: {
        width: widthPercentageToDP('70%'),
        padding: 15,
        backgroundColor: '#333',
        color: '#fff',
        borderRadius: 10,
        marginBottom: 10,
    },
    artistItem: {
        flexDirection: 'column',
        width: 100,
        height: 120,
        alignItems: 'center',
        margin: 10,
    },
    artistImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginRight: 10,
    },
    artistName: {
        color: '#fff',
        fontSize: 14,
    },
    confirmButton: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        width: 200,
    },
    confirmButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Home;
