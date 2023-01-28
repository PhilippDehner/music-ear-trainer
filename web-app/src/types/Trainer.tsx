import React, { ReactNode, useState } from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Settings } from "../components/GeneralSettings";
import { Tone } from "../types/Tone";
import { Piano } from "@tonejs/piano";
import { Spinner } from "react-bootstrap";

let generalSettings: Settings = new Settings();

interface Props {
	piano: Piano;
	tonesPlaying: Tone[];
	playTonesSimultaneously: boolean;
	selector: ReactNode;
	solutionSelected: boolean;
	pianoLoaded: boolean;
	ShowSolution(): ReactNode;
	CreateNewTask(): void;
	SetSelectorStatus(state: boolean): void;
}

const WaitBetweenTones = 0.5;
const MinPlayTime = 3;

function Trainer(props: Props) {
	const [showResult, setShowResult] = useState(false);
	const [activePlayButton, setActivePlayButton] = useState<boolean>(true);
	const [playedOnce, setPlayedOnce] = useState<boolean>(false);
	const [solution, setSolution] = useState<ReactNode>(undefined);

	const sleep = (seconds: number) => {
		return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
	};

	function play() {
		console.debug("Trainer: play", props.tonesPlaying);
		playTones(props.tonesPlaying, 0)
		setPlayedOnce(true);
		setActivePlayButton(false);
		sleep(MinPlayTime).then(r => {
			stopPlaying();
		})
	}

	function playTones(tones: Tone[], wait: number): void {
		props.SetSelectorStatus(true)
		tones[0].play(props.piano, generalSettings.Volume);
		if (tones.length > 1) {
			sleep(wait).then(r => {
				playTones(tones.slice((tones.length - 1) * -1), props.playTonesSimultaneously ? 0 : WaitBetweenTones);
			})
		}
	}

	function stopPlaying() {
		console.debug("Trainer: stopPlaying function");
		props.tonesPlaying.forEach((tone) => {
			tone.keyUp(props.piano);
		});
		setActivePlayButton(true);
	}

	function ClickShowSolution() {
		console.debug("Trainer: ClickShowSolution");
		setShowResult(true);
		setSolution(props.ShowSolution());
		console.info("Show solution");
	}

	function newTask(): void {
		props.CreateNewTask();
		props.SetSelectorStatus(false)
		setActivePlayButton(true);
		setShowResult(false)
	}

	return (
		<>
			<Stack direction="vertical">
				<Container>
					<Row>
						<Col>
							<Button disabled={!activePlayButton || !props.pianoLoaded} onClick={play}>
								<Stack direction="horizontal">
									<Spinner
										hidden={props.pianoLoaded}
										as="span"
										animation="border"
										size="sm"
										role="status"
										aria-hidden="true"
									/>
									<div></div>
									Abspielen
								</Stack>
							</Button>
						</Col>
						<Col>{props.selector}</Col>
					</Row>
				</Container>
				<Container>
					<Row>
						<Col>
							<Button
								disabled={!(!showResult && props.solutionSelected)}
								onClick={ClickShowSolution}
							>
								Lösung anzeigen
							</Button>
						</Col>
						<Col>{showResult ? solution : <></>}</Col>
					</Row>
				</Container>
				<Container className="mt-3">
					{/* <Row>
						<Col> */}
					<Button disabled={!playedOnce} onClick={newTask}>
						Neuer Ton
					</Button>
					{/* </Col>
					</Row> */}
				</Container>
			</Stack>
		</>
	);
}

export default Trainer;
