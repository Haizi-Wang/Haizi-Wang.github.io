import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Eligibility from "./pages/Eligibility";
import Film from "./pages/Film";
import Home from "./pages/Home";
import Investing from "./pages/Investing";
import Process from "./pages/Process";
import Rechner from "./pages/Rechner";
import Withdrawal from "./pages/Withdrawal";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="eligibility" element={<Eligibility />} />
        <Route path="process" element={<Process />} />
        <Route path="investing" element={<Investing />} />
        <Route path="withdrawal" element={<Withdrawal />} />
        <Route path="rechner" element={<Rechner />} />
        <Route path="film" element={<Film />} />
      </Route>
    </Routes>
  );
}
