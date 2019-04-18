import { DisruptionTarget } from "../target/DisruptionTarget";

export interface DisruptionSource {
    getDisruptions(): DisruptionTarget[];
}