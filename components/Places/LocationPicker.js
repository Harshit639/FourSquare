import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OutlinedButton from '../UI/OutlinedButton'
import { Colors } from '../../constants/Colors'

const LocationPicker = () => {

    function getlocationhandler(){

    }
    function picklocationhandler(){

    }
  return (
    <View>
      <View style={styles.mappreview}></View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getlocationhandler}>Locate User</OutlinedButton>
        <OutlinedButton icon="map" onPress={picklocationhandler}>Pick on Map</OutlinedButton>
      </View>
    </View>
  )
}

export default LocationPicker

const styles = StyleSheet.create({
    mappreview:{
        width:'100%',
        height:200,
        marginVertical:8,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: Colors.primary100,
        borderRadius:4,
    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    }
})