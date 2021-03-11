import axios from 'axios';
import { Row } from 'react-bootstrap';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import AlertBanner from './../common/AlertBanner';
import React, { useEffect, useState } from 'react';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

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

  return !error ? (
    <Row>
      {items.map((item) => (
        <ItemComponent
          key={item.name}
          name={item.name}
          imagePath={item.imagePath}
        />
      ))}
    </Row>
  ) : (
    <AlertBanner />
  );
};

export default Options;
