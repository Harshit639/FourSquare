import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect,useState } from 'react'
import PlaceList from '../components/Places/PlaceList'
import { useIsFocused } from '@react-navigation/native'
const Allplaces = ({route}) => {
  const IsFocused= useIsFocused();;
  const [loadedplaces,setloadedplaces] = useState([])
  useEffect(()=>{
    if(IsFocused && route.params){
      setloadedplaces(currplaces => [...currplaces, route.params.place])
      console.log(route.params.place)
    }
  },[IsFocused,route])
  return (
    <PlaceList places={loadedplaces}/>
  )
}

export default Allplaces

const styles = StyleSheet.create({})