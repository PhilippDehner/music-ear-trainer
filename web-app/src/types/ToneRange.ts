import { Tone } from "./Tone";

class ToneRange {
	private lowestPianoTone = new Tone(9);
	private _lowestTone = this.lowestPianoTone;
	public get LowestTone() {
		return this._lowestTone;
	}
	public set LowestTone(lowestTone: Tone) {
		if (lowestTone.ToneNumber > this.HighestTone.ToneNumber) {
			this._lowestTone = new Tone(this.HighestTone.ToneNumber);
		} else {
			this._lowestTone = lowestTone;
		}
	}

	private highestPianoTone = new Tone(96);
	private _highestTone = this.highestPianoTone;
	public get HighestTone() {
		return this._highestTone;
	}
	public set HighestTone(highestTone: Tone) {
		if (highestTone.ToneNumber < this.LowestTone.ToneNumber) {
			this._highestTone = new Tone(this.LowestTone.ToneNumber);
		} else {
			this._highestTone = highestTone;
		}
	}

	public get Tones(): Tone[] {
		let tones: Tone[] = [];
		for (
			let i = this.LowestTone.ToneNumber;
			i <= this.HighestTone.ToneNumber;
			i++
		) {
			tones.push(new Tone(i));
		}
		return tones;
	}

	constructor(lowestTone?: Tone, highestTone?: Tone) {
		if (lowestTone == null && highestTone == null) return;
		this.LowestTone = lowestTone != null ? lowestTone! : this.lowestPianoTone;
		this.HighestTone = highestTone != null ? highestTone! : this.highestPianoTone;
	}

	public IsInRange(TestingTone: Tone) {
		return this.Tones.find((x) => x.Equals(TestingTone)) != null;
	}

	public GetRandomTone() {
		return new Tone(
			Math.floor(
				Math.random() *
				(this.HighestTone.ToneNumber - this.LowestTone.ToneNumber + 1) +
				this.LowestTone.ToneNumber
			)
		);
	}
}

export { ToneRange };
