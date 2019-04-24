import { ElasticsearchDisruption } from "../model/target/ElasticsearchDisruption";
import { Client } from "elasticsearch";
import env from "../../env.json";
import * as _ from "lodash";

export class ElasticsearchHelper {

    private client: Client;

    constructor() {
        this.client = new Client({
            host: env.elasticsearch_host
        });
    }

    insertBulk(disruptions: ElasticsearchDisruption[]) {
        let bulk = _.flatMap(disruptions, (disruption: ElasticsearchDisruption) => {
            return [
                {
                    "index" : { 
                        "_index" : "disruptions-" + disruption.datetime.toISOString().substring(0, 10)
                    }
                },
                Object.assign({}, disruption)
            ];
        });

        this.client.bulk({body: bulk}, (err, resp) => {
            if(err) {
              console.error(err)
            } else {
              console.log("Imported "+resp.items.length+" items successfully.");
            }
        });
    }
}