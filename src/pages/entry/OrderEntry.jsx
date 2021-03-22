import React, { useState, useEffect } from 'react';
import Options from './Options';
import { Row, Col, Button } from 'react-bootstrap';
import { useOrderDetails } from './../../context/OrderDetail';

const OrderEntry = ({ setOrderPhase }) => {
  const [{ totals }] = useOrderDetails();
  const [orderDisabled, setOrderDisabled] = useState(true);

  useEffect(() => {
    setOrderDisabled(totals.grandTotal === '$0.00');
  }, [totals.grandTotal]);

  return (
    <>
      <Row>
        <Col className={'text-center py-5'}>
          <h1>Design Your Sundae!</h1>
        </Col>
      </Row>
      <Options optionType={'scoops'} />
      <Options optionType={'toppings'} />
      <Row className={'text-right my-3'}>
        <Col>
          <h2>Grand total: {totals.grandTotal}</h2>
        </Col>
      </Row>
      <Row className={'text-right my-4'}>
        <Col>
          <Button
            onClick={() => setOrderPhase('review')}
            disabled={orderDisabled}
          >
            Order sundae!
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default OrderEntry;
