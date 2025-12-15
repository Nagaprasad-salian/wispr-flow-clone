# Tauri + React + Typescript

This template should help get you started developing with Tauri, React and Typescript in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

# Wispr Flow Clone – Voice to Text Desktop App

A cross-platform desktop application built using **Tauri** and **React** that converts voice input into real-time text using **Deepgram Speech-to-Text API**.

This project is a functional clone of the core workflow of **Wispr Flow**, focusing on voice input, transcription, and clean architecture rather than UI polish.

---

## 🚀 Features

- Push-to-Talk voice input
- Microphone permission handling
- Real-time speech-to-text transcription
- Live display of transcribed text
- Start/Stop recording controls
- Error handling for permissions and API issues
- Cross-platform desktop app (Windows, macOS, Linux via Tauri)

---

## 🛠 Tech Stack

- **Tauri** – Desktop application framework
- **React + TypeScript** – Frontend UI
- **Vite** – Frontend bundler
- **Deepgram API** – Real-time speech recognition
- **Web Audio API** – Microphone capture and audio processing

---

## 🧠 Architecture Overview

The application is structured with clear separation of concerns:

src/
├── App.tsx # UI and user interaction
├── audioRecorder.ts # Microphone access & audio capture
├── deepgramService.ts # WebSocket connection to Deepgram


### Responsibilities
- **UI Layer**: Handles user actions and displays transcription
- **Audio Layer**: Captures and processes microphone audio
- **Transcription Layer**: Streams audio to Deepgram and receives text

This separation makes the code easier to maintain and extend.

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+
- Rust (via rustup)
- Tauri CLI
- Deepgram account & API key
- Windows: Visual Studio C++ Build Tools (MSVC)

---

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/Nagaprasad-salian/wispr-flow-clone.git
cd wispr-flow-clone
```


```2. Install dependencies:

npm install
```
```3. Create environment file:

VITE_DEEPGRAM_API_KEY=your_deepgram_api_key_here

```
```4. Run the app:

npm run tauri dev
