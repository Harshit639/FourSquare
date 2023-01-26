import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Allplaces from './screens/Allplaces';
import Addplace from './screens/Addplace';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/Colors';
import Map from './screens/Map';
import { useEffect, useState } from 'react';
import { init } from './utils/Database';
import AppLoading from 'expo-app-loading';
import PlaceDetails from './screens/PlaceDetails';
const Stack = createNativeStackNavigator()
export default function App() {

  const [dbinitialized,setdbisinitialized] = useState(false);

  useEffect(()=>{
    init().then(()=>{
      setdbisinitialized(true);
    }).catch((err)=>{
      console.log(err)
    })
  },[])

  if(!dbinitialized){
    return <AppLoading/>
  }
  
  return (
   <>
   <StatusBar style='dark'/>
   <NavigationContainer>
   <Stack.Navigator screenOptions={{
    headerStyle:{backgroundColor: Colors.primary500},
    headerTintColor: Colors.gray700,
    contentStyle:{backgroundColor:Colors.gray700},
    
   }}>
    <Stack.Screen component={Allplaces} name="AllPlaces" 
    options={({navigation})=>({
      title:"Your Favourite Places",
      headerRight: ({tintColor})=>(
        <IconButton  icon="add" size={24} color={tintColor} onPress={()=>{navigation.navigate('AddPlaces')}}/>
      )})
    }
    />
    <Stack.Screen component={Addplace} name="AddPlaces" 
    options={{
      title:"Add a Place",
    }}/>
    <Stack.Screen component={Map} name="Maps"/>
    <Stack.Screen component={PlaceDetails} name="PlaceDetails" options={{
      title:'Loading Place...'
    }}/>
   </Stack.Navigator>
   </NavigationContainer>
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
