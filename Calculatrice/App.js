import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function App() {

  function addition() {
  }

  function substraction() {

  }

  function multiplication(){

  }

  function division(){

  }

  function total(){

  }

  function clear(){
   
  }




  return (
    <View style={styles.container}>
        <Text style={styles.baseText}>
          num
        <Text style={styles.innerText}> and red</Text>
        </Text>
      <View style={styles.ligne}>
          <TouchableOpacity style={styles.button} onPress={() =>console.log(7)}>
            <Text>7</Text>
          </TouchableOpacity >
          <TouchableOpacity style={styles.button} onPress={() =>console.log(8)}>
            <Text>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() =>console.log(9)}>
            <Text>9</Text>
          </TouchableOpacity>
      </View>
      <View >
          <TouchableOpacity style={styles.button} onPress={() =>console.log(4)}>
            <Text>4</Text>
          </TouchableOpacity >
          <TouchableOpacity style={styles.button} onPress={() =>console.log(5)}>
            <Text>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => console.log(6)}>
            <Text>6</Text>
          </TouchableOpacity>
      </View>
      <View >
          <TouchableOpacity style={styles.button} onPress={() =>console.log(1)}>
            <Text>1</Text>
          </TouchableOpacity >
          <TouchableOpacity style={styles.button} onPress={() =>console.log(2)}>
            <Text>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() =>console.log(3)}>
            <Text>3</Text>
          </TouchableOpacity>
      </View>
      <View >
          <TouchableOpacity style={styles.button} onPress={addition}>
            <Text>+</Text>
          </TouchableOpacity >
          <TouchableOpacity style={styles.button} onPress={() =>console.log(0)}>
            <Text>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={substraction}>
            <Text>-</Text>
          </TouchableOpacity>
      </View>
      <View>
          <TouchableOpacity style={styles.button} onPress={division}>
            <Text>÷</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={multiplication}>
            <Text>x</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={total}>
            <Text>=</Text>
          </TouchableOpacity>
      </View>  
        <TouchableOpacity style={styles.button} onPress={clear}>
          <Text>Clear</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontWeight: 'bold',
  },
  innerText: {
    color: 'red',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 8,
    marginBottom: 2,
  },
  ligne: {
    flex: 1,
    flexDirection: "row",
  }
});
