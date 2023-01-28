import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ToneSelector from "./ToneSelector";
import { Tone } from "../types/Tone";
import { ToneRange } from "../types/ToneRange";

class Settings {
	Volume: number = 90;
	ToneRange: ToneRange = new ToneRange();
}

interface Props {
	settings: Settings;
	OnChanged(settings: Settings): void;
}

function GeneralSettings(props: Props) {
	let settings = props.settings;
	const [volume, setVolume] = useState(80);
	const [initialized, setInitialized] = useState(false);

	const [lowestTone, setLowestTone] = useState(
		props.settings.ToneRange.LowestTone
	);
	const [highestTone, setHighestTone] = useState(
		props.settings.ToneRange.HighestTone
	);

	const VolumeSet = (value: number) => {
		props.settings.Volume = value;
		setVolume(value);
		props.OnChanged(settings);
	};

	const LowestToneSet = (value: Tone) => {
		props.settings.ToneRange.LowestTone = value!;
		setLowestTone(value);
		props.OnChanged(settings);
		console.debug("lowest set", value, lowestTone, props.settings.ToneRange)
	};

	const HighestToneSet = (value: Tone) => {
		props.settings.ToneRange.HighestTone = value!;
		setHighestTone(value)
		props.OnChanged(settings);
	};

	if (!initialized) {
		setInitialized(true);
		props.OnChanged(settings);
	}

	return (
		<div>
			<Container className="mt-3">
				{/* <Row>
					<Col md="auto">
						<Form.Label>Volume {volume}%</Form.Label>
					</Col>
					<Col>
						<Form.Range
							onChange={(e) => VolumeSet(Number(e.target.value))}
							value={volume}
							min={0}
							max={100}
						/>
					</Col>
				</Row> */}
				<Row  md={'auto'}>
					<Col>
						<ToneSelector
							label="Tiefster Ton"
							OnToneSelected={LowestToneSet}
							toneRange={new ToneRange(undefined, props.settings.ToneRange.HighestTone)}
							defaultValue={lowestTone.Name}
						/>
					</Col>
					<Col>
						<ToneSelector
							label="Höchster Ton"
							OnToneSelected={HighestToneSet}
							toneRange={new ToneRange(props.settings.ToneRange.LowestTone, undefined)}
							defaultValue={highestTone.Name}
						/>
					</Col>
				</Row>
			</Container>
			<hr />
		</div>
	);
}

export default GeneralSettings;
export { Settings };
