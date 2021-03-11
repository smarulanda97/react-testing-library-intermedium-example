import { Alert } from 'react-bootstrap';

const AlertBanner = ({ message, variant }) => {
  const alertVariant = variant || 'danger';
  const alertMessage =
    message || 'An unexpected error ocurred. Please try again.';

  return <Alert variant={alertVariant}>{alertMessage}</Alert>;
};

export default AlertBanner;
