import React, {useLayoutEffect} from 'react';
import {StyleSheet, Text, Image, Button} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {gql, useQuery} from '@apollo/client';
import formatMoney from '../../utils/formatMoney';
import AddToCart from '../AddToCart';

type RootStackParamList = {
  Home: undefined;
  Item: {id: string};
};

type SingleItemScreenRouteProp = RouteProp<RootStackParamList, 'Item'>;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: {id: $id}) {
      id
      title
      price
      description
      largeImage
    }
  }
`;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    padding: 10,
  },
  text: {
    padding: 10,
    fontSize: 16,
    textAlign: 'justify',
  },
  price: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 20,
    padding: 10,
  },
});

const SingleItem = () => {
  const route = useRoute<SingleItemScreenRouteProp>();
  const navigation = useNavigation();
  const {id} = route.params;
  const {data, loading} = useQuery(SINGLE_ITEM_QUERY, {
    variables: {id},
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Cart" onPress={() => navigation.navigate('Cart')} />
      ),
    });
  }, [navigation]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const {item} = data;
  if (!data.item) return <Text>No item found!</Text>;

  return (
    <>
      <Text style={styles.price}>{formatMoney(item.price)}</Text>
      <Image
        source={{uri: data.item.largeImage}}
        style={{width: 400, height: 400}}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.description}</Text>
      <AddToCart id={item.id} />
    </>
  );
};

export default SingleItem;
export {SINGLE_ITEM_QUERY};
