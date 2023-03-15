import { Navigate, Route, Routes } from 'react-router-dom';
import { Gateway } from '../pages/Gateway';
import { ManageGateways } from '../pages/Gateway/ManageGateways';

import { useAppThemeContext } from "../components/context";

export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext();
};

export const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Gateway />} />
      <Route path="/gateway/:id" element={<Gateway />} />
      <Route path="/manage-gateways" element={<ManageGateways />} />
      <Route path="/dashboard" element={<h1>dashboard</h1>} />
      <Route path="/devices" element={<h1>devices</h1>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
