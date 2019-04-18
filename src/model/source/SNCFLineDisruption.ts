import { SNCFStopDisruption } from "./SNCFStopDisruption";

export class SNCFLineDisruption {
    status: string;
    disruption_id: string;
    severity: SNCFSeverity;
    application_periods: SNCFApplicationPeriod[];
    messages: SNCFMessage[];
    updated_at: string;
    uri: string;
    cause: string;
    impacted_objects: SNCFImpactedObject[];
}

export interface SNCFSeverity {
    color: string;
    priority: number;
    name: string;
    effect: string;
}

export interface SNCFApplicationPeriod {
    begin: string; // YYYYMMDDTHHmmss
    end: string; // YYYYMMDDTHHmmss
}

export interface SNCFMessage {
    text: string;
}

export interface SNCFImpactedObject {
    impacted_stops: SNCFStopDisruption[];
}