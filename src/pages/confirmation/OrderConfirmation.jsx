import axios from 'axios';
import { Button, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useOrderDetails } from './../../context/OrderDetail';

const OrderConfirmation = ({ setOrderPhase }) => {
  const [orderNumber, setOrderNumber] = useState(null);
  const [, , resetOrder] = useOrderDetails();

  const handleClick = () => {
    resetOrder();

    setOrderPhase('inProgress');
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios
      .post('http://localhost:3030/order')
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => {});

    return () => source.cancel();
  }, []);

  return (
    <Row>
      <Col>
        {orderNumber ? (
          <div style={{ textAlign: 'center' }} className={'my-5'}>
            <h1>Thank You!</h1>
            <p>Your oder number is {orderNumber}</p>
            <p>As per our terms and conditions, nothing will happen now</p>
            <Button onClick={handleClick}>Create new order</Button>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </Col>
    </Row>
  );
};

export default OrderConfirmation;
