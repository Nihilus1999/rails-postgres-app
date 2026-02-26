// src/configs/routes/AppRoutesBuilder.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import appRoutes from "@/configs/routes/Routes.jsx";

const AppRoutesBuilder = () => {
  const token = localStorage.getItem("token");

  const buildRoute = (route) => {
    const access = route.access || [];

    if (access.includes("guest") && token) {
      return <Navigate to="/" replace />;
    }

    if (access.includes("auth") && !token) {
      return <Navigate to="/login" replace />;
    }

    return route.element;
  };

  return (
    <Routes>
      {appRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={buildRoute(route)}
        />
      ))}
    </Routes>
  );
};

export default AppRoutesBuilder;