import React, { useEffect, useState, useRef, useMemo } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Animated, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { MaterialIcons, Entypo, MaterialCommunityIcons, Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { ArtistStyle } from './ArtistStyle';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import * as Font from 'expo-font';

import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';


const loadFonts = async () => {
  try {
    await Font.loadAsync({
      'BlackOpsOne-Regular': require('../../assets/fonts/BlackOpsOne-Regular.ttf'),
      'Satisfy-Regular': require('../../assets/fonts/Satisfy-Regular.ttf'),
      'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
      'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
      'Poppins-Light': require('../../assets/fonts/Poppins-Light.ttf')
    });
    
  } catch (error) {
    console.log(error)
  }
};

export default function Artist({ route }) {
  const { name, image, title, data } = route.params;
  const [profile, setProfile] = useState(image);
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllTracks, setShowAllTracks] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [sheetInfo, setSheetInfo] = useState({})
  const [open, setOpen] = useState(false)
  const [fontLoadError, setFontLoadError] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const imageOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '95%'], []);
  function handlePresentModal(imageS, titleS, nameS, id, preview) {
    setSheetInfo({ image: imageS, title: titleS, name: nameS, id: id, preview: preview })
    console.log(sheetInfo.id, sheetInfo.preview)
    if (open) {
      bottomSheetModalRef.current?.close();
      setOpen(true)
    } else {
      bottomSheetModalRef.current?.present();
      setOpen(false)
    }
  }
  function handlewAlbum(id) {

  }

  const imageScale = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
  });
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
              q: name,
              country: "NG",
            },
          }
        );
        setTracks(response.data.data || []);
        setTimeout(() => {
          setIsLoading(false)

        }, 4000)
      } catch (error) {
        console.error(error);
      }
    };

    fetchSongs();
  }, []);

  const handleViewMore = () => {
    setShowAllTracks(!showAllTracks);
  };

  const renderTrack = ({ item }) => (
    <View style={ArtistStyle.trackContainer}>
      <Image style={ArtistStyle.trackImage} source={{ uri: item.album.cover_medium }} />
      <View style={ArtistStyle.trackTextContainer}>
        <Text style={ArtistStyle.trackTitle}>{item.title}</Text>
        <Text style={ArtistStyle.trackSubtitle}>{item.artist.name}</Text>
      </View>
      <TouchableOpacity onPress={() => handlePresentModal(item.album.cover_medium, item.title, item.artist.name, item.id, item.preview)}>
        <Entypo name="dots-three-vertical" size={18} color="gray" />
      </TouchableOpacity>
    </View>
  );

  const renderSquareTrack = ({ item }) => (
    <View style={ArtistStyle.squareTrackContainer}>
      <ShimmerPlaceholder
        visible={!isLoading}
        LinearGradient={LinearGradient}
        shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
        style={{ height: 160, width: 160, borderRadius: 10 }}
      >
        <Image style={ArtistStyle.squareTrackImage} source={{ uri: item.album.cover_medium }} />
      </ShimmerPlaceholder>
      <ShimmerPlaceholder
        visible={!isLoading}
        LinearGradient={LinearGradient}
        shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
        style={{ height: 25, width: 160, borderRadius: 10, paddingLeft: 60 }}
      >
        <Text style={{ fontFamily: 'Poppins-Bold', ...ArtistStyle.trackTitle }}>{item.title.length > 8 ? item.title.slice(0, 8) + "..." : item.title}</Text>
      </ShimmerPlaceholder>
    </View>
  );

  const evenTracks = tracks.filter((_, index) => index % 3 === 0);
  const displayedTracks = showAllTracks ? tracks : tracks.slice(0, 5);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider >
        <LinearGradient colors={['#333', '#000', '#000']}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 0.6 }}
          locations={[0.0, 0.3, -0.05]}
          style={ArtistStyle.container}>
          <StatusBar hidden={false} backgroundColor={"#333"} />

          <Animated.FlatList
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            ListHeaderComponent={
              <>
                <View style={ArtistStyle.header}>
                  <Animated.Image resizeMode="contain" style={{ height: heightPercentageToDP("22.5%"), width: widthPercentageToDP("100%"), opacity: imageOpacity, transform: [{ scale: imageScale }], marginTop: 10, ...ArtistStyle.profileImage }} source={{ uri: profile }} />
                  <Entypo name="dots-three-horizontal" size={24} onPress={() => handlePresentModal(profile, title, name, data.id, data.preview)} color="white" style={ArtistStyle.moreIcon} />
                  <Text style={{ color: "white", fontSize: 20, fontFamily: 'Poppins-Bold', textTransform: "uppercase" }}>{title == null || title == '' ? name : title}</Text>
                  <View style={{ width: '100%', height: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                    <Image source={require('../../assets/rr.png')} style={{ height: 30, width: 30, borderRadius: 50 }} />
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>
                      <Text style={{ color: "gray", fontSize: 15, marginTop: 8, fontWeight: "bold" }}>Made For</Text>
                      <Text style={{ color: "white", fontSize: 15, marginTop: 8, fontWeight: "bold" }}> {"Ahitub Ephraim5"}</Text>
                    </View>
                  </View>
                  <View style={ArtistStyle.buttonContainer}>
                    <TouchableOpacity style={{ top: 4, }}>
                      <MaterialCommunityIcons name="download-box" size={35} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ top: 5, }}>
                      <Entypo name="squared-plus" size={35} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ top: 10, }} onPress={() => handlePresentModal(profile, title, name, data.id, data.preview)}>
                      <Entypo name="dots-three-vertical" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: "10%", marginRight: 20, top: 5 }} >
                      <Ionicons name="shuffle" size={40} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={ArtistStyle.playButton}>
                      <MaterialIcons name="play-arrow" size={40} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={ArtistStyle.sectionTitle}>Top Tracks</Text>
              </>
            }
            data={displayedTracks}
            renderItem={renderTrack}
            keyExtractor={(item) => item.id.toString()}
            ListFooterComponent={
              <>
                {!showAllTracks && tracks.length > 5 && (
                  <TouchableOpacity onPress={handleViewMore} style={styles.viewMoreButton}>
                    <Text style={styles.viewMoreText}>View More</Text>
                  </TouchableOpacity>
                )}

                <>
                  <Text style={ArtistStyle.sectionTitle}>Other Tracks</Text>
                  <FlatList
                    data={evenTracks}
                    renderItem={renderSquareTrack}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    scrollEnabled={false}
                  />
                </>

              </>
            }
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            enableContentPanningGesture={true}
            backgroundStyle={{ borderRadius: 20, backgroundColor: '#1e1b1b', borderWidth: 0.2, borderStyle: "solid", borderRightColor: "black", borderLeftColor: "black", borderTopColor: "gray", paddingVertical: 10, }}
            handleIndicatorStyle={{
              backgroundColor: 'gray',
              width: widthPercentageToDP("15%"),
              height: 4,
              borderRadius: 10,
              alignSelf: 'center',
              marginVertical: 10,
            }}

          >
            <View style={{ ...ArtistStyle.trackContainer, backgroundColor: "#1e1b1b", gap: 5, width: "100%", height: 80, padding: 4, borderBottomColor: "gray", borderBottomWidth: 0.5, }}>
              <Image style={ArtistStyle.trackImage} source={{ uri: sheetInfo.image }} />
              <View style={ArtistStyle.trackTextContainer}>
                <Text style={ArtistStyle.trackTitle}>{sheetInfo.title}</Text>
                <Text style={ArtistStyle.trackSubtitle}>{sheetInfo.name}</Text>
              </View>
            </View>
            <ScrollView style={{ flex: 1, paddingHorizontal: 10, }}>
              <TouchableOpacity style={{ width: "100%", height: 60, backgroundColor: "transparent", flexDirection: "row", gap: 10, alignItems: 'center', }}>
                <Ionicons name="diamond" size={30} color="gray" />
                <Text style={{ color: "white", fontSize: 20, }}>Listen to music ads-free</Text>
                <View style={{ flex: 1, alignItems: 'center', width: 130, height: 30, flexDirection: 'row', gap: 5, backgroundColor: 'gray', borderRadius: 15, justifyContent: 'center', padding: 2, }}>
                  <Image source={require('../../assets/rr.png')} style={{ height: 23, width: 23, borderRadius: 50 }} />
                  <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>Premium</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: "100%", height: 60, backgroundColor: "transparent", flexDirection: "row", gap: 10, alignItems: 'center', }}>
                <MaterialIcons name="library-music" size={30} color="gray" />
                <Text style={{ color: "white", fontSize: 20, }}>Add to your library</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: "100%", height: 60, backgroundColor: "transparent", flexDirection: "row", gap: 10, alignItems: 'center', }}>
                <MaterialIcons name="download-for-offline" size={30} color="gray" />
                <Text style={{ color: "white", fontSize: 20, }}>Download</Text>
                <View style={{ alignItems: 'center', flexDirection: 'row', width: 130, height: 30, gap: 5, left: widthPercentageToDP("29.5%"), backgroundColor: 'gray', borderRadius: 15, justifyContent: 'center', padding: 2, }}>
                  <Image source={require('../../assets/rr.png')} style={{ height: 23, width: 23, borderRadius: 50 }} />
                  <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>Premium</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: "100%", height: 60, backgroundColor: "transparent", flexDirection: "row", gap: 10, alignItems: 'center', }}>
                <Ionicons name="person-circle" size={30} color="gray" />
                <Text style={{ color: "white", fontSize: 20, }}>View Artist</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: "100%", height: 60, backgroundColor: "transparent", flexDirection: "row", gap: 10, alignItems: 'center', }}>
                <Image source={require('../../assets/music/love.gif')} style={{ width: 30, borderRadius: 50, height: 30, }} />
                <Text style={{ color: "white", fontSize: 20, }}>Add to Favorite Songs</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: "100%", height: 60, backgroundColor: "transparent", flexDirection: "row", gap: 10, alignItems: 'center', }}>
                <FontAwesome name="plus-circle" size={30} color="gray" />
                <Text style={{ color: "white", fontSize: 20, }}>Add to playlist</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { handlewAlbum(sheetInfo.id) }} style={{ width: "100%", height: 60, backgroundColor: "transparent", flexDirection: "row", gap: 10, alignItems: 'center', }}>
                <MaterialIcons name="album" size={30} color="gray" />
                <Text style={{ color: "white", fontSize: 20, }}>Album</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: "100%", height: 60, backgroundColor: "transparent", flexDirection: "row", gap: 10, alignItems: 'center', }}>
                <FontAwesome5 name="share-alt" size={30} color="gray" />
                <Text style={{ color: "white", fontSize: 20, }}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: "100%", height: 60, backgroundColor: "transparent", flexDirection: "row", gap: 10, alignItems: 'center', }}>
                <Entypo name="info-with-circle" size={30} color="gray" />
                <Text style={{ color: "white", fontSize: 20, }}>Info Recommedations</Text>
              </TouchableOpacity>
            </ScrollView>
            <Text style={{
              color: 'gray',
              fontSize: 12,
              textAlign: "center",
              marginBottom: 10,
            }}>@Powered by TuneFlow</Text>
          </BottomSheetModal>
        </LinearGradient>

      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  viewMoreButton: {
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 40,
  },
  viewMoreText: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },
});
