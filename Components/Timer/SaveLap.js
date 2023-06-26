import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Modal, TextInput, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SaveLap(props) {
  const [enteredText, setEnteredGoalText] = useState("");
  
  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }
  
  let data = {
    title: enteredText,
    time: props.lapRecord.lapTime,
  }

  function closeLapHandler() {
    props.endAddRecordHandler();
    setEnteredGoalText('');
  }
  
  const saveData = async (value) => {
    try {
      await AsyncStorage.setItem(enteredText+props.lapRecord.lapTime,JSON.stringify(data)),
      console.log("Saved");
    } catch (e) {
      // saving error
    }
      
      
  
  }


  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Text>Record The Title</Text>
        <TextInput
          value={enteredText}
          style={styles.textInput}
          placeholder="Your course goal"
          onChangeText={goalInputHandler}
        />
        <View style={styles.buttonContainer}>
          <Button onPress={saveData} title="Save" />
          <Button onPress={closeLapHandler} title="Cancel" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    marginBottom: 24,
    borderBottomColor: "red",
    borderBottomWidth: 2,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    width: "70%",
    margin: 8,
    padding: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
  },
});
