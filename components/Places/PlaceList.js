import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PlaceItem from './PlaceItem'
import { Colors } from '../../constants/Colors'

const PlaceList = ({places}) => {
  if(!places || places.lengh==0){
    return(
      <View style={styles.fallbackcontainer}>
        <Text style={styles.fallbacktext}> NO Places added Yet!</Text>
      </View>
    )
  }
  function renderfunctionhandler(item){
    return <PlaceItem place={item}/>
  }
  return (
    <FlatList data={places} keyExtractor={(item)=> item.id} renderItem={renderfunctionhandler}/>
  )
}

export default PlaceList

const styles = StyleSheet.create({
  fallbackcontainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',

  },
  fallbacktext:{
    fontSize:16,
    color:Colors.primary200
  }
})