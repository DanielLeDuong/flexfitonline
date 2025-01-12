import { Routes, Route } from 'react-router-dom';
import Instructor from './pages/instructor/Instructor';
import InstructorDetail from './pages/instructor/InstructorDetail';
import PaymentClassResult from './pages/payment/paymentClassResult';

function App() {
  return (
    <Routes>
      <Route path="/instructor" element={<Instructor />} />
      <Route path="/instructor/:userId" element={<InstructorDetail />} />
      <Route path="/payment/result" element={<PaymentClassResult />} />
    </Routes>
  );
}

export default App; 