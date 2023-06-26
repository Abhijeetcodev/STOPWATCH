import { Pressable, View,Text,StyleSheet, Alert } from "react-native";

import { useState } from "react";
import SaveLap from "./SaveLap";


export default function LapItems(props){
    
    const [modalIsVisible,setModalIsVisible] = useState(false);
    
    function startAddRecordHandler(){
      setModalIsVisible(true);
    }

    function endAddRecordHandler(){
     setModalIsVisible(false);
    }

    const lapRecord = {
       lapNumber: props.results.length - props.index,
       lapTime: props.item,
       lapKey:props.index+props.item, 
    }
    function onPressHandler(){
        let string = 'Save Lap '+lapRecord.lapNumber+' in records?';
        Alert.alert('',string, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Save', onPress: startAddRecordHandler},
          ]);
    }
    return(
      <View> 
      {modalIsVisible && <SaveLap endAddRecordHandler={endAddRecordHandler} lapRecord={lapRecord} />}
      <Pressable onPress={onPressHandler}>
        <View key={props.index+props.item} style={((props.index+1)%2==0) ? styles.resultItemEven : styles.resultItemOld }>
          <Text  style={ styles.resultItemText }>
            Lap {props.results.length - props.index}
          </Text>
          <Text  style={styles.resultItemText}>{props.item}</Text>

         </View>
        
      </Pressable>  
      </View>
    );
}

const styles = StyleSheet.create({
    resultItemEven: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "black",
        height: 50,
        paddingHorizontal: 15,
      },
      resultItemOld: {
        
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "black",
        height: 50,
        backgroundColor: "grey",
        paddingHorizontal: 15,
      },
      resultItemText: { color: "black",
      fontSize: 15,
      fontWeight:100,
    },
})