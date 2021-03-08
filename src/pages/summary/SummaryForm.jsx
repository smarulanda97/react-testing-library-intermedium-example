import React, { useState } from 'react';
import { Form, Button, Popover, OverlayTrigger } from 'react-bootstrap';

const SummaryForm = () => {
  const [termsChecked, setTermsChecked] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>No ice cream will actually be delivered</Popover.Content>
    </Popover>
  );

  const termsLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: 'blue' }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form>
      <Form.Row>
        <Form.Group controlId={'terms-and-conditions'}>
          <Form.Check
            type={'checkbox'}
            checked={termsChecked}
            label={termsLabel}
            onChange={(e) => setTermsChecked(!termsChecked)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group controlId={'actions'}>
          <Button variant={'primary'} type={'submit'} disabled={!termsChecked}>
            Confirm order
          </Button>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default SummaryForm;
