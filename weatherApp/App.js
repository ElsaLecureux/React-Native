import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Image, SafeAreaView, FlatList} from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import moment from 'moment';

export default function App() {

  const [location, setLocation] = useState(null);
  const APIKEY = '5c6d1babe6164d7b9e5d473010e5b8f5';
  const [forecast, setForecast] = useState({});
  const [hourlyForecast, setHourlyForecast] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState('Waiting..');

  const codes = {
    0 : "01",
    1 : "02",
    2 : "02",
    3 : "02",
    45 : "50",
    48 : "50",
    51 : "10",
    53 : "10",
    55 : "10",
    56 : "10",
    57 : "10",
    61 : "09",
    63 : "09",
    65 : "09",
    66 : "09",
    67 : "09",
    71 : "13",
    73 : "13",
    75 : "13",
    77 : "13",
    80 : "09",
    81 : "09",
    82 : "09",
    85 : "13",
    86 : "13",
    95 : "11",
    96 : "11",
    99 : "11"
}

function getTimeOfTheDay (index) {
  const now = new Date(hourlyForecast.hourly.time[index]);
  const sunrise = new Date(forecast.sys.sunrise * 1000);
  const sunset = new Date(forecast.sys.sunset * 1000);
    if(sunrise <= now && now <= sunset) {
      return 'd';
    } else if (sunrise > now || now > sunset) {
      return'n';
    }
  }

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
 
   return (
    <SafeAreaView style={styles.container}>
      {isLoading &&
        (<ActivityIndicator size="large" />)
      }
      { !isLoading &&
      (<ScrollView contentContainerStyle={{ flexGrow: 1 }}  style={styles.scrollViewContainer}>
        <View style={styles.container}>
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
              <Text>{forecast.main.temp}°C</Text>
            </View>
            <Text style={styles.weatherDescription}>{forecast.weather[0].description}</Text>
            <View style={styles.humidityAndTemperatureContainer}>
              <View style={styles.temperatureContainer}>
                <View style= {styles.imageContainer}>
                  <Image
                    style={{width: 40, height: 40}}
                    source={require('./assets/temperature.png')}/>
                </View>
                <View>
                  <Text>{forecast.main.feels_like}</Text>
                  <Text>Feels Like</Text>
                </View> 
              </View>  
              <View style={styles.temperatureContainer}>
                <Image
                  style={{width: 40, height: 40}}
                  source={require('./assets/humidity.png')}/>
                <Text>{forecast.main.humidity}</Text>
                <Text>Humidity</Text>
              </View>
            </View>
          </View>
          <View  style={{ flex: 1 }}>
            <View style={styles.container}>
              <Text style={styles.title}>
                  Hourly Forecast
              </Text>
            </View>            
            <FlatList contentContainerStyle={{ flexGrow: 1 }} style={styles.scrollViewContainer} horizontal
              data={hourlyForecast.hourly.time}
              keyExtractor={(time) => time}
              renderItem={({item, index})=> 
              <View style={styles.hourlyForecastContainer}>
                  <View>
                    <Text >
                    {moment(item).hours()} h
                    </Text>
                  </View>
                  <Image
                      style={{width: 80, height:80}}
                      source={{
                      uri: `http://openweathermap.org/img/wn/${codes[hourlyForecast.hourly.weather_code[index]] + getTimeOfTheDay(index)}@4x.png`
                      }}
                    />
                  <View>
                    <Text >
                    {hourlyForecast.hourly.temperature_2m[index]}
                    </Text>
                  </View>
                </View>
            }
            />
              </View> 
        </View>
      </ScrollView>
    )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#fff',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  humidityAndTemperatureContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  titleContainer:{
    backgroundColor: '#FCA311',
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center,'
  },
  title: {
    color: '#14213D',
    fontSize: 30,
    fontWeight: 'bold',
  },
  place: {
    fontSize: 20,
  },
  temperatureContainer: {
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherDescription: {
    fontSize: 25,
  },
  hourlyForecastContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 2,
  }
});
