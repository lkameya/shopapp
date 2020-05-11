import React from 'react';
import {Text} from 'react-native';
import {Container, Logo} from './styles';
import Search from '../Search';

export default function Header() {
  return (
    <Container>
      <Logo>
        <Text>.thriftstore.</Text>
      </Logo>
      <Search />
    </Container>
  );
}
