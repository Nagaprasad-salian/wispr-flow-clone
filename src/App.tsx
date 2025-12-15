import { useState } from "react";
import { startAudioRecording, stopAudioRecording } from "./audioRecorder";
import {
  startDeepgram,
  sendAudioToDeepgram,
  stopDeepgram,
} from "./deepgramService";

function App() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startRecording = async () => {
    startDeepgram((text) => {
      setTranscript((prev) => prev + " " + text);
    });

    await startAudioRecording((audioChunk) => {
      sendAudioToDeepgram(audioChunk);
    });

    setRecording(true);
  };

  const stopRecording = () => {
    stopAudioRecording();
    stopDeepgram();
    setRecording(false);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Wispr Flow – Voice to Text</h1>

      <button
        onClick={recording ? stopRecording : startRecording}
        style={{
          padding: "14px 24px",
          fontSize: "16px",
          backgroundColor: recording ? "red" : "green",
          color: "white",
          border: "none",
          borderRadius: "8px",
        }}
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </button>

      <p>Status: {recording ? "🎙 Recording…" : "Idle"}</p>

      <textarea
        value={transcript}
        readOnly
        rows={6}
        style={{ width: "100%", marginTop: "20px" }}
        placeholder="Transcribed text will appear here..."
      />
    </div>
  );
}

export default App;
