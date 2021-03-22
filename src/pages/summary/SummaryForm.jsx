import React, { useState } from 'react';
import { Form, Button, Popover, OverlayTrigger } from 'react-bootstrap';

const SummaryForm = ({ setOrderPhase }) => {
  const [termsChecked, setTermsChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPhase('completed');
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>No ice cream will actually be delivered</Popover.Content>
    </Popover>
  );

  const termsLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="left" overlay={popover}>
        <span style={{ color: 'blue' }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId={'terms-and-conditions'}>
        <Form.Check
          type={'checkbox'}
          checked={termsChecked}
          label={termsLabel}
          onChange={(e) => setTermsChecked(!termsChecked)}
        />
      </Form.Group>

      <Form.Group controlId={'actions'}>
        <Button variant={'primary'} type={'submit'} disabled={!termsChecked}>
          Confirm order
        </Button>
      </Form.Group>
    </Form>
  );
};

export default SummaryForm;
