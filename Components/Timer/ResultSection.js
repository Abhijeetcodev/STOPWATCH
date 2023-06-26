import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import LapItems from "./LapItems";

// print the lap time
function Result({ results,popupHandlers }) {
  
  return (
      <SafeAreaView>
        <ScrollView>
      <View style={styles.resultItems} >
    {results.map((item, index) => (
      <LapItems results={results} index={index} item={item}  />
      ))}
        </View>
        </ScrollView>
        </SafeAreaView>
  );
}
const styles = StyleSheet.create({

  resultItems:{
    borderWidth: 4,
    
    borderRadius: 20,
  },
  resultItemEven: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "black",
    height: 50,
    backgroundColor:"#f0f8ff",
    paddingHorizontal: 15,
  },
  resultItemOld: {
    
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
});

export default Result;