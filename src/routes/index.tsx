import { Navigate, Route, Routes } from "react-router-dom";
import { Gateway } from "../pages/Gateway";

export const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Gateway />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
