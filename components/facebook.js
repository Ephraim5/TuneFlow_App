import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const FollowLikeBox = () => {
  return (
    <View style={{
      width: 300,
      height: 130,
      backgroundColor: '#f0f2f5',
      borderRadius: 10,
      padding: 15,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 6,
      justifyContent: 'space-between',
    }}>
      {/* Page Info */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome name="facebook-square" size={30} color="#4267B2" />
        <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold', color: '#333' }}>
          Tuneflow Page
        </Text>
      </View>

      {/* Follow and Like Buttons */}
      <TouchableOpacity style={{
        backgroundColor: '#4267B2',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
      }}>
        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>
          Follow & Like
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FollowLikeBox;
