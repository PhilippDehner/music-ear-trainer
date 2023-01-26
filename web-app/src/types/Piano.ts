import { Piano as ToneJsPiano } from "@tonejs/piano";
import { Tone } from "./Tone";

export class Piano extends ToneJsPiano {
  private currentPressedKeys: Tone[] = [];

  constructor() {
    super({ velocities: 100 });
  }

  keyDown({ note, midi, time, velocity }: any): this {
    this.addKey2PressedKeys(note);
    return super.keyDown({ note, midi, time, velocity });
  }

	addKey2PressedKeys(key: string) {
		if (this.currentPressedKeys.find(x => x.Name === key)==null) {
			this.currentPressedKeys.push(new Tone(undefined, key))
		}
	}
}
