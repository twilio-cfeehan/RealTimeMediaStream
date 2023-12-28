const EventEmitter = require("events");
const Speech = require("@google-cloud/speech");
const speech = new Speech.SpeechClient();

class TranscriptionService extends EventEmitter {
	constructor() {
		super();
		this.stream = null;
		this.streamCreatedAt = null;
	}

	send(payload, fromServer = false) {
		if (fromServer) {
		  console.log('Message sent from server to client:', payload);
		}
		this.getStream().write(payload);
	  }

	close() {
		if (this.stream) {
			this.stream.destroy();
		}
	}

	newStreamRequired() {
		if (!this.stream) {
			return true;
		} else {
			const now = new Date();
			const timeSinceStreamCreated = now - this.streamCreatedAt;
			return timeSinceStreamCreated / 1000 > 60;
		}
	}

	getStream() {
		if (this.newStreamRequired()) {
			if (this.stream) {
				this.stream.destroy();
			}

			var request = {
				config: {
					encoding: "MULAW",
					sampleRateHertz: 8000,
					languageCode: "en-US",
					model: "phone_call",
					use_enhanced: true,
				},
				interimResults: true,
			};

			this.streamCreatedAt = new Date();
			this.stream = speech
				.streamingRecognize(request)
				.on("error", (err) =>
					console.error(`TranscriptionService error: ${err}`)
				)
				.on("data", (data) => {
					console.log("TranscriptionService data:", JSON.stringify(data));
					const result = data.results[0];
					if (result === undefined || result.alternatives[0] === undefined) {
						return;
					}
					if (result.isFinal) {
						console.log(
							"TranscriptionService final result:",
							JSON.stringify(result)
						);
						this.emit("transcription", result.alternatives[0]);
					} else {
						console.log(
							"TranscriptionService interim result:",
							JSON.stringify(result)
						);
						this.emit("interim-transcription", result.alternatives[0]);
					}
				});
		}

		return this.stream;
	}
}

module.exports = TranscriptionService;
