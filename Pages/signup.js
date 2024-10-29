import React from 'react';
import { View, StyleSheet, Text, TextInput, Image,Touch, TouchableOpacity } from 'react-native';
import { Fontisto,AntDesign, Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';


const Signup = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <Image source={require('../assets/img/pd.png')} resizeMode='contain' style={styles.logo} />


            <View style={{
                borderRadius: 10,
                height: 60,
                margin: 10,
                top: 110,
                left: 10,
                width: '90%',
                backgroundColor: '#5A5E5E',
                paddingHorizontal: 20,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Fontisto name="email" size={26} color="black" style={{ marginRight: 5, right: 5, }} />
                <TextInput placeholder=' E-Mail Address' style={{
                    fontSize: 18,
                    height: 60,
                    width: '90%',
                    borderRadius: 10,

                }} />
            </View>
            <View style={{
                borderRadius: 10,
                height: 60,
                margin: 10,
                top: 110,
                left: 10,
                width: '90%',
                backgroundColor: '#5A5E5E',
                paddingHorizontal: 20,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <FontAwesome name="phone" size={26} color="black" style={{ marginRight: 5, right: 5, }} />
                <TextInput placeholder=' Phone Number' style={{
                    fontSize: 18,
                    height: 60,
                    width: '90%',
                    borderRadius: 10,

                }} />
            </View>

            <View style={{
                borderRadius: 10,
                height: 60,
                margin: 10,
                top: 110,
                left: 10,
                width: '90%',
                backgroundColor: '#5A5E5E',
                paddingHorizontal: 20,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Feather name="user" size={26} color="black" style={{ marginRight: 5, right: 5, }} />
                <TextInput placeholder=' Username' style={{
                    fontSize: 18,
                    height: 60,
                    width: '90%',
                    borderRadius: 10,

                }} />
            </View>
            <View style={{
                borderRadius: 10,
                height: 60,
                margin: 10,
                top: 110,
                left: 10,
                width: '90%',
                backgroundColor: '#5A5E5E',
                paddingHorizontal: 20,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <MaterialIcons name="password" size={26} style={{ marginRight: 5, right: 5, }} color="black" />
                <TextInput placeholder='  Password ' style={{
                    fontSize: 18,
                    height: 60,
                    width: '90%',
                    borderRadius: 10,

                }} />
            </View>
            <View style={{
                borderRadius: 10,
                height: 60,
                margin: 10,
                top: 110,
                left: 10,
                width: '90%',
                backgroundColor: '#5A5E5E',
                paddingHorizontal: 20,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Fontisto name="locked" style={{ marginRight: 5, right: 5, }} size={26} color="black" />
                <TextInput placeholder='Confirm-Password' style={{
                    fontSize: 18,
                    height: 60,
                    width: '90%',
                    borderRadius: 10,

                }} />
            </View>

            <TouchableOpacity style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 355,
                height: 55,
                borderRadius: 40,
                elevation: 3,
                top: 125,
                left: 25,
                backgroundColor: 'red',
            }}>
                <Text style={{
                    fontSize: 20,
                    lineHeight: 21,
                    fontWeight: 'bold',
                    letterSpacing: 0.25,
                    color: 'white',
                }}> Sign Up</Text>
            </TouchableOpacity>
                <Text style={{color:'gray',fontSize:15, top: 128,left:'45%'}}>Or</Text>
                <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 355,
                height: 55,
                borderRadius: 40,
                elevation: 3,
                flexDirection:'row',
                top: 135,
                left: 25,
                backgroundColor: 'white',
            }}>
                <AntDesign name="google" size={26} style={{right:28,}} color="black" />
                <Text style={{
                    fontSize: 22,
                    lineHeight: 21,
                    fontWeight: 'bold',
                    letterSpacing: 0.25,
                    color: 'black',
                }}>Sign In with Google</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 450,
        height: 150,
        left: -5,
        top: 120,

    }
})

export default Signup;
