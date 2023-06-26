
import {useState,useEffect} from "react";
import { Button,View,StyleSheet,Text,TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import Result from "./ResultSection";



export default function TimerScreen(){
  

    const[time,setTime] = useState(0);
    const[isReset,setReset] = useState(false);

    const[lap,setLaps] = useState([]);

    const[isRunning,setIsRunning] = useState(false);

    useEffect(()=>{
       
       let intervalId;
       
       if(isRunning){

        intervalId = setInterval(()=>setTime(time+1),10 );
       }

       return () => clearInterval(intervalId);


    },[isRunning,time,isReset,lap]);
     // Hours calculation
  
  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = time % 100;

  // Method to start and stop timer
  const handleRightButtonPress = () => {
    setIsRunning(!isRunning);

    setReset(isRunning);
  };

  // Method to reset timer back to 0
  const handleLeftButtonPress = () => {

    if(isReset){
    setIsRunning(false);
      setTime(0);
      setLaps([]);
    }else{
       let time = minutes.toString().padStart(2, "0")+":"+ seconds.toString().padStart(2, "0")+":"+milliseconds.toString().padStart(2, "0");
       setLaps(()=> [time,...lap]);  
       
    }
  };

  return(
    <View style={styles.MainContainer}>
    <Text style={styles.stopWatchTimer}> {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}</Text>
       
        <View style={styles.ButtonConatiner}>
        <TouchableOpacity
        style={[
          styles.controlButtonBorder,
          { backgroundColor: isRunning ? "#ffe6e6" : "grey" },
        ]}
        onPress={handleLeftButtonPress}
      >
        <View style={styles.controlButton}>
          <Text style={{ color: "white" }}>
            {isReset ? "Reset" : "Lap"}
          </Text>
        </View>
      </TouchableOpacity>
<TouchableOpacity
        style={[
          styles.controlButtonBorder,
          { backgroundColor: isRunning ? "#340e0d" : "#0a2a12" },
        ]}
        onPress={handleRightButtonPress}
      >
        <View style={styles.controlButton}>
          <Text style={{ color: isRunning ? "#ea4c49" : "#00ff40" }}>
            {isRunning ? "Stop" : "Start"}
          </Text>
        </View>
      </TouchableOpacity>
      </View>
      
      
      
      <Result results={lap} />
      
    </View>
  );
   

} 
const CENTER = {
    justifyContent: "center",
    alignItems: "center",
  };
  const styles = StyleSheet.create({
    
    MainContainer:{
       justifyContent:"space-between",
      
    },
    stopWatchTimer:{
        fontSize: 60,
        marginTop: 50, 
        paddingRight:20,
        marginBottom:15,
        alignItems:"center",
        textAlign:"center"
       
    },

    ButtonConatiner:{
      flexDirection: 'row',
      justifyContent: "space-between",
      margin:15,
      
    },
    controlButtonBorder: {
      ...CENTER,
      width: 110,
      height: 110,
      borderRadius: 70,
      
    },
    controlButton: {
      padding:5,
      ...CENTER,
      width: 110,
      height: 110,
      borderRadius: 65,
      borderColor: "#000",
      borderWidth: 1,
    },
  });

