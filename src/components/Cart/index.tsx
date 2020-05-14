import React from 'react';
import {useCurrentUser} from '../../utils/useCurrentUser';
import {Text} from 'react-native';
import CartItem from '../CartItem';
import formatMoney from '../../utils/formatMoney';
import calcTotalPrice from '../../utils/calcTotalPrice';

interface CartItem {
  id: number;
}

const Cart = () => {
  const user = useCurrentUser();

  if (!user) return null;

  const {me} = user.data;

  return (
    <>
      <Text style={{padding: 10, fontSize: 20}}>
        You Have {me.cart.length} Item{me.cart.length === 1 ? '' : 's'} in your
        cart
      </Text>
      {me.cart.map((cartItem: CartItem) => (
        <CartItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <Text
        style={{
          padding: 30,
          fontSize: 24,
          fontWeight: 'bold',
          alignSelf: 'flex-end',
        }}>
        Total: {formatMoney(calcTotalPrice(me.cart))}
      </Text>
    </>
  );
};

export default Cart;
