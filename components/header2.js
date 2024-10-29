import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const Header2 = () => {
    const [profile, setProfile] = useState(true)
    return (
        <View style={styles.topCont}>
            <View>
                <Text style={styles.text}>Search</Text>
            </View>

            <TouchableOpacity style={styles.touchable}>
                {
                    profile ? (
                        <Text style={{ fontSize: 25,textAlignVertical:'center',textAlign:'center',marginTop:5,marginRight:1, color: 'black', fontWeight: 'bold', textTransform: "uppercase" }}> E </Text>
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
    topCont: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
        paddingRight: 30,
        justifyContent: 'space-between',
    },
    text: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textTransform: 'capitalize',
        marginLeft: 40,
    },
    touchable: {
        borderRadius: 100,
        overflow: 'hidden',
        width: widthPercentageToDP("11%"),
        height: widthPercentageToDP("11%"),
        borderColor: "white",
        borderWidth: 0,
        backgroundColor: 'orange'
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
    },


})

export default Header2;
