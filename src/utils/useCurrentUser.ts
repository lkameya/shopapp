import {gql, useQuery} from '@apollo/client';

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      cart {
        id
        quantity
        item {
          id
          price
          image
          title
          description
        }
      }
    }
  }
`;

export function useCurrentUser() {
  const {data, loading, error} = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'network-only',
  });

  if (loading) return null;
  if (error) return null;

  return {
    data,
  };
}

export {CURRENT_USER_QUERY};
