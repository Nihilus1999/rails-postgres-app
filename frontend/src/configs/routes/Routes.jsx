// src/configs/routes/Routes.jsx
import { Navigate } from "react-router-dom";
import Home from "@/views/home/Home.jsx";
import UserList from "@/views/users/UserList.jsx";
import UserCreate from "@/views/users/UserCreate";
import UserEdit from "@/views/users/UserEdit";

const Routes = [
  {
    path: "/",
    access: ["public"],
    element: <Home />,
  },

  // --- Módulo de Usuarios ---
  {
    path: "/users",
    access: ["public"],
    element: <UserList />,
  },
  
  {
    path: "/users/create",
    access: ["public"],
    element: <UserCreate />,
  },

  {
    path: "/users/edit/:id",
    access: ["public"],
    element: <UserEdit />,
  },
  

  // 404 - Not Found
  { 
    path: "*", 
    element: <div style={{ textAlign: "center", marginTop: "50px" }}><h2>404 - Página no encontrada</h2></div> 
  },
];

export default Routes;