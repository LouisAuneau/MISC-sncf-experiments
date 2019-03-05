const https = require('https');
const datetime = require('date-and-time');

let token = process.argv[2];
let api_url = "api.sncf.com";
let api_date_format = "YYYYMMDDTHHmmss";
let today = new Date().setHours(0,0,0,0);
let yesterday = datetime.addDays(new Date(), -1).setHours(0,0,0,0);

/**
 * Main. Imports disruptions for ýesterday day into elasticsearch.
 */
main();
async function main() {
    let disruptions = [];
    let next_page = "/v1/coverage/sncf/disruptions";

    do {
        let data = await requestApi(next_page);

        data.disruptions
            .filter(disruptionFilter)
            .forEach(disruption => {
                disruptions.push(disruption);
            });

        next_page = getNextPage(data);
    } while(next_page);
}

/**
 * HTTPS request to the API
 * @param {string} path
 * @returns {Promise}
 */
async function requestApi(path) {
    var options = {
        host: api_url,
        path: path,
        port: 443,
        method: "GET",
        headers: {
            "Authorization": "Basic " + Buffer.from(token + ":").toString('base64'),
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
                resolve(JSON.parse(data));
            });
        });

        req.end();
        req.on('error', function(err){
            reject(err);
        });
    }); 
}

/**
 * Returns the next page of disruptions' URI.
 * @param {Object} payload
 * @returns {Boolean|String} False if last page, the URI otherwise.
 */
function getNextPage(payload) {
    let next_link = payload
            .links
            .filter((link) => {
                return link.type === "next";
            });
            
    if(next_link.length == 0) {
        return false;
    } else {
        return next_link[0]
            .href
            .replace(api_url, "")
            .replace("https://", "");
    }
}

/**
 * Tells if a disruption object should be stored. Take status as well as date into account.
 * @param {Object} disruption
 */
function disruptionFilter(disruption) {
    let beginDate = disruption.application_periods[0].begin;
    beginDate = datetime.parse(beginDate, api_date_format);
    let endDate = disruption.application_periods[0].end;
    endDate = datetime.parse(endDate, api_date_format);
    
    return disruption.status != 'active' && beginDate >= yesterday && beginDate < today;
}