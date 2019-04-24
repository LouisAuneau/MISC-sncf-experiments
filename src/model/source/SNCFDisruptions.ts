import { SNCFLineDisruption, SNCFImpactedObject } from "./SNCFLineDisruption";
import { SNCFStopDisruption } from "./SNCFStopDisruption";
import { ElasticsearchDisruption } from "../target/ElasticsearchDisruption";
import { DisruptionTarget } from "../target/DisruptionTarget";
import { DisruptionSource } from "./DisruptionSource";
import moment from 'moment';
import { SNCFApiClient } from "../../helpers/SNCFApiClient";
import env from "../../../env.json";

export class SNCFDisruptions implements DisruptionSource {
    disruptions: SNCFLineDisruption[];
    pagination: SNCFPagination;
    extractedDate = env.day_imported == "" ? moment().subtract(1, 'days') : moment(env.day_imported, "YYYYMMDD");

    /**
     * @implements DisruptionSource.getDisruptions()
     */
    public getDisruptions(): DisruptionTarget[] {
        let disruptions: DisruptionTarget[] = [];
        let sncfStopDisruptions = this.extractStopDisruptions(this.disruptions);

        sncfStopDisruptions.forEach((sncfStopDisruption: SNCFStopDisruption) => {
            let disruption = new ElasticsearchDisruption();

            let base_departure_datetime = moment(this.extractedDate.format("YYYYMMDD") + " " + sncfStopDisruption.base_departure_time, "YYYYMMDD HHmmss");
            let actual_departure_datetime = moment(this.extractedDate.format("YYYYMMDD") + " " + sncfStopDisruption.amended_departure_time, "YYYYMMDD HHmmss");
            disruption.datetime = base_departure_datetime.toDate();
            disruption.day_of_week = base_departure_datetime.format('ddd');

            if(sncfStopDisruption.departure_status == 'deleted') {
                disruption.deleted = true;
                disruption.delay = 0;
            } else {
                disruption.deleted = false;
                disruption.delay = actual_departure_datetime.diff(base_departure_datetime, "minutes");
            }

            disruption.location = {
                lat: parseFloat(sncfStopDisruption.stop_point.coord.lat),
                lon: parseFloat(sncfStopDisruption.stop_point.coord.lon)
            };
            disruption.station = sncfStopDisruption.stop_point.name;
            disruption.cause = sncfStopDisruption.cause;

            disruptions.push(<DisruptionTarget> disruption);
        });

        return disruptions;
    }

    /**
     * Returns the number of the next page of disruptions. False if it is the last page.
     * @returns number|boolean - Either the number of the next page or false if it's the last page.
     */
    public getNextPage(): number|boolean {
        let last_page = Math.floor(this.pagination.total_result / this.pagination.items_per_page);
        return this.pagination.start_page == last_page ? false : (this.pagination.start_page + 1);
    }

    /**
     * From a list of disruptions provided by SNCF API (line level), list disruptions at a station level.
     */
    private extractStopDisruptions(sncfLineDisruptions: SNCFLineDisruption[]): SNCFStopDisruption[] {
        let stopDisruptions: SNCFStopDisruption[] = [];

        sncfLineDisruptions
            .filter((sncfLineDisruption: SNCFLineDisruption) => {
                // Filter depending on the day of the disruptions and its status.
                let applicationStartDate = moment(sncfLineDisruption.application_periods[0].begin, SNCFApiClient.dateformat);
                return sncfLineDisruption.status != "active" && this.extractedDate.isSame(applicationStartDate, 'day');
            })
            .forEach((sncfLineDisruption: SNCFLineDisruption) => {
                sncfLineDisruption.impacted_objects.forEach((sncfImpactedObject: SNCFImpactedObject) => {
                    stopDisruptions = stopDisruptions.concat(sncfImpactedObject.impacted_stops);
                });
            });

        return stopDisruptions;
    }
}

interface SNCFPagination {
    start_page: number;
    items_on_page: number;
    items_per_page: number;
    total_result: number;
}