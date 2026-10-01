from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import Optional, Dict, Any

from app.services.stt_service import stt_service
from app.services.extraction_service import extraction_service, IncidentExtractionResult
from app.services.location_resolver import location_resolver, LocationResolution
from app.services.gateway_provider import telephony_gateway

router = APIRouter()

class CallProcessRequest(BaseModel):
    callerPhone: str = "+18005550199"
    transcriptText: Optional[str] = None
    callerMetadata: Optional[Dict[str, Any]] = None

@router.post("/calls/process")
def process_call(req: CallProcessRequest):
    call_meta = telephony_gateway.receive_call({"caller_phone": req.callerPhone})
    
    sample_text = req.transcriptText or "Emergency! There is a severe road accident outside the college main gate. The victim is unconscious and bleeding."
    extraction: IncidentExtractionResult = extraction_service.extract_incident_from_transcript(sample_text)
    
    location: LocationResolution = location_resolver.resolve_location(
        caller_metadata=req.callerMetadata,
        location_text=extraction.location.text
    )

    return {
        "call": call_meta,
        "extraction": extraction,
        "location": location,
        "proposedIncident": {
            "emergencyType": extraction.emergencyType.value,
            "severity": extraction.severity.value,
            "patientState": extraction.patientState.value,
            "bleeding": extraction.bleeding.value,
            "locationText": location.formattedAddress,
            "coordinates": {"lat": location.latitude, "lng": location.longitude},
            "locationConfidence": location.confidence,
            "requiredSkills": extraction.requiredSkills,
            "status": "LOCATION_CONFIRMED" if location.confidence >= 0.85 else "LOCATION_PENDING"
        }
    }

@router.post("/transcribe")
def transcribe_audio(file: UploadFile = File(...)):
    # Save file temporarily & transcribe
    res = stt_service.transcribe_audio_file("temp_file")
    return res
