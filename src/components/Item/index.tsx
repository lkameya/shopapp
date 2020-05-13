import React from 'react';
import {Image, Dimensions, TouchableHighlight} from 'react-native';
import {useNavigation} from '@react-navigation/native';

let {width} = Dimensions.get('window');

let numberGrid = 2;
let itemWidth = width / numberGrid;

interface Item {
  image: string;
  id: string;
}

function Item({item}: {item: Item}) {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      onPress={() => navigation.navigate('Item', {id: item.id})}>
      <Image
        source={{uri: item.image}}
        style={{width: itemWidth - 10, height: itemWidth - 10}}
      />
    </TouchableHighlight>
  );
}

export default Item;
