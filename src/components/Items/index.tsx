import React, {useEffect} from 'react';
import {gql, useQuery, useMutation} from '@apollo/client';
import Item from '../Item';
import {perPage} from '../../config';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  ActivityIndicator,
} from 'react-native';
import {AsyncStorage} from 'react-native';

let numberGrid = 2;

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
    }
  }
`;

function Items({page}: {page: number}) {
  const {loading, error, data} = useQuery(ALL_ITEMS_QUERY, {
    variables: {skip: page * perPage - perPage},
    //fetchPolicy: "network-only"
  });

  const [signin] = useMutation(SIGN_IN_MUTATION, {
    variables: {email: 'admin@gmail.com', password: '123'},
    onCompleted: ({signin: {token}}) => AsyncStorage.setItem('token', token),
  });

  useEffect(() => {
    signin();
  }, [signin]);

  if (loading || !data) {
    return (
      <View style={[styles.containerLoading, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const renderItem = ({item}: {item: Item}) => {
    return (
      <View style={styles.container}>
        <Item item={item} key={item.id} />
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={data.items}
        renderItem={renderItem}
        numColumns={numberGrid}
      />
    </>
  );
}

export default Items;
export {ALL_ITEMS_QUERY};
