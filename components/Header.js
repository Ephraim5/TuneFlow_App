import React ,{useState}from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import FontAwesome from '@expo/vector-icons/FontAwesome';
const Header = () => {
    const [profile, setProfile] = useState(true)
    return (
        <View style={styles.topCont}>   
            <View>         
            <Text style={styles.text}>TuneFlow App</Text>
           </View>
           <TouchableOpacity style={styles.touchable}>
                {
                    profile ? (
                        <Text style={{ fontSize: 25,textAlignVertical:'center',textAlign:'center',marginTop:5,marginRight:1, color: 'black', fontWeight: 'bold', textTransform: "uppercase" }}> <FontAwesome name="diamond" size={30} color="white" /> </Text>
                    ) : (
                        <Image
                            source={require("../assets/music/2.jpg")}
                            style={styles.profileImage}
                            resizeMode="contain"
                        />)
                }
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    topCont:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:40,
        justifyContent:'space-between',
    },
    text:{
        color:'white',
        fontSize:24,
        fontWeight:'bold',
        marginLeft:10,
    },
    touchable: {
        borderRadius: 100,
        overflow: 'hidden',
        width: widthPercentageToDP("11%"),
        height: widthPercentageToDP("11%"),
        borderColor: "white",
        borderWidth: 0,
        backgroundColor: 'transparent'
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
    },

})

export default Header;
