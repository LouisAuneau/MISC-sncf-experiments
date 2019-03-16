export class SNCFStopDisruption {
    amended_arrival_time?: string
    stop_point: SNCFStopPoint;
    stop_time_effect: string;
    departure_status: string;
    is_detour: boolean;
    amended_departure_time: string;
    base_arrival_time: string;
    cause: string;
    base_departure_time: string;
    arrival_status: string;
}

interface SNCFStopPoint {
    name: string;
    coord: SNCFCoordinates;
    label: string;
    id: string;
}

interface SNCFCoordinates {
    lat: string;
    lon: string;
}