import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Modal, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView, ImageBackground, StatusBar } from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import axios from 'axios';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const isTablet = Dimensions.get("screen").width > 725;
const YOUR_RAPIDAPI_KEY = 'f8f15b92eamsh69750d54920ffb6p11e1b2jsn9c8fab99fa0f';

const Play = ({ route, navigation }) => {
  const [isCommentsView, setIsCommentsView] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontLoadError, setFontLoadError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { songId, titleL, artistL, playingSong, list } = route.params;
  const [songEnd, setSongEnd] = useState(false);
  const [songDetails, setSongDetails] = useState(null);
  const [commentsText, setCommentsText] = useState(null);
  const [isLoved, setIsLoved] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const soundRef = useRef(new Audio.Sound());
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [lyrics, setLyrics] = useState("");
  const [isLyricsLoading, setIsLyricsLoading] = useState(true)
  const [songArray, setSongArry] = useState([])

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);
  function handlePresentModal() {
    bottomSheetModalRef.current?.present()
  }
  

  

  useEffect(() => {
    setSongDetails(...playingSong);
    loadFonts();
    fetchSongId(titleL, artistL);
    return () => {
      if (sound !== null) {
        sound.unloadAsync();
      }
    };
  }, []);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        'BlackOpsOne-Regular': require('../assets/fonts/BlackOpsOne-Regular.ttf'),
      });
      setFontsLoaded(true);
    } catch (error) {
      setFontLoadError(error);
    }
  };





  const fetchSongId = async (title, artist) => {
    try {
      const response = await axios.get(`https://api.genius.com/search?q=${encodeURIComponent(title)}%20${encodeURIComponent(artist)}`, {
        headers: {
          'Authorization': `Bearer mJgtRdyaC36scBEaKsScX97daWSIlcTklS9KNBaqEfmUdI-qFX3qwceLcnyvEBQ6`
        }
      });

      if (response.data.response.hits.length > 0) {
        const songId = response.data.response.hits[0].result.id;
        fetchLyrics(songId);
      } else {
        setLyrics("Lyrics not found");
        setIsLyricsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching song ID:', error.response ? error.response.data : error.message);
      setLyrics("Lyrics not found");
      setIsLyricsLoading(false);
    }
  };
  

 
  const fetchLyrics = async (songId) => {
    try {
      const response = await axios.get(`https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${songId}&text_format=plain`, {
        headers: {
          'x-rapidapi-key': 'b6680a3e53msh346831e292f1e71p13a0dfjsnf3cd549109f8',
          'x-rapidapi-host': 'genius-song-lyrics1.p.rapidapi.com'
        }
      });

      if (response.data.lyrics.lyrics.body.plain) {
        setLyrics(response.data.lyrics.lyrics.body.plain);
      } else {
        setLyrics("Lyrics not found");
      }
    } catch (error) {
      console.error('Error fetching lyrics:', error);
      setLyrics("Lyrics not found");
    } finally {
      setIsLyricsLoading(false);
    }
  };
  const playSong = async (song) => {
    if (sound !== null) {
      await sound.unloadAsync();
    }

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
      setSongEnd(status.didJustFinish);

      if (status.didJustFinish && isRepeating) {
        sound.replayAsync();
      }
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

  const toggleLove = () => {
    setIsLoved(!isLoved);
  };

  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const switchView = () => {
    setIsCommentsView(!isCommentsView);
  };

  const renderComments = () => {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', paddingTop: 15 }}>
        <View style={{
          backgroundColor: '#333',
          paddingVertical: 15,
          paddingHorizontal: 25,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 300,
          marginBottom: 10,
        }}>
          <Text style={{
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
            letterSpacing: 0.5,
          }}>
            Create Playlist
          </Text>
        </View>

        <View style={{
          backgroundColor: '#333',
          paddingVertical: 15,
          paddingHorizontal: 25,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 300,
        }}>
          <Text style={{
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
            letterSpacing: 0.5,
          }}>
            Add to Playlist
          </Text>
        </View>

        <ScrollView style={styles.sectionContent}>
          <ShimmerPlaceholder
            isInteraction={true}
            visible={!isLoading}
            LinearGradient={LinearGradient}
            shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
            style={{ height: heightPercentageToDP("80%"), width: widthPercentageToDP("100%"), borderRadius: 5, }}
          >

          </ShimmerPlaceholder>
        </ScrollView>
      </View>
    );
  };

  const renderLyrics = () => {
    return (
      <View style={styles.lyricsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Lyrics", { text: lyrics, songId: songId, image: songDetails.album.cover_big })}>
          <Text style={{ color: "#fff", fontSize: 16, left: widthPercentageToDP("40%"), marginTop: 10, }}>View All</Text>
        </TouchableOpacity>

        <ScrollView style={{ flex: 1, paddingHorizontal: 10, }} >
          <ShimmerPlaceholder
            isInteraction={true}
            visible={!isLoading}
            LinearGradient={LinearGradient}
            shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
            style={{ height: heightPercentageToDP("50%"), width: widthPercentageToDP("100%"), borderRadius: 5, }}
          >
            <Text style={styles.sectionContent}
            // numberOfLines={17}
            // ellipsizeMode="tail"
            >{lyrics}</Text>
          </ShimmerPlaceholder>

        </ScrollView>
      </View>

    );
  };


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider >
        <ImageBackground blurRadius={10} style={{
          top: 0, width: widthPercentageToDP("100%"), flex: 1, opacity: 1, tintColor: 'rgba(0, 0, 0, 0.5)', // This adds a darkening effect
          height: heightPercentageToDP("100%")
        }} source={{ uri: songDetails.album.cover_big }} >
          <View style={styles.overlay} />
          <View style={styles.container}>
            <StatusBar hidden={false} barStyle={"light-content"} />
            <TouchableOpacity style={styles.sp}>
              <Feather name="edit" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.lp}>
              <AntDesign name="arrowleft" size={30} color="white" />
            </TouchableOpacity>
            <Image
              source={{ uri:songDetails.album.cover_big }}
              style={styles.musicImage}
              resizeMode="cover"
            />
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: isTablet ? 30 : 22, color: "white", fontWeight: 'bold' }}>
                {songDetails.title}
              </Text>
              <Text style={{ color: "#fff", fontSize: isTablet ? 20 : 18, fontStyle: 'italic', }}>{songDetails.artist.name}</Text>
            </View>
            <View style={styles.playerControls}>
              <TouchableOpacity onPress={handlePresentModal}>
                <Ionicons name="shuffle" size={30} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleLove}>
                <Ionicons name="heart" size={30} color={isLoved ? "red" : "#fff"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {/* Implement skip back functionality */ }}>
                <Ionicons name="play-skip-back" size={30} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={isPlaying ? pauseSong : () => playSong(songDetails)}>
                <Ionicons name={isPlaying ? "pause-circle" : "play-circle"} size={100} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {/* Implement skip forward functionality */ }}>
                <Ionicons name="play-skip-forward" size={30} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDownload(currentSong.preview, currentSong.title)}>
                <Ionicons name="cloud-download" size={30} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleRepeat}>
                <Ionicons name="repeat" size={30} color={isRepeating ? "red" : "#fff"} />
              </TouchableOpacity>
            </View>

            <Slider
              style={styles.slider}
              value={position / duration || 0}
              onValueChange={onSliderValueChange}
              minimumTrackTintColor="#FF0077"
              maximumTrackTintColor="#ffffff"
              thumbTintColor="#FF0077"
            />
            <Text style={{ fontSize: 12, color: 'white', }}>{formatTime(position)} / {formatTime(duration)}</Text>


            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              enableContentPanningGesture={true}
              backgroundStyle={{ borderRadius: 20, backgroundColor: 'black' }}
              handleIndicatorStyle={{
                backgroundColor: '#ffffff',
                width: isTablet ? widthPercentageToDP("100%") : widthPercentageToDP("100%"),
                height: 4,
                borderRadius: 10,
                alignSelf: 'center',
                marginVertical: 10,
              }}

            >
              <View style={styles.switchContainer}>
                <TouchableOpacity
                  style={[styles.switchButton, !isCommentsView ? styles.activeSwitch : null]}
                  onPress={switchView}
                >
                  <ShimmerPlaceholder
                    visible={!isLyricsLoading}
                    LinearGradient={LinearGradient}
                    shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
                    style={{ width: widthPercentageToDP('99%'), height: '100%', }}
                  >
                    <Text style={[styles.switchText, !isCommentsView ? styles.activeSwitchText : null]}>Lyrics</Text>
                  </ShimmerPlaceholder>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.switchButton, isCommentsView ? styles.activeSwitch : null]}
                  onPress={switchView}
                >
                  <ShimmerPlaceholder
                    visible={!isLyricsLoading}
                    LinearGradient={LinearGradient}
                    shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
                    style={{ width: widthPercentageToDP('99%'), height: '100%', }}
                  >
                    <Text style={[styles.switchText, isCommentsView ? styles.activeSwitchText : null]}>PlayList</Text>
                  </ShimmerPlaceholder>
                </TouchableOpacity>
              </View>

              <View style={styles.bottomContainer}>
                {isCommentsView ? renderComments() : renderLyrics()}
              </View>
            </BottomSheetModal>
          </View>
        </ImageBackground>

      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: '100%',
    height: '100%',
    top: -110,
    paddingRight: 2,
    paddingLeft: 2
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity: 0.6,
  },
  loader: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: "center",
    alignItems: "center",
  },
  musicImage: {
    width: width - (isTablet ? 250 : 150),
    height: width - (isTablet ? 250 : 150),
    borderRadius: 10,
    marginBottom: 20,
    elevation: 10,
  },
  playerControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  sp: {
    left: widthPercentageToDP("40%"),
    top: widthPercentageToDP("10%"),
    zIndex: 400,
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
  lp: {
    right: widthPercentageToDP("42%"),
    bottom: -heightPercentageToDP("2%"),
    zIndex: 400,
  },
  slider: {
    width: '90%',
    marginBottom: 5,
    top: -10,
  },
  switchContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    justifyContent: 'space-around',
    marginTop: 10,
    backgroundColor: "black",
    marginBottom: 10,
  },
  switchButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    borderWidth: 0,
    borderColor: '#CCCCCC',
    width: 100,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  activeSwitch: {
    backgroundColor: '#222',
    borderColor: '#fff',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  switchText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },

  activeSwitchText: {
    color: 'white',
    textAlign: 'center',
  },
  bottomContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,

  },
  commentsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lyricsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContent: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Play;
