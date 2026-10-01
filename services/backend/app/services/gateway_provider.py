import logging
from abc import ABC, abstractmethod
from typing import Dict, Any

logger = logging.getLogger("resq.gateway")

class CallProviderInterface(ABC):
    @abstractmethod
    def receive_call(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        pass

    @abstractmethod
    def start_audio_stream(self, call_id: str) -> str:
        pass

class GenericWebhookProvider(CallProviderInterface):
    def receive_call(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        call_id = payload.get("call_id", "call_default_001")
        caller_phone = payload.get("caller_phone", "+18005550199")
        logger.info(f"Received emergency call from {caller_phone} via Webhook Gateway")
        return {
            "callId": call_id,
            "callerPhone": caller_phone,
            "status": "active",
            "provider": "webhook"
        }

    def start_audio_stream(self, call_id: str) -> str:
        return f"wss://gateway.resq.local/stream/{call_id}"

telephony_gateway = GenericWebhookProvider()
