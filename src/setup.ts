import * as elasticsearch from "elasticsearch";
import env from "../env.json";
import { ElasticsearchDisruption } from "./model/ElasticsearchDisruption";

let elasticsearchClient = new elasticsearch.Client({
    host: env.elasticsearch_host,
    log: "trace"
});

elasticsearchClient.indices.putTemplate(ElasticsearchDisruption.template);