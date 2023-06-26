import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, Pressable, TextInput, StyleSheet, Alert, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

const SearchBar = () => {
  const [userInput, setUserInput] = useState('');
  const [isSelected,setIsSelected] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const items = await AsyncStorage.multiGet(keys);

        const simplifiedData = items.map(([key, value]) => {
          const parsedValue = JSON.parse(value);
          return {
            [key]: parsedValue,
          };
        });

        setData(simplifiedData);
      } catch (error) {
        console.log(error, 'problem');
      }
    })();
  },[]);

  const onSearchHandler = (text) => {
    setUserInput(text);
  };

  const deleteData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log('Item removed successfully');
      
      setIsSelected(data);
    } catch (error) {
      console.log(error, 'error removing item');
    }
  };

  const onPressHandler = (key) => {
    Alert.alert('Delete Record', 'Are you sure you want to delete this record?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => deleteData(key),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          value={userInput}
          onChangeText={onSearchHandler}
          style={styles.searchInput}
          placeholder="Search Records"
        />
      </View>
   
      <FlatList
        data={data}
        extraData={isSelected}
        renderItem={({ item,index }) => {
          const key = Object.keys(item)[0]; // Get the key of the item
          const { time, title } = item[key]; // Destructure the time and title from the item's value

          if (userInput === '') {
            return (
              <Pressable onPress={() => onPressHandler(key)}>
                <View style={((index)%2==0) ? styles.resultItemEven: styles.resultItemOld}>
                    
                  <Text style={styles.resultItemText}>{title}</Text>
                  <Text style={styles.resultItemText}>{time}</Text>
                </View>
              </Pressable>
            );
          }

          if (title && title.toString().toLowerCase().includes(userInput.toLowerCase())) {
            return (
              <Pressable onPress={() => onPressHandler(key)}>
                <View style={styles.resultItemEven}>
                  <Text style={styles.resultItemText}>{title}</Text>
                  <Text style={styles.resultItemText}>{time}</Text>
                </View>
              </Pressable>
            );
          }

          return null; // Return null for non-matching items
        }}
       
      />

    </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    width: '90%',
  },
  listStyle:{

  },
  searchBar: {
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    width: '95%',
    backgroundColor: '#d9dbda',
    borderRadius: 10,
    alignItems: 'center',
  },
  searchInput: {
    fontSize: 15,

  },
  resultItemEven: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ffe4c4',
    height: 50,
    backgroundColor:"#f0f8ff",
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
  resultItemText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '300',
  },
});

export default SearchBar;