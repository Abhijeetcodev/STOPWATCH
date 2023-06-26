import { useState } from 'react';
import {Button,View,StyleSheet, SafeAreaView} from 'react-native';
import StopWatchScreen from './Timer/StopWatchScreen';
import  RecordScreen from "./Records/RecordScreen"

export default function MainScreen(){
  

   const [currentScreen,SetCurrentSceen] = useState(true);
    function onButtonClickTimer(){
      SetCurrentSceen(true);
   
    }
    function onButtonClickRecord(){
   
      SetCurrentSceen(false);
    }
   return(
    
    <View style={styles.TopContainer}>
    <View style={styles.Container}>
    
           
            <View style={styles.buttonHorizental}>
        
              <Button onPress={onButtonClickTimer}  style={{ color:  currentScreen ? 'black' : 'white' }} title="Timer"/>
              </View>
              <View style= {styles.buttonContainer}>
              <Button onPress={onButtonClickRecord} color='black' title="RECORDS"/>
        
            </View>
    </View>
    {currentScreen ? <StopWatchScreen/> : <RecordScreen/> }
   </View>
    
   );

}


const styles = StyleSheet.create({
    
    TopContainer :{
     flex:1,
     padding:5,
    },

    Container:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    padding: 5,
    marginTop:50,
    height:100,
    width:300,
    borderWidth:6,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.25,

    },
    
      buttonContainer:{
        width:100,
        flex:1,
        paddingHorizontal: 10,
      },
      
})