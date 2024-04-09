import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {

 const [text, settext] = useState('Guess a number between 1 and 500'); 
 const [number, setNumber] =  useState('');
 const [randomNumber, setRandomNumber] = useState(0);
 //const [areNumbersEquals, setAreNumbersEquals] = useState(Boolean);
 const max = 500;
 const min = 1;

  function createRandomNumber () {
    const number = Math.floor(Math.random() * (max - min + 1)) + min
    setRandomNumber(number);
  }

  function validate (num) {
    setNumber(num);
    if (parseInt(number) === randomNumber) {
      settext('Congrats! You found the number!');
    } else if (parseInt(number) > randomNumber) {
      settext('Your number is too big');
      setNumber('');
    } else if (parseInt(number) < randomNumber) {
      settext('Your number is to small');
      setNumber('');
    }
    console.log(randomNumber);
  }

  useEffect(() => {
    createRandomNumber();
  }, []);
  
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <TextInput
        style={styles.input}
        value={number}
        onChangeText={setNumber}
        placeholder="enter your number here"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={validate}>
        <Text>Press Here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});
