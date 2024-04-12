import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-web';

export default function App() {

  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] =useState(0);

  const getPokemons = async() => {
    try {
     const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
     const responseJson = await response.json();
     console.log(responseJson.results);
     responseJson.results.map((pokemon)  => getPokemonDetails(pokemon))
     setIsLoading(false);
    } catch(error){
      console.error(error);
    }
  }  

  const getPokemonDetails = async(pokemon) => {
    try {
      const pokemonDetails = await fetch(`${pokemon.url}`);
      const pokemonDetailsJson = await pokemonDetails.json();
      console.log(pokemonDetailsJson)
      setPokemons(prevState => [...prevState, pokemonDetailsJson]);
      setIsLoading(false);
     } catch(error){
       console.error(error);
     }
  }

 useEffect(() => {
   getPokemons();
 },[])

  function HomeScreen({ navigation }) {
    return (
      <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {isLoading &&
          (<ActivityIndicator size="large" />)
        }
        { !isLoading &&
          (<FlatList contentContainerStyle={{ flexGrow: 1 }} style={{flex: 1}}
            data={pokemons}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({
              item, index}) => (
            <View key={index.toString()}>
              <Text>
               {item.name}
              </Text>
            </View>)
            }
          />
        )};
      </SafeAreaView>
    )
  }
  
  function DetailsScreen({ route ,navigation }) {
  
    const { itemId, otherParam } = route.params;
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text> 
        <Text> itemId : {JSON.stringify(itemId)} </Text>
        <Text> itemId : {JSON.stringify(otherParam)} </Text>
        <Button
          title="Go to Details... again"
          onPress={() => navigation.push('Details',
          {
            itemId : Math.floor(Math.random() * 100)
          })}
        />
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        <Button title="Go back" onPress={() => navigation.goBack()} />
        <Button
          title="Go back to first screen in stack"
          onPress={() => navigation.popToTop()}
        />
      </View>
    );
  }  
  
  
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Details" component={DetailsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
