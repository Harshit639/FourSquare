import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import OutlinedButton from '../UI/OutlinedButton'
import { Colors } from '../../constants/Colors'
import {getCurrentPositionAsync, useForegroundPermissions,PermissionStatus} from 'expo-location'
import { getAddress, getPreview } from '../../utils/Location'
import { useNavigation, useRoute , useIsFocused} from '@react-navigation/native'
 
const LocationPicker = ({onLocationPick}) => {
    const navigation = useNavigation();
    const route= useRoute();
    const [pickedlocation,setpickedlocation] = useState();
    const IsFocused = useIsFocused()
    const [locationPermissioninformation,requestPermission] = useForegroundPermissions();
   
    useEffect(()=>{
        if(IsFocused && route.params){
            const mappickedlocation =  {lat: route.params.pickedLat , lng: route.params.pickedlng};
            setpickedlocation(mappickedlocation)
            console.log(mappickedlocation)
        }       
    },[IsFocused,route])


    useEffect(()=>{
      async function handleLocation(){
        if(pickedlocation){
          console.log(pickedlocation.lat)
          const address = await getAddress(pickedlocation.lat,pickedlocation.lng)
          // console.log(address)
          onLocationPick({...pickedlocation, address:address});
        }
      }
      handleLocation();
      
     
    },[pickedlocation,onLocationPick])


    async function verifypermission(){
        if(locationPermissioninformation.status===PermissionStatus.UNDETERMINED){
          const permissionresponse = requestPermission();
          return permissionresponse;
        }
        if(locationPermissioninformation.status===PermissionStatus.DENIED){
          Alert("Insufficeint Permissions","You need to grant Location permissions to the app")
          return false;
        }
        return true;
      }

    async function getlocationhandler(){
        const permission = await verifypermission();
        if(!permission){
            return;
        }
        const location = await getCurrentPositionAsync()
        setpickedlocation({
            lat:location.coords.latitude,
            lng:location.coords.longitude
        });
        console.log(location)
    }
    function picklocationhandler(){
        navigation.navigate("Maps")
    }
    let locationpreview = <Text>No Location Picked Yet.</Text>

    if(pickedlocation){
        locationpreview=<Image style={styles.image} source={{uri: getPreview(pickedlocation.lat,pickedlocation.lng)}}/>
    }
  return (
    <View>
      <View style={styles.mappreview}>
        {locationpreview}
      </View>
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
    },
    image:{
        width:"100%",
        height:"100%",
    }
})