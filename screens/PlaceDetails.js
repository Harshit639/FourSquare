import { ScrollView, StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import OutlinedButton from '../components/UI/OutlinedButton'
import { Colors } from '../constants/Colors'
import { fetchPlacesDetails } from '../utils/Database'

const PlaceDetails = ({route,navigation}) => {
    const [fetchedplace,setfetchedplace] = useState();
    function showonmaphandler(){
        navigation.navigate('Maps',{
            initialLat: fetchedplace.location.lat ,
            initialLng: fetchedplace.location.lng
        })
    }

    const selectedplaceid = route.params.placeId;
    useEffect(()=>{
        async function loadedplaces(){
            const place = await fetchPlacesDetails(selectedplaceid)
            setfetchedplace(place)
            navigation.setOptions({
                title:place.title,
            })
        }
        loadedplaces()
    },[selectedplaceid])

    if(!fetchedplace){
        return (
        <View style={styles.fallback}>
            <Text> Loading place data ...</Text>
        </View>)
    }
  return (
    <ScrollView>
        <Image style={styles.image} source={{uri: fetchedplace.imageUri}}/>
        <View style={styles.locationcontainer}>
            <View style={styles.addresscontainer}>
            <Text style={styles.address}>{fetchedplace.address}</Text>
            </View>
            <OutlinedButton icon="map" onPress={showonmaphandler} >View on Map</OutlinedButton>
        </View>
        
    </ScrollView>
  )
}

export default PlaceDetails

const styles = StyleSheet.create({
    screen:{
        alignItems:'center'
    },
    image:{
        height:'35%',
        minHeight:300,
        width:"100%",
    },
    addresscontainer:{
        padding:20,
    },
    locationcontainer:{
        justifyContent:'center',
        alignItems:'center',
    },
    address:{
        color:Colors.primary500,
        textAlign:'center',
        fontWeight:'bold',
        fontSize:16,
    },
    fallback:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})