import React from 'react';
import { StyleSheet, View, Text, ScrollView,TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons, Feather ,AntDesign} from '@expo/vector-icons';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const Lyrics = ({ navigation, route }) => {
    const { text, songId,image } = route.params;
    return (
        <View style={{ flex: 1, backgroundColor: "black" }}>
            <ImageBackground style={{width:widthPercentageToDP("100%"),flex:1,opacity:1,height:heightPercentageToDP("100%")}} source={{uri:image}} blurRadius={10}/>
            <TouchableOpacity style={{top:100,left:20}} onPress={() => navigation.navigate("PLayMusic", { songId: songId })} >
                <AntDesign name="arrowleft" size={30} color="white" />
            </TouchableOpacity>
           
            <Text style={{ color: "#fff", alignSelf: "center",fontWeight:"bold", marginTop: 80,marginBottom:10, fontSize: 30 }}>LYRICS VIEW</Text>
            <ScrollView style={{marginTop:20,}}>
                <Text style={styles.ly}>{text}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    ly: {
        fontSize: 35,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        top: -2,
    }
})

export default Lyrics;
