import React from "react";
import PageContainer from "./pageContainer.js";
import { BrowserRouter, Route } from "react-router-dom";

import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

// import Sidebar from './components/Sidebar/sidebar';

function App() {
  return (
    <BrowserRouter>
      {/* <Sidebar /> */}
      <Route exact path="/" component={PageContainer} />
    </BrowserRouter>
  );
}

export default App;
