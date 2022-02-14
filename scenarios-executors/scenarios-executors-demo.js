import { sleep, check } from "k6";
import http from "k6/http";

export const options = {
    scenarios: {
        // per_vu_scenario: {
        //     executor: "per-vu-iterations", //5*5=25 iterations
        //     vus: 5,
        //     iterations: 5,
        //     startTime: '3s'
        // },
        // shared_scenario: {
        //     executor: "shared-iterations", // (5/5)=1 iteration per vu, totally 5 iterations
        //     vus: 5,
        //     iterations: 5,
        //     startTime: '0s'
        // },
        // constant_scenario: {
        //     executor: "constant-vus",
        //     vus: 5,
        //     duration: "5s",
        //     startTime: '0s'
        // },
        // ramping_vus_scenario: {
        //     executor: "ramping-vus",
        //     startTime: '0s',
        //     stages: [{
        //             target: 5,
        //             duration: "15s"
        //         }
        //     ]
        // },
        // constant_arrival_scenario: {
        //     executor: "constant-arrival-rate",
        //     rate: 5,
        //     duration: '20s',
        //     preAllocatedVUs: 5,
        //     maxVUs: 10,
        // },
        // ramping_arrival_scenario: {
        //     executor: 'ramping-arrival-rate',
        //     startRate: 2,
        //     timeUnit: '1s',
        //     preAllocatedVUs: 2,
        //     maxVUs: 20,
        //     stages: [{
        //             target: 15,
        //             duration: '30s'
        //         },
        //     ],
        // },
        externally_controller_scenario: {
            executor: 'externally-controlled',
            vus: 10,
            maxVUs: 30,
            duration: '2m',
        },
    },
};

export default function () {
    const res = http.get("https://onlineboutique.dev");
    sleep(1);
    check(res, {
        'is status 200': r => r.status === 200,
    });
    // console.log(res.body);
}