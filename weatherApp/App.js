import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Image} from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Asset } from 'expo-asset';

export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const APIKEY = '5c6d1babe6164d7b9e5d473010e5b8f5';
  const [forecast, setForecast] = useState({});
  const [hourlyForecast, setHourlyForecast] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState('Waiting..');

  //expo fonts and essets
  
  //https://docs.expo.dev/versions/latest/sdk/asset/
  
  //https://blog.expo.dev/react-native-flatlist-made-easy-20fca51e0327

  useEffect(() => {
    
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setText('Permission to access location was denied');
        return;
      } else {
        let res = await Location.getCurrentPositionAsync({});
        setLocation(res);
        setText('Current Weather');
        try {
          const response = await Promise.all([
            fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${res.coords.latitude}&lon=${res.coords.longitude}&appid=${APIKEY}&units=metric`,
                {
                  method: "GET"
                }
              ),
            fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${res.coords.latitude}&longitude=${res.coords.longitude}&hourly=temperature_2m,relative_humidity_2m,weather_code&forecast_days=1`,
                {
                  method: "GET"
                }
              )
            ]);
            const openWeather = await response[0].json();
            const openMeteo = await response[1].json();
            setForecast(openWeather);
            setHourlyForecast(openMeteo);
            setIsLoading(false);
        } catch (error) {
          console.log('error', error);
        }
      }
      
    })();
  }, []);
  if(hourlyForecast) {
    console.log(hourlyForecast);
  }

   return (
    <View style={styles.container}>
      {isLoading &&
        (<ActivityIndicator size="large" />)
      }
      { !isLoading && 
      (<ScrollView contentContainerStyle={styles.ScrollViewContainer}>
        <View style={styles.forecastContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{text}</Text>
          </View>
          <Text style={styles.place}>{forecast.name}</Text>
          <View style={styles.generaleWeatherContainer}>
            <Image
                style={{width: 150, height: 150}}
                source={{
                  uri: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`,
                }}
                >
            </Image>
            <Text>{forecast.main.temp}</Text>
          </View>
          <Text style={styles.weatherDescription}>{forecast.weather[0].description}</Text>
          <View style={styles.humidtyAndTempertureContainer}>
            <View style={styles.temperatureContainer}>
              <View style= {styles.imageContainer}>
                <Image
                  style={styles.forecastImage}
                  source={require('./assets/temperature.svg')}
                >
              </Image>
              </View>
              <View>
                <Text>{forecast.main.feels_like}</Text>
                <Text>Feels Like</Text>
              </View> 
            </View>  
            <View style={styles.temperatureContainer}>
              <Image
                style={{width: 50, height: 50}}
                source={require('./assets/humidity.svg')}
              >
              </Image>
              <Text>{forecast.main.humidity}</Text>
              <Text>Humidity</Text>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View>
            <Text>
                Hourly Forecast
            </Text>
          </View>            
          <View>
            <Text>
              Time
            </Text>
            <Image
              style={{width: 50, height: 50}}
              source={require('./assets/humidity.svg')}
            >
            </Image>
            <Text>
              Temp °C
            </Text>
          </View>
        </View>
      </ScrollView>)
      }
    </View>
  );
}

const styles = StyleSheet.create({
  ScrollViewContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forecastContainer: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  generaleWeatherContainer: {
    flex: 1,
    flexDirection: 'Row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  humidtyAndTempertureContainer: {
    flex: 1,
    flexDirection: 'Row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 250,
  },
  titleContainer:{
    backgroundColor: '#FCA311',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    color: '#14213D',
    fontSize: 40,
    fontWeight: 'bold',
  },
  place: {
    fontSize: 20,
  },
  forecastImage: {
    width: 50,
    height: 50
  },
  temperatureContainer: {
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    padding: 30,
  },
  weatherDescription: {
    fontSize: 30,
  },
});
