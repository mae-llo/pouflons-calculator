import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Calculator from './Calculator.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Calculator />
  </StrictMode>,
);
