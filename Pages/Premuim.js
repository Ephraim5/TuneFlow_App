import React, { useState, useEffect, act } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import Header from '../components/Header';
import Fontisto from '@expo/vector-icons/Fontisto';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Chart from '../chart';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import SubscribeBox from '../components/subscribe';
import FollowLikeBox from '../components/facebook';

const Premium = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 7000);
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ marginBottom: 20, ...styles.subContainer }}>
                <Header />
            </View>
            <ScrollView>
                <View style={{ width: widthPercentageToDP("100%"), height: 190, marginTop: 20, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Text style={{ color: 'white' }}>Total Balance</Text>
                    <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>$0.00</Text>
                    <View style={{ width: '100%', height: 115, backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', gap: 10, paddingLeft: '3.5%', marginTop: 15 }}>
                        <TouchableOpacity style={{ width: 120, backgroundColor: 'transparent', height: '100%', marginLeft: 40 }}>
                            <FontAwesome5 name="arrow-circle-down" size={50} color="white" />
                            <Text style={{ color: 'white', fontWeight: 'bold', }}>Deposit</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 120, backgroundColor: 'transparent', height: '100%' }}>
                            <FontAwesome5 name="arrow-circle-up" size={50} color="white" />
                            <Text style={{ color: 'white', fontWeight: 'bold', }}>   Send</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 120, backgroundColor: 'transparent', height: '100%' }}>
                            <MaterialIcons name="account-circle" size={50} color="white" />
                            <Text style={{ color: 'white', fontWeight: 'bold', }}>Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.first} >
                    <View style={{ paddingLeft: 50, ...styles.mother }}>
                        <Fontisto name="wallet" size={80} color="white" />
                    </View>
                    <View style={styles.mother}>
                        <Text style={{ fontSize: 20, color: 'white', fontWeight: 400, fontStyle: 'italic', marginLeft: 40, marginTop: 5 }}>POINTS</Text>
                        <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold', marginLeft: 20, marginTop: 5 }}><FontAwesome5 name="coins" size={30} color="yellow" /> 90.00</Text>

                    </View>
                </View>
                <Chart />
                <View style={styles.second} >
                    <View style={{ paddingLeft: 35, ...styles.mother }}>
                        <MaterialIcons name="workspace-premium" size={90} color="white" />
                    </View>
                    <View style={styles.mother}>
                        <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold', marginLeft: -24, marginTop: 5, }}> Premium Pro</Text>
                        <TouchableOpacity onPress={() => console.log("navigating to premuim screen")} style={{ width: 170, height: 45, backgroundColor: 'white', position: 'relative', right: 28, top: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}><Text style={{ fontWeight: 'bold', color: 'navy', }}>Upgrade To Premium</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={styles.third} >
                   <SubscribeBox/>
                </View>
                <View style={styles.third} >
                <FollowLikeBox/>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    subContainer: {
        paddingRight: 15,
        paddingLeft: 15,
    },
    first: {
        width: widthPercentageToDP('80%'),
        height: 120,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        backgroundColor: 'red',
        paddingTop: 20,
        marginLeft: widthPercentageToDP('10%'),
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    second: {
        width: widthPercentageToDP('80%'),
        height: 120,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        backgroundColor: 'navy',
        paddingTop: 20,
        marginLeft: widthPercentageToDP('10%'),
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    third: {
        width: widthPercentageToDP('80%'),
        height: 120,
        display: 'flex',
        marginBottom: 15,
        flexDirection: 'row',
        gap: 10,
        backgroundColor: 'transparent',
        paddingTop: 20,
        marginLeft: widthPercentageToDP('10%'),
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mother: {
        width: "50%",
        height: '100%',
        position: 'relative',

    },
    act: {
        paddingRight: 10,
        paddingLeft: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white'
    },
    actDetail: {
        paddingRight: 10,
        paddingLeft: 10,
    },
})

export default Premium;
