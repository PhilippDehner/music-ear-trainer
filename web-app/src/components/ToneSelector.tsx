import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { Tone } from "../types/Tone";
import { ToneRange } from "../types/ToneRange";

interface Props {
  defaultValue?: string;
  label: string;
  toneRange: ToneRange;
  disabled?: boolean;
  OnToneSelected(tone: Tone): void;
}

function ToneSelector(props: Props) {
  const ToneSet = (value: string) => {
    let tone = new Tone(undefined, value);
    console.debug("Tone selected", tone);
    props.OnToneSelected(tone);
  };

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text>{props.label}</InputGroup.Text>
      <Form.Select
        disabled={props.disabled}
        onChange={(e) => ToneSet(e.target.value)}
        defaultValue={props.defaultValue}
      >
        {props.toneRange.Tones.find((x) => x.Name === props.defaultValue) ===
        undefined ? (
          <option disabled key={props.defaultValue}>
            {props.defaultValue}
          </option>
        ) : (
          ""
        )}
        {props.toneRange.Tones.map((v: Tone) => (
          <option key={v.ToneNumber}>{v.Name}</option>
        ))}
      </Form.Select>
    </InputGroup>
  );
}

export default ToneSelector;
