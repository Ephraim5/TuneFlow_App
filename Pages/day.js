import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import axios from 'axios';

const Day = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem';
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

  const renderItem = ({ item }) => (
    <View style={styles.songItem}>
      <Image 
        source={{ uri: item.album.cover_medium }} 
        style={styles.albumImage} 
      />
      <Text style={styles.songTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={styles.songList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  songList: {
    width: '100%',
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  albumImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  songTitle: {
    fontSize: 18,
  },
});

export default Day;
