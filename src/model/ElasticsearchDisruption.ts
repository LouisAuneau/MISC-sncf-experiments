import { IndicesPutTemplateParams } from "elasticsearch";

export class ElasticsearchDisruption {
    datetime: Date;
    day_of_week: string;
    location: ElasticsearchCoordinates;
    station: string;
    delay: number; // In minutes

    static template: IndicesPutTemplateParams = {
        name: "disruptions-*",
        body: {
            index_patterns: ["disruptions-*"],
            settings: {
                    number_of_shards: 1,
                    number_of_replicas: 0
            },
            mappings: {
                _doc: {
                    properties: {
                        datetime: {
                            type: "date",
                            format: "yyyyMMdd HHmmss"
                        },
                        day_of_week: {
                            type: "keyword"
                        },
                        location: {
                            type: "geo_point"
                        },
                        station: {
                            type: "keyword"
                        },
                        delay: { // In minutes
                            type: "double",
                        },
                        cause: {
                            "type": "text"
                        }
                    }
                }
            }
            }
    };
}

export class ElasticsearchCoordinates {
    lat: number;
    lon: number;
}