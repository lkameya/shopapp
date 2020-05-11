import React from 'react';
import {gql, useQuery} from '@apollo/client';
import Item from '../Item';
import {perPage} from '../../config';
import {ItemsContainer} from './styles';
import {Text} from 'react-native';

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

  return (
    <>
      <ItemsContainer>
        {data.items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ItemsContainer>
    </>
  );
}

export default Items;
export {ALL_ITEMS_QUERY};
