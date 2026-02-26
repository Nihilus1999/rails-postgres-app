import { BrowserRouter } from "react-router-dom";
import AppRoutesBuilder from "@/configs/routes/AppRoutesBuilder.jsx";
import "@/assets/styles/app.scss";

function AppWrapper() {
  return <AppRoutesBuilder />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}