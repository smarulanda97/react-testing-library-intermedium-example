import React from 'react';
import SummaryForm from './SummaryForm';
import { Row, Col } from 'react-bootstrap';
import { useOrderDetails } from './../../context/OrderDetail';

const OrderSummary = ({ setOrderPhase }) => {
  const [{ totals, scoops, toppings }] = useOrderDetails();

  const scoopArray = Array.from(scoops.entries());
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingArray = Array.from(toppings.entries());
  const toppingList = toppingArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  return (
    <>
      <Row>
        <Col>
          <h1 style={{ textAlign: 'center' }} className={'my-5'}>
            Order Summary
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {scoopList.length && (
            <>
              <h2>Scoops: {totals.scoops}</h2>
              <ul style={{ listStyle: 'none' }}>{scoopList}</ul>
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {toppingList.length && (
            <>
              <h2>Toppings: {totals.toppings}</h2>
              <ul style={{ listStyle: 'none' }}>{toppingList}</ul>
            </>
          )}
        </Col>
      </Row>
      <Row className={'mt-3 text-right'}>
        <Col>
          <h2>Total: {totals.grandTotal}</h2>
        </Col>
      </Row>
      <Row className={'text-right'}>
        <Col>
          <SummaryForm setOrderPhase={setOrderPhase} />
        </Col>
      </Row>
    </>
  );
};

export default OrderSummary;
