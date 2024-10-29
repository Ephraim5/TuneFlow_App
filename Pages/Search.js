import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, FlatList, TextInput, TouchableOpacity, Keyboard, Dimensions, } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import Slider from '@react-native-community/slider';
import Header2 from '../components/header2';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';



const loadFonts =  async () => {
    await Font.loadAsync({
        'BlackOpsOne-Regular': require('../assets/fonts/BlackOpsOne-Regular.ttf'),
    });
};

const Search = ({ navigation }) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [fontLoadError, setFontLoadError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const [atom, setAtom] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSearched, setIsSearch] = useState(false)
    const [isListToPlay, setIsListToPlay] = useState([])

    const isTablet = Dimensions.get("screen").width > 725;
    const [yes, setYes] = useState(false)
    //download btn
    useEffect(()=>{
        if(searchQuery == null || searchQuery == ""){
            setTimeout(()=>{
              setIsLoading(false)
            },4000)
        }else{
            console.log("searching is in process...")
        }
       },[])

    useEffect(() => {
        (async () => {
            try {
                await loadFonts();
                setFontsLoaded(true);
            } catch (error) {
                setFontLoadError(error);
            }

        })();

    }, []);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardVisible(true);
            navigation.setOptions({ tabBarVisible: false });
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardVisible(false);
            navigation.setOptions({ tabBarVisible: true });
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [navigation]);



    const fetchSongs = async (query) => {
        setIsLoading(true);
        quered = query;
        quered == '' ? setYes(false) && quered=='' : setYes(true) && quered==quered;
        const queryParam = quered;
        const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${queryParam}&limit=40`;
        const options = {
            headers: {
                'x-rapidapi-key': 'f8f15b92eamsh69750d54920ffb6p11e1b2jsn9c8fab99fa0f',
                'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
              }
        };

        try {
            const response = await axios.get(url, options);
            setSearchResults(response.data.data);
            setIsListToPlay(response.data.data.slice(0, 7));
            setIsSearch(false)
        } catch (error) {
            console.error('Error fetching songs:', error);
            setSearchResults([]);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
                setIsSearch(true)
            }, 1000)
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        fetchSongs(query);
    };
   


    const handleToPlayScreen = ({ artistL, songId, titleL, list,preview }) => {
        console.log(artistL)
        isListToPlay.forEach(element => {
            if (element.artist.name == artistL) {
                setIsListToPlay([...isListToPlay])
            } else {
                setIsListToPlay([...isListToPlay, list])
            }
        });
        navigation.navigate("PLayMusic", { artistL, songId, titleL, playingSong: list, list: isListToPlay,preview })
    }
    const SearchHead = () => {
        return (
            <ShimmerPlaceholder
                visible={!isLoading}
                LinearGradient={LinearGradient}
                shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
                style={{ width: widthPercentageToDP('95%'), height: 300, }}
            >
                <View style={{ display: 'flex', padding: 0, marginBottom: 10, alignItems: 'center', justifyContent: 'space-between', width: widthPercentageToDP('95%'), height: 300, backgroundColor: '#020531', left: - widthPercentageToDP("2%"), borderRadius: 10, }}>

                    <Image source={require("../assets/music/e1.jpg")} resizeMode='contain' style={{ width: '100%', height: 300, top: -20, }} />
                    <TouchableOpacity style={{ width: 120, height: 40, backgroundColor: 'black', borderRadius: 5, justifyContent: 'center', top: -50, alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>Earn Money</Text>
                    </TouchableOpacity>
                </View>
            </ShimmerPlaceholder>
        )
    }
    const SearchEnd = () => {
        return (
            <ShimmerPlaceholder
                visible={!isLoading}
                LinearGradient={LinearGradient}
                shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
                style={{ width: widthPercentageToDP('95%'), height: 300, }}
            >
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: widthPercentageToDP('95%'), height: 300, backgroundColor: '#456300', left: - widthPercentageToDP("2%"), borderRadius: 10, }}>
                    <Image source={require("../assets/music/e2.jpg")} resizeMode='contain' style={{ width: '100%', height: 300, }} />
                </View>
            </ShimmerPlaceholder>
        )
    }
    const SearchBody = () => {
        return (
            <View style={{ flex: 1, marginBottom:70,width: widthPercentageToDP('100%'), display: 'flex', flexDirection: 'row', gap: widthPercentageToDP("2.05%"), flexWrap: 'wrap', padding: 10, height: heightPercentageToDP('54%'), backgroundColor: 'transparent', left: - widthPercentageToDP("5%"), borderRadius: 20, }} >

                <TouchableOpacity style={{ opacity: 1 }} onPress={() => navigation.navigate("Music",{title:"Music"})}>
                    <ShimmerPlaceholder
                        visible={!isLoading}
                        isInteraction={true}
                        LinearGradient={LinearGradient}
                        shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
                        style={{ height: 110, width: 190, borderRadius: 5, }}
                    >
                        <View style={{
                            width: 190,
                            height: 110,
                            backgroundColor: '#ff00ff',
                            borderRadius: 5,
                            padding: 10,
                            overflow: 'hidden',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                color: "white",
                                fontWeight: '700',
                                fontSize: 20,
                                top: -20,
                            }}>
                                Music
                            </Text>
                            <Image
                                source={require('../assets/music/1.jpg')}
                                style={{
                                    width: 85,
                                    height: 85,
                                    position: 'absolute',
                                    bottom: 6,
                                    right: -24,
                                    transform: [{ rotate: '25deg' }],
                                    borderRadius: 5
                                }}
                            />
                        </View>
                    </ShimmerPlaceholder>

                </TouchableOpacity>
                <TouchableOpacity style={{ opacity: 1 }} onPress={() => navigation.navigate("Music",{title:"Gospel"})}>
                    <ShimmerPlaceholder
                        isInteraction={true}
                        visible={!isLoading}
                        LinearGradient={LinearGradient}
                        shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
                        style={{ height: 110, width: 190, borderRadius: 5, }}
                    >
                        <View style={{
                            width: 190,
                            height: 110,
                            backgroundColor: '#04531e',
                            borderRadius: 5,
                            padding: 10,
                            overflow: 'hidden',
                            justifyContent: 'center',
                        }}>
                            <Text style={{
                                color: "white",
                                fontWeight: '700',
                                fontSize: 20,
                                top: -20,
                            }}>
                                Gospel
                            </Text>
                            <Image
                                source={require('../assets/music/4.jpg')}
                                style={{
                                    width: 85,
                                    height: 85,
                                    position: 'absolute',
                                    bottom: 6,
                                    right: -24,
                                    transform: [{ rotate: '25deg' }],
                                    borderRadius: 5
                                }}
                            />
                        </View>
                    </ShimmerPlaceholder>
                </TouchableOpacity>
                <TouchableOpacity style={{ opacity: 1 }} onPress={() => navigation.navigate("Music",{title:"Jazz"})}>
                    <ShimmerPlaceholder
                        isInteraction={true}
                        visible={!isLoading}
                        LinearGradient={LinearGradient}
                        shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
                        style={{ height: 110, width: 190, borderRadius: 5 }}
                    >
                        <View style={{
                            width: 190,
                            height: 110,
                            backgroundColor: '#0d0087',
                            borderRadius: 5,
                            padding: 10,
                            overflow: 'hidden',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                color: "white",
                                fontWeight: '700',
                                fontSize: 20,
                                top: -20,
                            }}>
                                Jazz
                            </Text>
                            <Image
                                source={require('../assets/music/7.jpg')}
                                style={{
                                    width: 85,
                                    height: 85,
                                    position: 'absolute',
                                    bottom: 6,
                                    right: -24,
                                    transform: [{ rotate: '25deg' }],
                                    borderRadius: 5
                                }}
                            />
                        </View>
                    </ShimmerPlaceholder>
                </TouchableOpacity>
                <TouchableOpacity style={{ opacity: 1 }} onPress={() => navigation.navigate("Music",{title:"Hip Hop"})}>
                    <ShimmerPlaceholder
                        isInteraction={true}

                        visible={!isLoading}
                        LinearGradient={LinearGradient}
                        shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
                        style={{ height: 110, width: 190, borderRadius: 5, }}
                    >
                        <View style={{
                            width: 190,
                            height: 110,
                            backgroundColor: '#1a009d',
                            borderRadius: 5,
                            padding: 10,
                            overflow: 'hidden',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                color: "white",
                                fontWeight: '700',
                                fontSize: 20,
                                top: -20,
                            }}>
                                Hip Hop
                            </Text>
                            <Image
                                source={require('../assets/music/8.jpg')}
                                style={{
                                    width: 85,
                                    height: 85,
                                    position: 'absolute',
                                    bottom: 6,
                                    right: -24,
                                    transform: [{ rotate: '25deg' }],
                                    borderRadius: 5
                                }}
                            />
                        </View>
                    </ShimmerPlaceholder>
                </TouchableOpacity>
                <TouchableOpacity style={{ opacity: 1 }} onPress={() => navigation.navigate("Music",{title:"Soul Music"})}>
                    <ShimmerPlaceholder
                        isInteraction={true}

                        visible={!isLoading}
                        LinearGradient={LinearGradient}
                        shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
                        style={{ height: 110, width: 190, borderRadius: 5, }}
                    >
                        <View style={{
                            width: 190,
                            height: 110,
                            backgroundColor: '#0ce7e7',
                            borderRadius: 5,
                            padding: 10,
                            overflow: 'hidden',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                color: "white",
                                fontWeight: '700',
                                fontSize: 20,
                                top: -20,
                            }}>
                                Soul
                            </Text>
                            <Image
                                source={require('../assets/music/6.jpg')}
                                style={{
                                    width: 85,
                                    height: 85,
                                    position: 'absolute',
                                    bottom: 6,
                                    right: -24,
                                    transform: [{ rotate: '25deg' }],
                                    borderRadius: 5
                                }}
                            />
                        </View>
                    </ShimmerPlaceholder>
                </TouchableOpacity>
                <TouchableOpacity style={{ opacity: 1 }} onPress={() => navigation.navigate("Music",{title:"Pop Music"})}>
                    <ShimmerPlaceholder
                        isInteraction={true}

                        visible={!isLoading}
                        LinearGradient={LinearGradient}
                        shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
                        style={{ height: 110, width: 190, borderRadius: 5, }}
                    >
                        <View style={{
                            width: 190,
                            height: 110,
                            backgroundColor: '#e7670c',
                            borderRadius: 5,
                            padding: 10,
                            overflow: 'hidden',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                color: "white",
                                fontWeight: '700',
                                fontSize: 20,
                                top: -20,
                            }}>
                                Pop
                            </Text>
                            <Image
                                source={require('../assets/music/2.jpg')}
                                style={{
                                    width: 85,
                                    height: 85,
                                    position: 'absolute',
                                    bottom: 6,
                                    right: -24,
                                    transform: [{ rotate: '25deg' }],
                                    borderRadius: 5
                                }}
                            />
                        </View>
                    </ShimmerPlaceholder>
                </TouchableOpacity>
                <TouchableOpacity style={{ opacity: 1 }} onPress={() => navigation.navigate("Music",{title:"Electronic Music"})}>
                    <ShimmerPlaceholder
                        isInteraction={true}
                        visible={!isLoading}
                        LinearGradient={LinearGradient}
                        shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
                        style={{ height: 110, width: 190, borderRadius: 5, }}
                    >
                        <View style={{
                            width: 190,
                            height: 110,
                            backgroundColor: '#0b001a',
                            borderRadius: 5,
                            padding: 10,
                            overflow: 'hidden',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                color: "white",
                                fontWeight: '700',
                                fontSize: 20,
                                top: -20,
                            }}>
                                Electronic
                            </Text>
                            <Image
                                source={require('../assets/music/3.jpg')}
                                style={{
                                    width: 85,
                                    height: 85,
                                    position: 'absolute',
                                    bottom: 6,
                                    right: -24,
                                    transform: [{ rotate: '25deg' }],
                                    borderRadius: 5
                                }}
                            />
                        </View>
                    </ShimmerPlaceholder>
                </TouchableOpacity>
                <TouchableOpacity style={{ opacity: 1 }} onPress={() => navigation.navigate("Music",{title:"Blues"})}>
                    <ShimmerPlaceholder
                        isInteraction={true}

                        visible={!isLoading}
                        LinearGradient={LinearGradient}
                        shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
                        style={{ height: 110, width: 190, borderRadius: 5, }}
                    >
                        <View style={{
                            width: 190,
                            height: 110,
                            backgroundColor: '#ff0000',
                            borderRadius: 5,
                            padding: 10,
                            overflow: 'hidden',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                color: "white",
                                fontWeight: '700',
                                fontSize: 20,
                                top: -20,
                            }}>
                                Blues
                            </Text>
                            <Image
                                source={require('../assets/music/5.jpg')}
                                style={{
                                    width: 85,
                                    height: 85,
                                    position: 'absolute',
                                    bottom: 6,
                                    right: -24,
                                    transform: [{ rotate: '25deg' }],
                                    borderRadius: 5
                                }}
                            />
                        </View>
                    </ShimmerPlaceholder>
                </TouchableOpacity>
                <TouchableOpacity style={{ opacity: 1 }} onPress={() => navigation.navigate("Music",{title:"Devido"})}>
                    <ShimmerPlaceholder
                        isInteraction={true}

                        visible={!isLoading}
                        LinearGradient={LinearGradient}
                        shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
                        style={{ height: 110, width: 190, borderRadius: 5, }}
                    >
                        <View style={{
                            width: 190,
                            height: 110,
                            backgroundColor: '#ff0000',
                            borderRadius: 5,
                            padding: 10,
                            overflow: 'hidden',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                color: "white",
                                fontWeight: '700',
                                fontSize: 20,
                                top: -20,
                            }}>
                                Devido 
                            </Text>
                            <Image
                                source={require('../artist/7.jpg')}
                                style={{
                                    width: 85,
                                    height: 85,
                                    position: 'absolute',
                                    bottom: 6,
                                    right: -24,
                                    transform: [{ rotate: '25deg' }],
                                    borderRadius: 5
                                }}
                            />
                        </View>
                    </ShimmerPlaceholder>
                </TouchableOpacity>
                <TouchableOpacity style={{ opacity: 1 }} onPress={() => navigation.navigate("Music",{title:"Spotlite Nation"})}>
                    <ShimmerPlaceholder
                        isInteraction={true}

                        visible={!isLoading}
                        LinearGradient={LinearGradient}
                        shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
                        style={{ height: 110, width: 190, borderRadius: 5, }}
                    >
                        <View style={{
                            width: 190,
                            height: 110,
                            backgroundColor: '#ff0000',
                            borderRadius: 5,
                            padding: 10,
                            overflow: 'hidden',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                color: "white",
                                fontWeight: '700',
                                fontSize: 20,
                                top: -20,
                            }}>
                                Spotlite Nation 
                            </Text>
                            <Image
                                source={require('../artist/11.jpg')}
                                style={{
                                    width: 85,
                                    height: 85,
                                    position: 'absolute',
                                    bottom: 6,
                                    right: -24,
                                    transform: [{ rotate: '25deg' }],
                                    borderRadius: 5
                                }}
                            />
                        </View>
                    </ShimmerPlaceholder>
                </TouchableOpacity>

            </View>
        )
    }

    return (
        <View style={styles.container}>

            <StatusBar hidden={true} />
            <View style={{ top: 0, backgroundColor: 'black', width: wp('100%'), height: hp("17%"), padding: 3, zIndex: 300 }}>
                <Header2 />
                <ShimmerPlaceholder
                    visible={!isLoading}
                    LinearGradient={LinearGradient}
                    shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
                    style={{ width: '98%', height: 85, bottom: -10, borderRadius: 5, }}
                >
                    <View style={styles.searchContainer}>
                        <Ionicons name="search-sharp" size={25} color="gray" style={styles.searchIcon} />
                        <TextInput
                            placeholder="Search Songs..."
                            style={styles.searchInput}
                            placeholderTextColor="gray"
                            value={searchQuery}
                            onChangeText={handleSearch}
                        />
                    </View>
                </ShimmerPlaceholder>
            </View>
         
            <View style={{ width: widthPercentageToDP("100%"), height: 40, }}></View>
            <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => console.log("loading...")}>
                        <ShimmerPlaceholder
                            visible={isSearched}
                            LinearGradient={LinearGradient}
                            shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
                            style={{
                                width: wp("90%"),
                                height: 120,
                                borderRadius: 10,
                                marginBottom: 18,
                            }}
                        >
                            <View style={styles.resultItem}>
                                <TouchableOpacity onPress={handleToPlayScreen({ songId: item.id, artistL: item.artist.name, titleL: item.title, list: item,preview:item.preview })}>
                                    <Image source={{ uri: item.album.cover_big ? item.album.cover : 'https://via.placeholder.com/150' }} style={styles.resultImage} />
                                </TouchableOpacity>

                                <View style={styles.resultTextContainer}>
                                    <Text style={styles.resultTitle}>{item.title}</Text>
                                    <Text style={styles.resultArtist}>{item.artist.name}</Text>
                                </View>
                                {currentSong?.id === item.id && isPlaying ? (
                                    <TouchableOpacity onPress={pauseSong}>
                                        <Ionicons name="pause-circle" size={40} color="white" style={styles.playIcon} />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => playSong(item)}>
                                        <Ionicons name="play-circle" size={40} color="white" style={styles.playIcon} />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </ShimmerPlaceholder>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                    <View style={{ flex: 1, padding: 0, width: widthPercentageToDP("100%"), zIndex: -10, height: heightPercentageToDP("175%"), top: isTablet ? 0 : 0, top: -10, }}>

                        <Text style={{ color: "white", fontSize: 25, fontWeight: "bold", top: 24, marginBottom: 30 }}>Browse all</Text>
                        <SearchBody />

                        <Text style={{ color: "white", fontSize: 25, fontWeight: "bold", top: 24, marginBottom: 34 }}>Explore And Earn</Text>
                        <SearchHead />
                        <Text style={{ color: "white", fontSize: 25, fontWeight: "bold", top: 24, marginBottom: 34 }}>Refer Friends and Earn</Text>
                        <SearchEnd />

                    </View>
                )}
                contentContainerStyle={styles.resultListContainer}
                bounces={true}
                scrollEnabled={true}
            />
            {currentSong && (
                <View style={{ ...styles.bottomContainer, top: isTablet ? hp('84.5%') : hp('80%') }}>
                    <TouchableOpacity onPress={() => handleToPlayScreen({ songId: currentSong.id, artistL: currentSong.artist.name, titleL: currentSong.title, list:currentSong,preview:currentSong.preview })}>
                        <Image source={{ uri: currentSong.album.cover_medium }} style={styles.bottomImage} />
                    </TouchableOpacity>

                    <View style={styles.bottomTextContainer}>
                        <Text style={{ ...styles.bottomTitle, fontSize: isTablet ? 14 : 10, top: 5, }}>{currentSong.title.slice(0, currentSong.title.indexOf(' '))}</Text>
                        <Text style={{ ...styles.bottomArtist, fontSize: isTablet ? 14 : 9, top: 5 }}>{currentSong.artist.name}</Text>
                    </View>
                    <View style={{ flex: 1, }}>
                        <Slider
                            style={{ ...styles.slider, top: isTablet ? 8 : -1, width: isTablet ? wp('54%') : wp('40%') }}
                            value={position / duration || 0}
                            onValueChange={onSliderValueChange}
                            minimumTrackTintColor="orange"
                            maximumTrackTintColor="#8E8E93"
                            thumbTintColor="orange"
                        />

                        <Text style={{ fontSize: 10, color: 'gray', left: isTablet ? wp('60%') : wp('40%'), top: isTablet ? -22 : -28, }}>{formatTime(position)} / {formatTime(duration)}</Text>
                    </View>

                    <TouchableOpacity onPress={() => handleDownload(currentSong.preview, currentSong.title)} >
                        <MaterialCommunityIcons name="download-circle" size={isTablet ? 40 : 25} color="white" style={{ ...styles.playIcon, display: isTablet ? 'flex' : 'flex' }} />
                    </TouchableOpacity>
                    {isPlaying ? (
                        <TouchableOpacity onPress={pauseSong}>
                            <Ionicons name="pause-circle" size={isTablet ? 40 : 25} color="white" style={styles.playIcon} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => playSong(atom)}>
                            <Ionicons name="play-circle" size={isTablet ? 40 : 25} color="white" style={styles.playIcon} />
                        </TouchableOpacity>

                    )}
                </View>
            )}
        </View>

    );


};

const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const styles = StyleSheet.create({
    loader: {
        backgroundColor: 'black',
        flex: 1,
        width: wp('100%'),
        height: hp('100%'),
        justifyContent: 'center',
        alignItems: 'center',

    },
    container: {
        flex: 1,
        backgroundColor: 'black',
        width: wp('100%'),
        height: hp('100%')
    },
    slider: {
        height: 40,
        left: -1,
    },

    userIconContainer: {
        width: 65,
        height: 65,
        borderRadius: 32.5,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#121212',
        zIndex: 300,
        height: 70,
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        marginTop: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        color: '#fff',
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 20,
    },
    resultListContainer: {
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    resultItem: {
        width: wp("90%"),
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: "rgba(22, 22, 22, 1)",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        paddingRight: widthPercentageToDP("11%"),
        paddingTop: widthPercentageToDP("4%"),
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 3.84,
        elevation: 12,
    },
    resultImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    resultTextContainer: {
        flex: 1,
        marginLeft: 15,
    },
    resultTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultArtist: {
        color: 'gray',
        fontSize: 14,
    },
    playIcon: {
        marginLeft: 'auto',
        top: 5,
    },
    loadingContainer: {
        backgroundColor: 'black',
        flex: 1,
        width: wp('100%'),
        height: hp('100%'),
        justifyContent: 'center',
        alignItems: 'center',

    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
    },
    emptyText: {
        fontSize: 16,
        color: 'gray',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 150,
        borderRadius: 10,
        backgroundColor: 'black',
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    bottomImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    bottomTextContainer: {
        marginLeft: 10,
    },
    bottomTitle: {
        color: 'white',
    },
    bottomArtist: {
        color: 'gray',
        fontSize: 13,
    },
    desc: {
        fontSize: 16,
        lineHeight: 24,
        opacity: 0.7,
        color: "white",
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 1,
        marginBottom: 12,
        color: "white",
    },
    card: {
        width: "90%",
        padding: 20,
        backgroundColor: "black",
        borderRadius: 8,
        color: 'white',
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 200,

    },
    text: {
        fontWeight: "600",
        fontSize: 16,
        color: "white",
    },
    button: {
        width: "90%",
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        height: 56,
        borderRadius: 8,
    },
});

export default Search;
