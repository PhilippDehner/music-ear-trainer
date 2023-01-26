import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import GeneralSettings, { Settings } from "../components/GeneralSettings";
import { Tone } from "../types/Tone";
import ToneSelector from "../components/ToneSelector";
import { Piano } from "@tonejs/piano";

let generalSettings: Settings = new Settings();
interface Props {
	piano: Piano;
}

enum Result {
	undefined,
	success,
	toneRight,		// Tone right, level wrong
	false
}

function Pitch(props: Props) {
	const [showResult, setShowResult] = useState(false);
	const [tonePlaying, setTonePlaying] = useState(
		generalSettings.ToneRange.GetRandomTone()
	);
	const [activePlayButton, setActivePlayButton] = useState<boolean>(true);
	const [playedOnce, setPlayedOnce] = useState<boolean>(false);
	const [selectedTone, setSelectedTone] = useState<Tone | undefined>(undefined);
	const [result, setResult] = useState<Result>(Result.undefined);

	const sleep = (seconds: number) => {
		return new Promise(resolve => setTimeout(resolve, seconds * 1000))
	}

	function play() {
		tonePlaying.play(props.piano, generalSettings.Volume);
		setPlayedOnce(true);
		setActivePlayButton(false);
		sleep(5).then(r => {
			stopPlaying();
		})
	}

	function stopPlaying() {
		setActivePlayButton(true)
		tonePlaying.keyUp(props.piano);
	}

	function SuggestedToneSelected(tone: Tone): void {
		setSelectedTone(tone);
	}

	function ClickShowSolution() {
		setShowResult(true);
		if (tonePlaying.Equals(selectedTone!)) setResult(Result.success);
		else if (tonePlaying.Tone === selectedTone?.Tone) setResult(Result.toneRight);
		else setResult(Result.false);
		console.info("Show solution");
	}

	function GeneralSettingsChanged() {
		console.debug("General settings changed");
		if (!generalSettings.ToneRange.IsInRange(tonePlaying)) {
			setTonePlaying(generalSettings.ToneRange.GetRandomTone());
		}
	}

	function NewToneSet() {
		setTonePlaying(generalSettings.ToneRange.GetRandomTone());
		setShowResult(false);
		stopPlaying();
}

	return (
		<>
			<GeneralSettings
				settings={generalSettings}
				OnChanged={GeneralSettingsChanged}
			/>
			<Stack direction="vertical">
				<Container>
					<Row>
						<Col>
							<Button disabled={!activePlayButton} onClick={play}>Abspielen</Button>
						</Col>
						<Col>
							<ToneSelector
								label={"Gehörter Ton"}
								disabled={!playedOnce}
								toneRange={generalSettings!.ToneRange}
								OnToneSelected={SuggestedToneSelected}
								defaultValue="Wähle die Tonhöhe aus, die Du gehört hast"
							/>
						</Col>
					</Row>
				</Container>
				<Container>
					<Row>
						<Col>
							<Button
								disabled={!(!showResult && selectedTone)}
								onClick={ClickShowSolution}
							>
								Lösung anzeigen
							</Button>
						</Col>
						<Col>
							{(() => {
								let alert;
								switch (result) {
									case Result.success:
										alert = <Alert variant="success">Richtige Tonhöhe!</Alert>; break;
									case Result.toneRight:
										alert = alert = <Alert variant="warning">Richtiger Ton, falsche Oktave. Es war {tonePlaying.Name}.</Alert>;
										break;
									case Result.false:
										alert = <Alert variant="danger">Falsche Tonhöhe! Es war {tonePlaying.Name}.</Alert>;
										break;
									default: <Alert hidden />;
								}
								return showResult ? alert
									: <></>;
							})()}
						</Col>
					</Row>
				</Container>
				<Container className="mt-3">
					{/* <Row>
						<Col> */}
					<Button disabled={!playedOnce} onClick={NewToneSet}>
						Neuer Ton
					</Button>
					{/* </Col>
					</Row> */}
				</Container>
			</Stack>
		</>
	);
}

export default Pitch;
