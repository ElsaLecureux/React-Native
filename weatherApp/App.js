import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { axios } from 'axios';
import { useEffect, useState } from 'react';

export default function App() {

//ask for location authorisation user
// get location
// use it in URL
// loaddata (axios), double url
// https://www.storyblok.com/tp/how-to-send-multiple-requests-using-axios

  const [isLoading, setIsLoading] = useState(false);

  function loadData() {
    setIsLoading(true);
    axios.get(`${baseUrl}/api/users/1`).then((response) => {
      console.log(response.data);
    });
  }

 useEffect(() => {
    loadData();
},[]);

  return (
    <View style={styles.container}>
      { isLoading &&
        (<ActivityIndicator size="large" />)
      }
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
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
});
