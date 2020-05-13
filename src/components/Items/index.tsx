import React from 'react';
import {gql, useQuery} from '@apollo/client';
import Item from '../Item';
import {perPage} from '../../config';
import {StyleSheet, Text, FlatList, View} from 'react-native';

let numberGrid = 2;

const styles = StyleSheet.create({
  container: {
    padding: 5,
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

function Items({page}: {page: number}) {
  const {loading, error, data} = useQuery(ALL_ITEMS_QUERY, {
    variables: {skip: page * perPage - perPage},
    //fetchPolicy: "network-only"
  });

  if (loading || !data) {
    return <Text>Loading...</Text>;
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
