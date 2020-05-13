import React from 'react';
import {Text} from 'react-native';
import {useRoute} from '@react-navigation/native';

const SingleItem = () => {
  const route = useRoute();

  return <Text>Hello from Single Item {route.params?.id}</Text>;
};

export default SingleItem;
