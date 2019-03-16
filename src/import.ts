import { SNCFApiClient } from "./SNCFApiClient";
import { SNCFLineDisruption } from "./model/SNCFLineDisruption";

main();
async function main() {
    let sncfApiClient = new SNCFApiClient();
    let page: number|boolean = 0;
    let disruptions: SNCFLineDisruption[] = [];
    
    do {
        let pageDisruptions = await sncfApiClient.getDisruptions()
        page = pageDisruptions.getNextPage();
        disruptions.concat(pageDisruptions.disruptions);

        console.log(pageDisruptions.disruptions.length + " disruptions retrieved.");
    } while(page);
}