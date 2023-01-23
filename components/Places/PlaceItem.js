import { StyleSheet, Text, View, Pressable,Image } from 'react-native'
import React from 'react'


const PlaceItem = ({place,onselect}) => {
  return (
    <Pressable onPress={onselect}>
        <Image source={{uri: place.imageUri}}/>
        <View>
            <Text>{place.title}</Text>
            <Text>{place.address}</Text>
        </View>
    </Pressable>
  )
}

export default PlaceItem

const styles = StyleSheet.create({})