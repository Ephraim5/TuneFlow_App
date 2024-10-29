import React from 'react';
import { View, Text,StyleSheet,Image ,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Tending({ data,title, name, img }) {
   const navigation = useNavigation();  

  return (
   <TouchableOpacity onPress={()=>navigation.navigate("artist",{name:name,title,image:img,data:data})}>
    <View style={styles.container}>
       <Image style={{height:160,width:160,borderRadius:20,}} source={{uri:img}} />
        <Text style={styles.text}>{title.length>18?title.slice(18)+'...':title}</Text>
        <Text style={styles.subText} numberOfLines={1}>Show . {name.length>18?name.slice(18)+'...':name}</Text>
     </View>
     </TouchableOpacity>
  );
  
}
const styles= StyleSheet.create({
   container:{
    flex:1,
    overflow:'hidden',
    minHeight:220,
    maxHeight:220,
    minWidth:160,
    marginRight:20
   },
   text:{
    color:'white',
    marginTop:10,
    fontWeight:'800'
   },
   subText:{
    color:'gray',
    marginTop:4,
    fontWeight:'800'
   }
})