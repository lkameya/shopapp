import React from 'react';
import {gql, useQuery} from '@apollo/client';
import Item from '../Item';
import {perPage} from '../../config';
import {ItemsContainer} from './styles';
import {Text, FlatList, View, Dimensions, ScrollView} from 'react-native';

let {width} = Dimensions.get('window');

let numberGrid = 2;
let itemWidth = width / numberGrid;

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

function Items({page}) {
  const {loading, error, data} = useQuery(ALL_ITEMS_QUERY, {
    variables: {skip: page * perPage - perPage},
    //fetchPolicy: "network-only"
  });

  if (loading || !data) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const renderItem = ({item}) => {
    return (
      <View style={{padding: 5}}>
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
