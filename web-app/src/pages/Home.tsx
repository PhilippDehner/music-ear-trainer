import React from 'react';
import { Button, Container } from 'react-bootstrap';


import en from "../languages/en.json";
import de from "../languages/de.json";

function Home() {
	return (
		<Container className='.me-3'>
			<h1>Music Ear Trainer</h1>
			<p>Nutze den Music Ear Trainer zum Trainieren des musikalischen Gehörs!</p>
		</Container>

	);
}

export default Home;