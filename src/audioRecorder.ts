let audioContext: AudioContext | null = null;
let mediaStream: MediaStream | null = null;
let processor: ScriptProcessorNode | null = null;

export async function startAudioRecording(
  onAudioData: (data: Int16Array) => void
) {
  mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

  audioContext = new AudioContext({ sampleRate: 16000 });
  const source = audioContext.createMediaStreamSource(mediaStream);

  processor = audioContext.createScriptProcessor(4096, 1, 1);

  processor.onaudioprocess = (event) => {
    const input = event.inputBuffer.getChannelData(0);
    const buffer = new Int16Array(input.length);

    for (let i = 0; i < input.length; i++) {
      buffer[i] = Math.max(-1, Math.min(1, input[i])) * 0x7fff;
    }

    onAudioData(buffer);
  };

  source.connect(processor);
  processor.connect(audioContext.destination);
}

export function stopAudioRecording() {
  if (processor) {
    processor.disconnect();
    processor = null;
  }

  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }

  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => track.stop());
    mediaStream = null;
  }
}
