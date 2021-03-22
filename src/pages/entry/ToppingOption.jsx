import React from 'react';
import { Form, Col, Image } from 'react-bootstrap';

const ToppingOption = ({ name, imagePath, updateItemCount }) => {
  const handleChange = (e) => {
    updateItemCount(name, e.target.checked ? 1 : 0);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <Image
        fluid
        alt={`${name} topping`}
        style={{ with: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check
          label={name}
          type={'checkbox'}
          defaultChecked={false}
          onChange={handleChange}
        />
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;
