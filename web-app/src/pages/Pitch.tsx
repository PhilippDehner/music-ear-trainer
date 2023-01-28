import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import GeneralSettings, { Settings } from "../components/GeneralSettings";
import { Tone } from "../types/Tone";
import ToneSelector from "../components/ToneSelector";
import { Piano } from "@tonejs/piano";
import Trainer from "../types/Trainer";

let generalSettings: Settings = new Settings();
interface Props {
	piano: Piano;
	pianoLoaded: boolean;
}

enum Result {
	undefined,
	success,
	toneRight,		// Tone right, level wrong
	false
}

function Pitch(props: Props) {
	const [tonePlaying, setTonePlaying] = useState(
		generalSettings.ToneRange.GetRandomTone()
	);
	const [selectorState, setSelectorState] = useState<boolean>(false);
	const [selectedTone, setSelectedTone] = useState<Tone | undefined>(undefined);
	const [solutionSelected, setSolutionSelected] = useState(false);


	function stopPlaying() {
		console.debug("Pitch: stopPlaying function")
		tonePlaying.keyUp(props.piano);
	}

	function SuggestedToneSelected(tone: Tone): void {
		console.debug("Pitch: SuggestedToneSelected function")
		setSolutionSelected(true);
		setSelectedTone(tone);
	}

	function GeneralSettingsChanged() {
		console.debug("Pitch: General settings changed");
		if (!generalSettings.ToneRange.IsInRange(tonePlaying)) {
			setTonePlaying(generalSettings.ToneRange.GetRandomTone());
		}
	}

	function NewToneSet() {
		console.debug("Pitch: NewToneSet function")
		setTonePlaying(generalSettings.ToneRange.GetRandomTone());
		stopPlaying();
	}

	function getResult() {
		console.debug("Pitch: getResult function")
		let result = Result.undefined

		if (tonePlaying.Equals(selectedTone!)) result = Result.success;
		else if (tonePlaying.Tone === selectedTone?.Tone) result = Result.toneRight;
		else result = Result.false;

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
		return alert;
	}

	let selector = <ToneSelector
		label={"Gehörter Ton"}
		disabled={!selectorState}
		toneRange={generalSettings!.ToneRange}
		OnToneSelected={SuggestedToneSelected}
		defaultValue="Wähle die Tonhöhe aus, die Du gehört hast"
	/>

	return (
		<>
			<GeneralSettings
				settings={generalSettings}
				OnChanged={GeneralSettingsChanged}
			/>
			<Trainer piano={props.piano}
				tonesPlaying={[tonePlaying]}
				selector={selector}
				ShowSolution={getResult}
				CreateNewTask={NewToneSet}
				solutionSelected={solutionSelected}
				playTonesSimultaneously={false}
				SetSelectorStatus={setSelectorState}
				pianoLoaded={props.pianoLoaded} />
		</>
	);
}

export default Pitch;
