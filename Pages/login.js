import React from 'react';
import { View, StyleSheet, Text, TextInput, Image  } from 'react-native';
import { Fontisto, AntDesign, MaterialIcons } from '@expo/vector-icons';

const Login = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'black',paddingTop:100 }}>
            <Image source={require('../assets/img/pd.png')}  resizeMode="contain" style={styles.logo} />


            <View style={{
                borderRadius: 10,
                height: 60,
                margin: 10,
                top: 115,
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
                top: 120,
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
                }}> Login </Text>
            </View>
            <Text style={{ color: 'white', fontSize: 20, top: 130, left: '45%' }}>Or</Text>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 355,
                height: 55,
                borderRadius: 40,
                elevation: 3,
                flexDirection: 'row',
                top: 135,
                left: 25,
                backgroundColor: 'white',
            }}>
                <AntDesign name="google" size={26} style={{ right: 28, }} color="black" />
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
        width: 460,
        height: 160,
        left: -5,
        top: 120,

    }
})

export default Login;
