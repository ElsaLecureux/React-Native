import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';

export default function App() {

  const [text, setText] = useState('');
  const [numbers, setNumbers] = useState([]);
  const [operators, setOperators] = useState([]);

  function calculus() {
    console.log(operators.length)
    //  if (numbers.length > 1 && operators.length > 0) {
    //  const result = `${numbers[numbers.length - 1]} ${operators[operators.length]} ${numbers[numbers.length]}`;
    //  showTotal(result);
    //  }
  }

  function addOperator(op) {
      setOperators(prevState => ([...prevState, op]));
      console.log('operator', operators);
  }

  function showTotal(result){
    setText(result);
  }

  function clear(){
    setNumbers([]);
    setOperators([]);
    setText('');   
  }

  function addNumber(num){
    if (operators.length === 0 || operators.length === numbers.length) {
      setNumbers(prevState => ([...prevState, num]));
    } else {
      const changeNumber = [...numbers];
      changeNumber[numbers.length] = numbers[numbers.length] + num;
      setNumbers(changeNumber);
      console.log('changeNumber', changeNumber[numbers.length]);
    }    
    console.log('numbers', numbers);
  }




  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.baseText}>
          {text}
        </Text>
      </View>
      <View style={styles.line}>
          <TouchableOpacity style={styles.button} onPress={() =>addNumber(7)}>
            <Text>7</Text>
          </TouchableOpacity >
          <TouchableOpacity style={styles.button} onPress={() =>addNumber(8)}>
            <Text>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() =>addNumber(9)}>
            <Text>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => addOperator('+')}>
            <Text>+</Text>
          </TouchableOpacity >
      </View>
      <View style={styles.line}>
          <TouchableOpacity style={styles.button} onPress={() =>addNumber(4)}>
            <Text>4</Text>
          </TouchableOpacity >
          <TouchableOpacity style={styles.button} onPress={() =>addNumber(5)}>
            <Text>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => addNumber(6)}>
            <Text>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => addOperator('-')}>
            <Text>-</Text>
          </TouchableOpacity>          
      </View>
      <View style={styles.line}>
          <TouchableOpacity style={styles.button} onPress={() =>addNumber(1)}>
            <Text>1</Text>
          </TouchableOpacity >
          <TouchableOpacity style={styles.button} onPress={() =>addNumber(2)}>
            <Text>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() =>addNumber(3)}>
            <Text>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => addOperator('*')}>
            <Text>x</Text>
          </TouchableOpacity>         
      </View>
      <View style={styles.line}>
        <TouchableOpacity style={styles.button} onPress={() => addOperator('/')}>
          <Text>÷</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() =>addNumber(0)}>
          <Text>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={calculus}>
          <Text>=</Text>
        </TouchableOpacity>     
        <TouchableOpacity style={styles.button} onPress={clear}>
          <Text>C</Text>
        </TouchableOpacity>                    
      </View>        
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    borderBottomWidth: 1,
    marginBottom: 15,
    alignItems:'flex-end',
    justifyContent: 'flex-end',
    flex: 2,
    padding: 20,
  },
  baseText: {
    alignItems:'center',
    justifyContent:'flex-end',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#184E77',
  },
  container: {  
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#76C893',
    padding: 25,
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
