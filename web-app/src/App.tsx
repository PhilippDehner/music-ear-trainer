import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Piano } from "@tonejs/piano";

import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Pitch from "./pages/Pitch";

function App() {
  let piano = new Piano();
  piano.toDestination(); //connect it to the speaker output
  piano.load().then(() => {
    console.log("loaded!");
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Pitch" element={<Pitch piano={piano} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
