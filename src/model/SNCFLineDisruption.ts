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

interface SNCFSeverity {
    color: string;
    priority: number;
    name: string;
    effect: string;
}

interface SNCFApplicationPeriod {
    begin: string;
    end: string;
}

interface SNCFMessage {
    text: string;
}

interface SNCFImpactedObject {
    impacted_stops: SNCFStopDisruption[];
}