import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PlaceItem from './PlaceItem'
import { Colors } from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native'

const PlaceList = ({places}) => {
  const navigation = useNavigation();
  function selectplacehandler(id){
    navigation.navigate("PlaceDetails",{
      placeId: id,
    })
  }
  if(!places || places.length===0){
    return(
      <View style={styles.fallbackcontainer}>
        <Text style={styles.fallbacktext}> NO Places added Yet!</Text>
      </View>
    )
  }
  function renderfunctionhandler(itemdata){
    return <PlaceItem place={itemdata.item} onselect={selectplacehandler}/>
  }
  return (
    <FlatList
    style={styles.list} data={places} keyExtractor={(item)=> item.id} renderItem={renderfunctionhandler}/>
  )
}

export default PlaceList

const styles = StyleSheet.create({
  list:{
    margin:24,
  },
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