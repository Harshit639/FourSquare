import { useNavigation } from '@react-navigation/native';
import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import IconButton from '../components/UI/IconButton';
import {PROVIDER_GOOGLE} from 'react-native-maps'
function Map({route}) {
  const initiallocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng
  }
  const [selectedLocation, setSelectedLocation] = useState(initiallocation);
  const navigation = useNavigation();

  const region = {
    latitude: initiallocation? initiallocation.lat: 37.78,
    longitude:  initiallocation? initiallocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    if(initiallocation){
      return ;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }
  

  const savedpicklocationhandler = useCallback(() => {
    if(!selectedLocation){
        Alert.alert("No location picked", "Please pick a location by tapping on the map")
        return;
    }
    navigation.navigate('AddPlaces' ,{pickedLat: selectedLocation.lat , pickedlng: selectedLocation.lng})

  },[navigation,selectedLocation]);
  useLayoutEffect(()=>{
    if(initiallocation){
      return;
    }
    navigation.setOptions({
        headerRight:({tintcolor})=> <IconButton icon="save" size={24} color={tintcolor} onPress={savedpicklocationhandler}/>
    })
  },[navigation,savedpicklocationhandler])

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      provider={PROVIDER_GOOGLE}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});