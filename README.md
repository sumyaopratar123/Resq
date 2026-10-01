# resQ — Call-First Emergency Response Platform

<div align="center">

![resQ Banner](https://img.shields.io/badge/resQ-One%20call.%20Coordinated%20response.-E63946?style=for-the-badge&logo=shield&logoColor=white)

[![pnpm](https://img.shields.io/badge/pnpm-11.10.0-F69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Whisper](https://img.shields.io/badge/Whisper-large--v3--turbo-000000?style=flat-square&logo=openai&logoColor=white)](https://github.com/openai/whisper)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%7C%20Firestore%20%7C%20RTDB-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com)
[![Capacitor](https://img.shields.io/badge/Capacitor-7.0-1199EE?style=flat-square&logo=capacitor&logoColor=white)](https://capacitorjs.com)

**Universal entry point emergency coordination infrastructure powered by AI speech intelligence, real-time spatial matching, and clinical responder guidance.**

[Architecture](#-system-architecture) • [Key Features](#-key-features) • [Monorepo Structure](#-monorepo-structure) • [Getting Started](#-getting-started) • [Security](#-security--authorization)

</div>

---

## 📞 Universal Product Vision

**resQ** operates without requiring the person in danger or distress to have the resQ mobile application installed. 

The primary entry point is an emergency phone call. When an emergency call reaches the platform:
1. **Call Gateway** intercepts the audio stream (via SIP, Asterisk, FreeSWITCH, or Webhooks).
2. **Call Intelligence Engine** transcribes multilingual speech using local Whisper `large-v3-turbo` models.
3. **Structured Entity Extractor** identifies emergency type, severity, patient symptoms, required skills, and location text.
4. **Multi-Source Location Resolver** calculates precise coordinates and confidence scores.
5. **Incident Engine** triggers parallel emergency service dispatch, verified responder matching with dynamic radius expansion, and community saver alerts.

```mermaid
flowchart TD
    A["📞 Emergency Call"] --> B["☎️ Call Gateway (SIP / Webhook)"]
    B --> C["🎙️ Audio Stream & VAD"]
    C --> D["🧠 Call Intelligence Engine"]
    
    subgraph Intelligence ["Call Intelligence (FastAPI + Whisper + LLM)"]
        D --> D1["Whisper STT (large-v3-turbo)"]
        D1 --> D2["Structured LLM Entity Extraction"]
        D1 --> D3["Multi-Source Location Resolver"]
    end

    D2 & D3 --> E["🚨 Incident Engine (FSM)"]
    
    E --> F1["🚑 Dispatch Integration"]
    E --> F2["🧑‍⚕️ Verified Responder Matching"]
    E --> F3["🛟 Saver Alert"]

    F1 & F2 & F3 --> G["📡 Realtime Core (Firebase RTDB + Firestore)"]
    G --> H1["🖥️ Dispatcher Web Console"]
    G --> H2["📱 Responder Mobile App (Capacitor)"]
    G --> H3["📱 Citizen App (SOS)"]
```

---

## ⚡ Key Features

### 1. 🧠 Call Intelligence Engine (`services/backend`)
- **Multilingual Speech-to-Text**: Powered by `faster-whisper` running CTranslate2 runtime optimized for Whisper `large-v3-turbo` with automatic language identification.
- **Deterministic AI Extractor**: Converts raw audio transcripts into strict Pydantic JSON schemas (`emergencyType`, `severity`, `patientState`, `bleeding`, `requiredSkills`).
- **Location Resolver**: Fuses telecom metadata, spoken landmarks, and geocoding to compute lat/lng coordinates with confidence scoring.

### 2. 🖥️ Multi-Panel Dispatcher Command Center (`apps/dispatcher-web`)
- **Operations Dashboard**: Designed for high-stress command center environments with dark editorial UI theme.
- **Interactive GIS Map**: Spatial view of active emergency locations, nearby responders, ambulances, and hospital capacity.
- **Live Stream Review**: Displays live audio waveforms, streaming transcripts, confidence scores, and manual confirmation overrides.

### 3. 📱 Verified Responder Mobile App (`apps/responder-app`)
- **Capacitor Native Integration**: Web-first React app wrapped into Android/iOS with native GPS geolocation and push notifications (`FCM`).
- **Dynamic Search Radius**: Responder alerts expand progressively (500m → 1km → 2km → 5km) based on skill compatibility and distance.
- **Voice TTS First-Aid Protocols**: Medically reviewed step-by-step guidance for adult, child, infant, and species scenarios with Web Speech Synthesis playback.

### 4. 🏆 Server-Validated Rewards & Saver Ledger (`functions/`)
- **Audit-Backed Points**: Points and saver badges awarded strictly server-side via Firebase Cloud Functions transactions (`ACCEPTED_INCIDENT`: +10, `ARRIVED_ON_SCENE`: +20, `VERIFIED_FIRST_RESPONSE`: +40, `HANDOFF_COMPLETED`: +30).

---

## 📁 Monorepo Structure

```
resQ/
├── apps/
│   ├── dispatcher-web/        # Next/Vite React Desktop Operations Command Center
│   ├── responder-app/         # React + Capacitor Mobile App for First Responders
│   └── citizen-app/           # React + Capacitor Mobile App for Citizens (SOS)
│
├── services/
│   └── backend/               # Python FastAPI Call Intelligence & Audio Gateway Service
│       ├── app/
│       │   ├── api/v1/        # Endpoints for call processing, transcription, extraction
│       │   └── services/      # Whisper STT, Extraction, Location Resolver, Call Gateway
│       ├── main.py
│       └── requirements.txt
│
├── functions/                 # Firebase Cloud Functions (Node.js/TypeScript)
│   ├── src/rewards/           # Server-validated points & ledger transaction engine
│   └── src/auth/              # Custom user role claims mapping
│
├── packages/
│   ├── types/                 # Shared TypeScript interfaces (Incident, User, Responder, Call)
│   ├── config/                # System constants, Emergency types, Skill matrices, Roles
│   ├── validation/            # Zod validation schemas
│   ├── firebase/              # Firebase SDK initialization, Firestore & RTDB helpers
│   └── ui/                    # Shared UI component library (ResQLogo, Cards, Timeline)
│
├── firebase/                  # Security rules (firestore.rules, database.rules.json, storage.rules)
├── ai/                        # Prompts and JSON schemas for LLM emergency extractions
├── pnpm-workspace.yaml
├── turbo.json
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v22.x` or higher
- **pnpm**: `v11.x`
- **Python**: `v3.10` to `v3.14`
- **Git**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sumyaopratar123/Resq.git
   cd Resq
   ```

2. **Install monorepo dependencies**:
   ```bash
   pnpm install
   pnpm approve-builds --all
   ```

3. **Install Python backend dependencies**:
   ```bash
   cd services/backend
   pip install -r requirements.txt
   ```

---

## 🏃 Running the Platform

### 1. Start the FastAPI Call Intelligence Backend
```bash
cd services/backend
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
*API docs will be live at: `http://localhost:8000/docs`*

### 2. Start Frontends in Development Mode
From the monorepo root:
```bash
pnpm dev
```
- **Dispatcher Web Console**: `http://localhost:3000`
- **Responder Mobile App**: `http://localhost:3001`
- **Citizen SOS App**: `http://localhost:3002`

### 3. Type Checking & Production Build
```bash
# Type check all packages
pnpm check-types

# Build all production targets
pnpm build
```

---

## 🔒 Security & Authorization

- **Firestore Security Rules**: Role-based access control protecting citizen records, responder certifications, and operational transcripts.
- **Realtime Database Security Rules**: Restricts presence and location streams strictly to authenticated responders and assigned dispatchers.
- **Private Storage**: Certification documents are isolated in Firebase Storage with owner-only access.
- **Server-Side Rewards**: Points ledger updates are strictly forbidden from client mutation and enforced by Cloud Functions transactions.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
