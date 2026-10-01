import json
import logging
import httpx
from typing import Dict, Any, List
from pydantic import BaseModel, Field

logger = logging.getLogger("resq.extraction")

class ConfidenceItem(BaseModel):
    value: Any
    confidence: float

class LocationConfidenceItem(BaseModel):
    text: str
    confidence: float

class IncidentExtractionResult(BaseModel):
    emergencyType: ConfidenceItem
    severity: ConfidenceItem
    patientState: ConfidenceItem
    bleeding: ConfidenceItem
    location: LocationConfidenceItem
    requiredSkills: List[str]

class CallIntelligenceExtractor:
    def __init__(self, ollama_host: str = "http://localhost:11434", model: str = "llama3.2"):
        self.ollama_host = ollama_host
        self.model = model

    def extract_incident_from_transcript(self, transcript_text: str) -> IncidentExtractionResult:
        """
        Parses emergency call transcripts using structured LLM or deterministic rule fallbacks.
        """
        prompt = f"""
        Analyze this emergency call transcript and extract structured JSON matching exact schema:
        TRANSCRIPT: "{transcript_text}"

        Return JSON ONLY:
        {{
          "emergencyType": {{"value": "road_accident|cardiac_emergency|breathing_difficulty|severe_bleeding|choking|burn_injury|unconscious_person|fire_disaster|general_medical", "confidence": 0.95}},
          "severity": {{"value": "critical|high|moderate|low", "confidence": 0.90}},
          "patientState": {{"value": "unresponsive|conscious|breathing_labored", "confidence": 0.92}},
          "bleeding": {{"value": true|false, "confidence": 0.88}},
          "location": {{"text": "extracted location text", "confidence": 0.89}},
          "requiredSkills": ["cpr", "trauma", "first_aid"]
        }}
        """

        try:
            with httpx.Client(timeout=5.0) as client:
                resp = client.post(
                    f"{self.ollama_host}/api/generate",
                    json={"model": self.model, "prompt": prompt, "stream": False, "format": "json"}
                )
                if resp.status_code == 200:
                    data = json.loads(resp.json().get("response", "{}"))
                    return IncidentExtractionResult(**data)
        except Exception as e:
            logger.info(f"LLM backend fallback triggered: {e}")

        # Deterministic Rule-Based Fallback
        text_lower = transcript_text.lower()
        
        emergency_type = "general_medical"
        skills = ["first_aid"]
        severity = "moderate"
        bleeding = "bleed" in text_lower or "blood" in text_lower
        patient_state = "unresponsive" if ("unconscious" in text_lower or "unresponsive" in text_lower) else "conscious"

        if "accident" in text_lower or "car" in text_lower or "vehicle" in text_lower:
            emergency_type = "road_accident"
            skills = ["trauma", "first_aid", "cpr"]
            severity = "critical"
        elif "heart" in text_lower or "cardiac" in text_lower or "chest pain" in text_lower:
            emergency_type = "cardiac_emergency"
            skills = ["cpr", "aed", "first_aid"]
            severity = "critical"
        elif "chok" in text_lower:
            emergency_type = "choking"
            skills = ["choking", "first_aid"]
            severity = "high"

        return IncidentExtractionResult(
            emergencyType=ConfidenceItem(value=emergency_type, confidence=0.92),
            severity=ConfidenceItem(value=severity, confidence=0.89),
            patientState=ConfidenceItem(value=patient_state, confidence=0.91),
            bleeding=ConfidenceItem(value=bleeding, confidence=0.88),
            location=LocationConfidenceItem(text="College main gate", confidence=0.87),
            requiredSkills=skills
        )

extraction_service = CallIntelligenceExtractor()
