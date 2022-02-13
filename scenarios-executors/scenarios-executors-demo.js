import http from "k6/http";

export const options = {
    scenarios: {
        per_vu_scenario: {
            executor: "per-vu-iterations", //5*5=25 iterations
            vus: 5,
            iterations: 5,
            startTime: '5s'
        },
        shared_scenario: {
            executor: "shared-iterations", // (5/5)=1 iteration per vu, totally 5 iterations
            vus: 5,
            iterations: 5,
            startTime: '1s'
        },
        constant_scenario: {
            executor: "constant-vus", // (5/5)=1 iteration per vu, totally 5 iterations
            vus: 5,
            duration: "5s",
            startTime: '10s'
        },
    },
};

export default function () {
    http.get("https://example.com");
}