import React from 'react';
import {gql, useMutation} from '@apollo/client';
import {Button, Text, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

function AddToCart({id}: {id: string}) {
  const navigation = useNavigation();
  const [addToCart, {loading, error}] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {id},
    onCompleted: () => navigation.navigate('Cart'),
  });

  if (error) {
    return <Text>{error}</Text>;
  }

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <>
      <Button onPress={() => addToCart()} title="add to cart" />
    </>
  );
}

export default AddToCart;
export {ADD_TO_CART_MUTATION};
