export interface ResolvedLocation {
    latitude: number;
    longitude: number;
    source: 'telecom_metadata' | 'gps' | 'spoken_text' | 'geocoder' | 'dispatcher_manual';
    confidence: number;
    formattedAddress: string;
    landmarkMentioned?: string;
    verified: boolean;
}
