 export default class HomeScreen() {
    return (
      <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {isLoading &&
          (<ActivityIndicator size="large" />)
        }
        { !isLoading &&
          (<FlatList contentContainerStyle={{ flexGrow: 1 }} style={{flex: 1}}
            data={pokemons}
            renderItem={({item})=> 
              <Text >
              {item.name}
              </Text>
            }
            key={item.name}
            //onEndReached={getNextPage}
          />
        )};
      </SafeAreaView>
    )
  }