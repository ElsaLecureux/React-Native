import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {

 let [text, settext] = useState('Guess a number between 1 and 500'); 
 let [number, setNumber] =  useState('');
 let [randomNumber, setRandomNumber] = useState(0);
 let [attempts, setAttempts] =  useState(0);
 let [counter, setCounter] = useState(30);

 const max = 50;
 const min = 1;

  function createRandomNumber () {
    const number = Math.floor(Math.random() * (max - min + 1)) + min
    setRandomNumber(number);
  }

  function validate (num) {
    setNumber(num);
    setAttempts((prev) => prev + 1);
    if(attempts < 5) {
      if (parseInt(number) === randomNumber) {
        settext('Congrats! You found the number!');
      } else if (parseInt(number) > randomNumber) {
        settext('Your number is too big');
        setNumber('');
      } else if (parseInt(number) < randomNumber) {
        settext('Your number is to small');
        setNumber('');
      }
    } else {
      settext('Game Over! You have reached the maximum counts of attempts');
    }  
  }

  function restart() {
    setNumber('');
    setCounter(30);
    setAttempts(5);
    settext('Guess a number between 1 and 500');
    createRandomNumber();
  }

  useEffect(() => {
    createRandomNumber();
  }, []);

  useEffect(() => {
    if (counter === 0) {
      settext('Game Over!');
      return ;
    }
    const intervalId = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);
      return () => clearInterval(intervalId);
  }, [counter])
  
  return (
    <View style={styles.container}>
      <View style={styles.textsContainer}>
        <View style={styles.textContainer}>
          <Text style={(counter <= 5) ? styles.red : styles.green}>Timer: {counter}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text>{text}</Text>
        </View>   
        <View style={styles.textContainer}>
          <TextInput
              style={styles.input}
              value={number}
              onChangeText={setNumber}
              placeholder="enter your number here"
              keyboardType="numeric"
            />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={validate}>
          <Text>Validate</Text>
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity style={styles.button} onPress={restart}>
          <Text>Play Again!</Text>
        </TouchableOpacity>
        </View>      
      </View>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer:{
    flex: 1,
    marginRight: 20,
  },
  textsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    placeholderTextColor: '#adb5bd',
  },
  green: {
    color: '#000000',
  },
  red: {
    color: '#e63946',
  }
});
