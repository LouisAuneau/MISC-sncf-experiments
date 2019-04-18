import { ElasticsearchCoordinates } from "./ElasticsearchDisruption";

export interface DisruptionTarget {
    datetime: Date;
    day_of_week: string;
    location: ElasticsearchCoordinates;
    station: string;
    delay: number; // In minutes

    loadDisruptions(disruptions: DisruptionTarget[]): void;
}