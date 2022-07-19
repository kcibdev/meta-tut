import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";

import useConnectStore from "./store/useConnectStore";

const App = () => {
  const { checkIfWalletConnected, connectedAccount, connectedAccountBalance } =
    useConnectStore((state) => state);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
