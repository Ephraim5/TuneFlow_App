import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function Favorite({ data, name, img }) {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 6000);
  }, []);
  //data.artist.tracklist
  return (
    <TouchableOpacity onPress={()=>navigation.navigate("artist",{name:name,image:img,data:data})}>
      <View style={styles.container}>
        <ShimmerPlaceholder
          visible={!isLoading}
          LinearGradient={LinearGradient}
          shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
          style={{ height: 160, width: 160, borderRadius: 100 }}
        >
          <Image style={{ height: 160, width: 160, borderRadius: 100, }} source={{ uri: img }} />
        </ShimmerPlaceholder>
        <ShimmerPlaceholder
          visible={!isLoading}
          LinearGradient={LinearGradient}
          shimmerColors={['#4D4D4D', '#333333', '#4D4D4D']}
          style={{ height: 60, width: 160, ...styles.text, borderRadius: 5, }}
        >
          <Text style={styles.subText} numberOfLines={1}>{name}</Text>
        </ShimmerPlaceholder>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    minHeight: 220,
    maxHeight: 220,
    minWidth: 160,
    marginRight: 20
  },
  text: {
    color: 'white',
    marginTop: 10,
    fontWeight: '800'
  },
  subText: {
    color: 'white',
    marginTop: 4,
    fontWeight: '800',
    textAlign:'center',
  }
})