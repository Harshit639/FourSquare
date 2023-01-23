import { ScrollView, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/Colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';


const Placeform = () => {

     const [title,settilte] = useState('');

    function changetexthandler(text){
        settilte(text);
    }
  return (
    <ScrollView style={styles.form}>
        <View>
            <Text style={styles.label}>Title</Text>
            <TextInput onChangeText={changetexthandler} value={title} style={styles.input}/>
        </View>
        <ImagePicker/>
        <LocationPicker/>
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