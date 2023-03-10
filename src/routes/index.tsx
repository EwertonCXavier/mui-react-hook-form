import { Navigate, Route, Routes } from 'react-router-dom';
import { Gateway } from '../pages/Gateway';
import { ManageGateways } from '../pages/Gateway/ManageGateways';

export const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Gateway />} />
      <Route path="/gateway/:id" element={<Gateway />} />
      <Route path="/manage-gateways" element={<ManageGateways />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
