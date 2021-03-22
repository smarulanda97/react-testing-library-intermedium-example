import React from 'react';
import Options from './Options';
import { Row, Col } from 'react-bootstrap';
import { useOrderDetails } from './../../context/OrderDetail';

const OrderEntry = () => {
  const [orderDetails] = useOrderDetails();

  return (
    <>
      <Row>
        <Col className={'text-center py-5'}>
          <h1>Design Your Sundae!</h1>
        </Col>
      </Row>
      <Options optionType={'scoops'} />
      <Options optionType={'toppings'} />
      <Row>
        <Col>
          <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
        </Col>
      </Row>
    </>
  );
};

export default OrderEntry;
