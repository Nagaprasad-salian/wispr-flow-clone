let socket: WebSocket | null = null;

const API_KEY = import.meta.env.VITE_DEEPGRAM_API_KEY;

export function startDeepgram(
  onTranscript: (text: string) => void
) {
  if (!API_KEY) {
    alert("Deepgram API key not found");
    return;
  }

  socket = new WebSocket(
    "wss://api.deepgram.com/v1/listen?encoding=linear16&sample_rate=16000&language=en",
    ["token", API_KEY]
  );

  socket.onopen = () => {
    console.log("✅ Deepgram WebSocket connected");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const transcript = data.channel?.alternatives?.[0]?.transcript;

    if (transcript && transcript.trim().length > 0) {
      onTranscript(transcript);
    }
  };

  socket.onerror = (err) => {
    console.error("❌ Deepgram error", err);
  };

  socket.onclose = () => {
    console.log("🔌 Deepgram WebSocket closed");
  };
}

export function sendAudioToDeepgram(audio: Int16Array) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(audio.buffer);
  }
}

export function stopDeepgram() {
  if (socket) {
    socket.close();
    socket = null;
  }
}
