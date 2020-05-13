import React from 'react';
import {Text} from 'react-native';
import {Container, Logo} from './styles';

export default function Header() {
  return (
    <Container>
      <Logo>
        <Text>.thriftstore.</Text>
      </Logo>
    </Container>
  );
}
