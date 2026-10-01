# resQ System Architecture & Call Intelligence Flow

## Universal Entry Point: Emergency Call
```
📞 Emergency Call ──► Call Gateway (SIP / Asterisk / Webhook) ──► Audio Stream
                                                                      │
                                                                      ▼
🚨 Incident Engine ◄── Call Intelligence (FastAPI + Whisper + Ollama) ◄┘
         │
         ├──► 🚑 Dispatch Integration
         ├──► 🧑‍⚕️ Verified First Responders (Dynamic Search Radius)
         └──► 🛟 Community Saver Network
```

## Subsystem Overview
1. **`services/backend`**: FastAPI Python server executing `faster-whisper` (Whisper `large-v3-turbo`) speech-to-text, Pydantic extraction schemas, and multi-source location resolver.
2. **`apps/dispatcher-web`**: Multi-panel desktop command center built with React + Vite + Tailwind CSS.
3. **`apps/responder-app`**: Native-capable mobile application built with React + Capacitor for Android/iOS.
4. **`apps/citizen-app`**: Optional SOS mobile channel.
5. **`packages/*`**: Shared monorepo packages for `types`, `config`, `validation`, `ui`, and `firebase`.
