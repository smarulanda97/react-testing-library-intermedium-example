import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const TermsLabel = () => (
  <span>
    I agree to <span style={{ color: 'blue' }}>Terms and Conditions</span>
  </span>
);

const SummaryForm = () => {
  const [termsChecked, setTermsChecked] = useState(false);

  return (
    <Form>
      <Form.Row>
        <Form.Group controlId={'terms-and-conditions'}>
          <Form.Check
            type={'checkbox'}
            checked={termsChecked}
            label={<TermsLabel />}
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
