import { Piano } from "@tonejs/piano";

class Tone {
	public get Name() {
		return this.Tone + this.Level.toString();
	}
	private set Name(name: string) {
		let tone: string = "";
		let level: number = 0;
		let stopper: boolean = false;
		name.split("").forEach((c, i) => {
			if (!stopper) {
				if (!this.isNumeric(c)) {
					tone += c;
				} else {
					level = Number(name.slice((name.length - i) * -1));
					stopper = true;
				}
			}
		});
		this.ToneNumber = level * 12 + this.getToneNumber(tone);
	}

	public get Level(): number {
		return Math.floor(this.ToneNumber / 12);
	}

	public get Tone(): string {
		return this.getTone(this.ToneNumber % 12);
	}

	public ToneNumber: number = -1;

	constructor(toneNumber?: number, name?: string) {
		if (toneNumber == null && name == null) {
			return;
		}
		if (toneNumber != null) {
			this.ToneNumber = toneNumber!;
		} else {
			this.Name = name!;
		}
	}

	public play(piano: Piano, volume: number = 100, secondsplaying: number | undefined = undefined) {
		// piano.pedalDown();
		piano.keyDown({
			note: this.Name,
			// velocity: 2//Math.round(volume / 20)
		});
		if (secondsplaying != null && secondsplaying > 0)
			piano.keyUp({ note: this.Name, time: "+" + secondsplaying });
		console.info("Played tone", this.Name);
	}

	public keyUp(piano: Piano) {
		piano.keyUp({
			note: this.Name,
			// time: "+1"
		});
	}

	public Equals(tone: Tone) {
		return this.ToneNumber === tone.ToneNumber;
	}

	//#region private methods

	private isNumeric(s: string) {
		return /^\d+$/.test(s);
	}

	private getToneNumber(tone: string): number {
		switch (tone) {
			case "C":
				return 0;
			case "Db":
			case "Cis":
				return 1;
			case "D":
				return 2;
			case "Eb":
			case "Dis":
				return 3;
			case "E":
				return 4;
			case "F":
				return 5;
			case "Gb":
			case "Fis":
				return 6;
			case "G":
				return 7;
			case "Ab":
			case "Gis":
				return 8;
			case "A":
				return 9;
			case "Bb":
			case "Ais":
				return 10;
			case "B":
				return 11;
			default:
				return -1;
		}
	}

	private getTone(toneNumber: number): string {
		switch (toneNumber) {
			case 0:
				return "C";
			case 1:
				return "Db";
			case 2:
				return "D";
			case 3:
				return "Eb";
			case 4:
				return "E";
			case 5:
				return "F";
			case 6:
				return "Gb";
			case 7:
				return "G";
			case 8:
				return "Ab";
			case 9:
				return "A";
			case 10:
				return "Bb";
			case 11:
				return "B";
			default:
				return "";
		}
	}

	//#endregion private methods
}

export { Tone };
