import React from 'react';
import {Text, View, Image} from 'react-native';
import formatMoney from '../../utils/formatMoney';

function CartItem({cartItem}) {
  if (!cartItem.item) return <Text>This Item has been removed</Text>;

  return (
    <View style={{flexDirection: 'row', padding: 10}}>
      {/* <img width="100" src={cartItem.item.image} alt={cartItem.item.title} /> */}
      <Image
        source={{uri: cartItem.item.image}}
        style={{width: 100, height: 100}}
      />
      <View style={{justifyContent: 'center'}}>
        <Text style={{fontSize: 16, fontWeight: 'bold', padding: 5}}>
          {cartItem.item.title}
        </Text>
        <Text style={{padding: 5}}>
          {formatMoney(cartItem.item.price * cartItem.quantity)}
          {' - '}
          {cartItem.quantity} &times; {formatMoney(cartItem.item.price)} each
        </Text>
      </View>
    </View>
  );
}

export default CartItem;
