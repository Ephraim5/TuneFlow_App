import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SubscribeBox = () => {
  return (
    <View style={{
      width: 300,
      height: 130,
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
      padding: 15,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 6,
      justifyContent: 'space-between',
      marginBottom:15,
    }}>
      {/* Channel Info */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="logo-youtube" size={30} color="#FF0000" />
        <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold', color: '#333' }}>
          Tuneflow Channel
        </Text>
      </View>

      {/* Subscribe Button */}
      <TouchableOpacity style={{
        backgroundColor: '#FF0000',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
      }}>
        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>
          Subscribe
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubscribeBox;
