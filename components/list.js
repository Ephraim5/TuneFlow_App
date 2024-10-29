import React,{useState} from 'react';
import {View, StyleSheet,Image, Text,  TouchableOpacity} from 'react-native';
import { Entypo } from '@expo/vector-icons';

const List = ({title, img,name}) => {
    const [liked, setLiked] = useState(false);
    const [text, setText] = useState('');

    const handlePress = () => {
      setLiked(!liked);
      if(!liked){
        setText(title)
    }else{
        setText(title)

    }
    };
   
    const [hide, setHide] = useState(true)
    const love = async () => {
        try {
            await sound.loadAsync(require('../sd/pop.mp3'));
            await sound.playAsync();
        } catch (error) {
            console.error('Failed to play sound', error);
        }
        setHide(false)
        setTimeout(async() => {
            sound.unloadAsync(); sound.unloadAsync();
            try {
                await sound.loadAsync(require('../sd/pop.mp3'));
                await sound.playAsync();
            } catch (error) {
                console.error('Failed to play sound', error);
            }
            setHide(true);

        }, 6000)
    }

    return (
        <View  style={styles.container2}>
            <Image style={{height:90,width:90}} source={{uri:img}} />
            <View style={styles.textCont2}>
                <Text style={styles.text2}>{title}</Text>
            </View>
            <View style={styles.textCont2}>
                <TouchableOpacity  onPress={love}>
                <Entypo name="heart"  onPresss={handlePress} size={30} color={!liked ? 'white' : '#FF0077'} />
                </TouchableOpacity>
            </View>
            <View style={styles.textCont2}>
                <TouchableOpacity style={{width:60,height:30,backgroundColor:'#FF0077',borderRadius:20,justifyContent:'center'}}>
                <Text style={{textAlign:'center',...styles.text}}>Play</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container2:{
     minWidth:370,
     maxWidth:510,
     flex:1,
     maxHeight:85,
     backgroundColor:"rgba(51,51,51,0.7)",
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'space-between',
     borderRadius:4,
     overflow:'hidden',
     marginRight:8,
     marginBottom:9,
    },
    textCont2:{
        textAlign:'center',
        width:'20%'
    },
    text2:{
        color:'white',
        fontSize:15,
    }

})

export default List;
