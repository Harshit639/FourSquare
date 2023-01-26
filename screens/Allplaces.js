import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect,useState } from 'react'
import PlaceList from '../components/Places/PlaceList'
import { useIsFocused } from '@react-navigation/native'
import { fetchPlaces } from '../utils/Database'
const Allplaces = ({route}) => {
  const IsFocused= useIsFocused();;
  const [loadedplaces,setloadedplaces] = useState([])
  useEffect(()=>{
    async function isloaded(){
      const places = await fetchPlaces();
      setloadedplaces(places)
      console.log(places)
    }
    if(IsFocused ){
      isloaded();
      // setloadedplaces(currplaces => [...currplaces, route.params.place])
      // console.log(route.params.place)
    }
  },[IsFocused])
  return (
    <PlaceList places={loadedplaces}/>
  )
}

export default Allplaces

const styles = StyleSheet.create({})