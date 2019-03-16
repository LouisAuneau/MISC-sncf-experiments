import { SNCFLineDisruption } from "./SNCFLineDisruption";

export class SNCFDisruptions {
    disruptions: SNCFLineDisruption[];
    pagination: SNCFPagination;

    public getNextPage(): number|boolean {
        let last_page = Math.floor(this.pagination.total_result / this.pagination.items_per_page);
        return this.pagination.start_page == last_page ? false : this.pagination.start_page + 1;
    }
}

interface SNCFPagination {
    start_page: number;
    items_on_page: number;
    items_per_page: number;
    total_result: number;
}