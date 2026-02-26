// src/configs/routes/Routes.jsx
import { Navigate } from "react-router-dom";
import Home from "@/views/home/Home.jsx";
import UserList from "@/views/users/UserList.jsx";
import UserCreate from "@/views/users/UserCreate";

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
    element: <UserCreate />, // Lo crearemos pronto
  },
  /*
  {
    path: "/users/edit/:id",
    access: ["public"],
    element: <UserForm />, // Reutilizaremos el mismo formulario
  },
  */
  

  // 404 - Not Found
  { 
    path: "*", 
    element: <div style={{ textAlign: "center", marginTop: "50px" }}><h2>404 - Página no encontrada</h2></div> 
  },
];

export default Routes;