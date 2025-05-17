import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./components/main/main";
import Cam from "./components/cam/cam";
import Loader from "./components/Loader";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/cam" element={<Cam />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
