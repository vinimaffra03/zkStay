import { BrowserRouter, Routes, Route } from "react-router-dom";
// Temporarily disable Starknet to isolate the issue
// import { StarknetConfig, publicProvider } from "@starknet-react/core";
// import { sepolia } from "starknet";
import Home from "./pages/Home.jsx";
import { Login } from "./components/Login";
import Info from "./pages/Info.jsx";
import StarknetSimple from "./StarknetSimple.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/info/:id" element={<Info />} />
        <Route path="/starknet-simple" element={<StarknetSimple />} />
      </Routes>
    </BrowserRouter>
  );
}
