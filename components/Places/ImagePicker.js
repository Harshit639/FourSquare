import { Alert, Button, StyleSheet, Text, View,Image } from 'react-native'
import React ,{useState}from 'react'
import {launchCameraAsync,useCameraPermissions,PermissionStatus} from 'expo-image-picker'

import { Colors } from '../../constants/Colors';
import OutlinedButton from '../UI/OutlinedButton';
const ImagePicker = ({onImageTaken}) => {
  const [camerapermissionoption,requestPermission] = useCameraPermissions();
  const [pickedimage,setpickedimage] = useState();
  async function verifypermission(){
    if(camerapermissionoption.status===PermissionStatus.UNDETERMINED || camerapermissionoption.status===PermissionStatus.DENIED ){
      const permissionresponse = requestPermission();
      return permissionresponse;
    }
    if(camerapermissionoption.status===PermissionStatus.DENIED){
      Alert("Insufficeint Permissions","You need to grant camera permissions to the app")
      return false;
    }
    return true;
  }
  async function takeImageHandler(){
    const permission = await verifypermission();

    if(!permission){
      return;
    }

    const image = await launchCameraAsync({
        allowsEditing:true,
        aspect:[16,9],
        quality:0.5,
    })
    setpickedimage(image.uri)
    onImageTaken(image.uri)
  }
  let previewimage = <Text>No Image taken yet.</Text>

  if(pickedimage){
    previewimage=<Image source ={{uri: pickedimage}} style={styles.image}/>
  }
  return (
    <View>
        <View style={styles.imagepreview}>{previewimage}</View>
        <OutlinedButton name="camera" onPress={takeImageHandler} >Take Image</OutlinedButton>
    </View>
  )
}

export default ImagePicker

const styles = StyleSheet.create({
  imagepreview:{
    width:'100%',
    height:200,
    marginVertical:8,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: Colors.primary100,
    borderRadius:4,
  },
  image:{
    height:'100%',
    width:'100%',
  }
})