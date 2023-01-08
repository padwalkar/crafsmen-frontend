import React from "react";
// import logo from './logo.svg';
// import './App.css';
import './assets/css/style.css';
import 'remixicon/fonts/remixicon.css'
import MainLayout from "./shared/layout/mainLayout";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;
