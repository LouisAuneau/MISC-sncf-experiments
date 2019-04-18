import { SNCFApiClient } from "./helpers/SNCFApiClient";
import { SNCFLineDisruption } from "./model/source/SNCFLineDisruption";
import * as elasticsearch from "elasticsearch";
import env from "../env.json";
import { DisruptionTarget } from "./model/target/DisruptionTarget";
import { SNCFDisruptions } from "./model/source/SNCFDisruptions";

main();
async function main() {
    let sncfApiClient = new SNCFApiClient();
    let elasticsearchClient = new elasticsearch.Client({
        host: env.elasticsearch_host,
        log: "trace"
    });
    let page: number|boolean = 0;
    let disruptions: DisruptionTarget[] = [];
    
    do {
        let pageDisruptions: SNCFDisruptions = await sncfApiClient.getDisruptions(<number> page)
        page = pageDisruptions.getNextPage();
        disruptions = disruptions.concat(pageDisruptions.getDisruptions());

        console.log(disruptions.length + " disruptions retrieved at page " + page + ".");
    } while(page);
}