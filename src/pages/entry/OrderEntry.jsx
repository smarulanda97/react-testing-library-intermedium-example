import React from 'react';
import { Container } from 'react-bootstrap';
import Options from './Options';

const OrderEntry = () => {
  return (
    <Container>
      <Options optionType={'scoops'} />
      <Options optionType={'toppings'} />
    </Container>
  );
};

export default OrderEntry;
