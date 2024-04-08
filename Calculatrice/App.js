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
      <View style={styles.textContainer}>
      <Text style={styles.baseText}>
          Result
        </Text>
      </View>
      <View style={styles.line}>
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
      <View style={styles.line}>
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
      <View style={styles.line}>
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
      <View style={styles.line}>
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
      <View style={styles.line}>
          <TouchableOpacity style={styles.button} onPress={division}>
            <Text>÷</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={multiplication}>
            <Text>x</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={clear}>
            <Text>C</Text>
          </TouchableOpacity>
      </View>  
        <TouchableOpacity style={styles.button} onPress={total}>
          <Text>=</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems:'center',
  },
  baseText: {
    alignItems:'center',
    justifyContent:'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  innerText: {
    color: 'red',
  },
  container: {
    flex: 2,
    justifyContent: 'center',
    padding: 40,
  },
  button: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#DDDDDD',
    padding: 30,
    marginBottom: 15,
    marginRight: 15,
    borderRadius:10,
    elevation: 8,
  },
  line: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    marginRight: 2,
  }
});
