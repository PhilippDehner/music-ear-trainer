import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Piano } from "@tonejs/piano";

import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Pitch from "./pages/Pitch";
import { useState } from "react";

let init = true;
let piano = new Piano({
	velocities: 1,
	release: true,
	pedal: true
});

function App() {
	const [pianoReadyState, setPianoReadyState] = useState(false);

	if (init) {
		piano.toDestination(); //connect it to the speaker output
		piano.load().then(_ => {
			init = false;
			setPianoReadyState(true);
			console.info("Piano loaded");
		});
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="Pitch" element={<Pitch piano={piano} pianoLoaded={pianoReadyState} />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
