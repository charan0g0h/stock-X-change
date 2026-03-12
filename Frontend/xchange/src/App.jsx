import Discover from "./Pages/Discover";
import LoginPage from "./LoginPage/Loginpage";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Portfolio from "./Pages/Portfolio";
import Stock from "./Pages/Stock";
import Payment from "./Pages/Payment";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route path="/home" element={<Home />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="discover" element={<Discover />}/>
        <Route path="portfolio" element={<Portfolio/>}/>
        <Route path="payment" element={<Payment/>}></Route>
        <Route path="stock/:company" element={<Stock/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
