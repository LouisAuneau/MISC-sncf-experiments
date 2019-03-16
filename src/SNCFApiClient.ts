import env from "../env.json";
import * as https from "https";
import * as fs from "fs";
import { SNCFDisruptions } from "./model/SNCFDisruptions";

export class SNCFApiClient {

    api_url: string = "api.sncf.com";
    api_token: string = env.sncf_api_key;

    getDisruptions(page: number = 0): Promise<SNCFDisruptions> {
        var options = {
            host: this.api_url,
            path: "/v1/coverage/sncf/disruptions?start_page=" + page,
            port: 443,
            method: "GET",
            headers: {
                "Authorization": "Basic " + Buffer.from(this.api_token + ":").toString('base64'),
                'Accept': 'application/json'
            }   
        };
    
        return new Promise(function(resolve, reject) {
            let req = https.request(options, (res) => {
                let data = "";
                res.on("data", function(buffer) {
                    data += buffer.toString("utf8");
                });
    
                res.on('end', function() {
                    resolve(Object.assign(new SNCFDisruptions(), JSON.parse(data)));
                });
            });
    
            req.end();
            req.on('error', function(err){
                reject(err);
            });
        });
    }
}