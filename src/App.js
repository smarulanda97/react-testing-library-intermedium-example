import React from 'react';
import { Container } from 'react-bootstrap';
import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './context/OrderDetail';

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page need provider */}
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
