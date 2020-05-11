import styled from 'styled-components';
import {View} from 'react-native';

export const Container = styled(View)`
  background: white;
  position: relative;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  max-width: 300px;
  max-height: 300px;
  flex: 1;
`;
