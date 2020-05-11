import React, {useState} from 'react';
import {Container} from './styles';
import {Text, Image} from 'react-native';

function Item({item}) {
  return (
    <Container>
      <Text>{item.title}</Text>
      <Image source={{uri: item.image}} style={{width: 200, height: 200}} />
    </Container>
  );
}

export default Item;
