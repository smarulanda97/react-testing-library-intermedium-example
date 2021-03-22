import axios from 'axios';
import ScoopOption from './ScoopOption';
import { Row, Col } from 'react-bootstrap';
import ToppingOption from './ToppingOption';
import { formatCurrency } from './../../utils';
import { pricePerItem } from './../../constants';
import AlertBanner from './../common/AlertBanner';
import React, { useEffect, useState } from 'react';
import { useOrderDetails } from './../../context/OrderDetail';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    setError(false);
    const source = axios.CancelToken.source();

    axios
      .get(`http://localhost:3030/${optionType}`, {
        cancelToken: source.token,
      })
      .then((response) => setItems(response.data))
      .catch((error) => setError(true));

    return () => {
      source.cancel();
    };
  }, [optionType]);

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

  const title = optionType[0].toUpperCase() + optionType.slice(1);

  return !error ? (
    <Row>
      <Col xs={12}>
        <h2>{title}</h2>
        <p>{formatCurrency(pricePerItem[optionType])} each</p>
        <p>
          {title} total: {orderDetails.totals[optionType]}
        </p>
      </Col>
      <Col xs={12}>
        <Row>
          {items.map((item) => (
            <ItemComponent
              key={item.name}
              name={item.name}
              imagePath={item.imagePath}
              updateItemCount={(itemName, newItemCount) =>
                updateItemCount(itemName, newItemCount, optionType)
              }
            />
          ))}
        </Row>
      </Col>
    </Row>
  ) : (
    <AlertBanner />
  );
};

export default Options;
