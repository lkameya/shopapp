import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import {setContext} from '@apollo/link-context';
import {AsyncStorage} from 'react-native';
import ItemsScreen from './src/screens/ItemsScreen';
import SingleItemScreen from './src/screens/SingleItemScreen';

const httpLink = createHttpLink({
  uri: 'https://yoga.lkameya.com',
});

const authLink = setContext((_, {headers}) => {
  const token = AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const cache = new InMemoryCache();
// cache.writeQuery({
//   query: LOCAL_STATE_QUERY,
//   data: {
//     cartOpen: false
//   },
// });

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={ItemsScreen}
            options={{title: '.thriftstore.'}}
          />
          <Stack.Screen
            name="Item"
            component={SingleItemScreen}
            options={{title: 'Details'}}
          />
        </Stack.Navigator>
      </ApolloProvider>
    </NavigationContainer>
  );
};

export default App;
