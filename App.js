
import { StyleSheet,SafeAreaView,View } from 'react-native';
import MainScreen from './Components/MainScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaView>
      <MainScreen/>
      </SafeAreaView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
