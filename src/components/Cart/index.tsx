import React, {useState} from 'react';
import {useCurrentUser} from '../../utils/useCurrentUser';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {gql, useMutation} from '@apollo/client';
import CartItem from '../CartItem';
import formatMoney from '../../utils/formatMoney';
import calcTotalPrice from '../../utils/calcTotalPrice';
import {SwipeListView} from 'react-native-swipe-list-view';
import {CURRENT_USER_QUERY} from '../../utils/useCurrentUser';
import waait from 'waait';

interface CartItem {
  id: number;
}

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const Cart = () => {
  const user = useCurrentUser();
  const [values, setValues] = useState({});

  const [removeFromCart, {loading, error}] = useMutation(
    REMOVE_FROM_CART_MUTATION,
    {
      // TODO not working because data.me.cart is ready only;
      update(cache, payload) {
        const data = cache.readQuery({query: CURRENT_USER_QUERY});
        const cartItemId = payload.data.removeFromCart.id;
        const newData = data.me.cart.filter(
          (cartItem) => cartItem.id !== cartItemId,
        );
        cache.writeQuery({query: CURRENT_USER_QUERY, newData});
      },
      refetchQueries: () => [{query: CURRENT_USER_QUERY}],
    },
  );

  if (!user) return null;

  const {me} = user.data;

  const renderHiddenItem = (data, rowMap) => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => deleteRow(rowMap, data.item.id)}>
          <Text style={styles.backTextWhite}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const deleteRow = (_: any, rowKey: any) => {
    removeFromCart({variables: {id: rowKey}});
  };

  return (
    <>
      <Text style={{padding: 10, fontSize: 20}}>
        You Have {me.cart.length} Item{me.cart.length === 1 ? '' : 's'} in your
        cart
      </Text>
      <SwipeListView
        data={me.cart}
        renderItem={({item, index}) => (
          <CartItem key={item.id} cartItem={item} index={index} />
        )}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-95}
        onLeftAction={() => console.log('left')}
        onRightAction={() => console.log('right')}
        onLeftActionStatusChange={() => console.log('HAHAHA')}
      />
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 95,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});

export default Cart;
