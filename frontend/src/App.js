import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Adminoverviewpage from './pages/Admin/Adminoverviewpage';
import AdminMyJob from "./pages/Admin/Admin_my_job"; 


function App() {
  return (
      <Router>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={< Home/>} />
          <Route path="/Admin-over-viewpage" element={<Adminoverviewpage/>} />
          <Route path="/Admin_my_job" element={<AdminMyJob />} />
        </Routes>
      </Router>
  );
}

export default App;
