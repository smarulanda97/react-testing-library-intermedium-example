import axios from 'axios';
import { Row } from 'react-bootstrap';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import React, { useEffect, useState } from 'react';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    const source = axios.CancelToken.source();

    axios
      .get(`http://localhost:3030/${optionType}`, {
        cancelToken: source.token,
      })
      .then((response) => setItems(response.data))
      .catch((error) => {
        /* TODO: handle erros respose */
      });

    return () => {
      source.cancel();
    };
  }, [optionType]);

  // TODO: replace null with the ToppinOptions when available
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

  return (
    <Row className={`${optionType}__list`}>
      {items.map((item) => (
        <ItemComponent
          key={item.name}
          name={item.name}
          imagePath={item.imagePath}
        />
      ))}
    </Row>
  );
};

export default Options;
