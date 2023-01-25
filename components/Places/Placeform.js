import { ScrollView, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Colors } from '../../constants/Colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../UI/Button';
import { Place } from '../../models/Place';


const Placeform = ({oncreateplace}) => {

     const [title,settilte] = useState('');
     const [selectedimage,setiamge]= useState()
     const [pickedlocation,setpickedlocation]= useState();

    function changetexthandler(text){
        settilte(text);
    }
    function onimagetakehandler(imageuri){
        setiamge(imageuri)
    }    
    const onLocationPich= useCallback((pickedlocation)=>{
        setpickedlocation(pickedlocation)
    },[])
    function saveplacehandler(){
        console.log(title)
        console.log(selectedimage)
        console.log(pickedlocation)
        const placeData =  new Place(title,selectedimage,pickedlocation);
        oncreateplace(placeData)
    }
  return (
    <ScrollView style={styles.form}>
        <View>
            <Text style={styles.label}>Title</Text>
            <TextInput onChangeText={changetexthandler} value={title} style={styles.input}/>
        </View>
        <ImagePicker onImageTaken= {onimagetakehandler}/>
        <LocationPicker onLocationPick={onLocationPich}/>
        <Button onPress={saveplacehandler}>Add Place</Button>
    </ScrollView>
  )
}

export default Placeform

const styles = StyleSheet.create({
    form:{
        flex:1,
        padding:24,
    },
    label:{
        fontWeight:'bold',
        marginBottom:4,
        color:Colors.primary500
    },
    input:{
        marginVertical:8,
        paddingHorizontal:4,
        paddingVertical:8,
        fontSize:16,
        borderBottomColor:Colors.primary700,
        borderBottomWidth:2,
        backgroundColor:Colors.primary100,

    }
})