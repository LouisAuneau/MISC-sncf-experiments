import { SNCFApiClient } from "./helpers/SNCFApiClient";
import { SNCFLineDisruption } from "./model/source/SNCFLineDisruption";
import * as elasticsearch from "elasticsearch";
import env from "../env.json";
import { DisruptionTarget } from "./model/target/DisruptionTarget";
import { SNCFDisruptions } from "./model/source/SNCFDisruptions";
import { ElasticsearchHelper } from "./helpers/ElasticSearchHelper";
import { ElasticsearchDisruption } from "./model/target/ElasticsearchDisruption";

main();
async function main() {
    let sncfApiClient = new SNCFApiClient();
    let elasticSearchHelper = new ElasticsearchHelper();
    let page: number|boolean = 0;
    
    do {
        let pageDisruptions: SNCFDisruptions = await sncfApiClient.getDisruptions(<number> page)
        page = pageDisruptions.getNextPage();
        let disruptions: DisruptionTarget[] = pageDisruptions.getDisruptions();

        if(disruptions.length > 0) {
            elasticSearchHelper.insertBulk(<ElasticsearchDisruption[]> disruptions);
            console.log(disruptions.length + " disruptions retrieved at page " + page + ".");
            disruptions = [];
        }
    } while(page);
}