import React from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import {setContext} from '@apollo/link-context';

import Items from './src/components/Items';
// import Header from './src/components/Header';

import {AsyncStorage} from 'react-native';

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

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
          <Items />
        </ScrollView>
      </SafeAreaView>
    </ApolloProvider>
  );
};

export default App;
