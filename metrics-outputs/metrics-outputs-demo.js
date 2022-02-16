import {
    sleep,
    check,
} from "k6";
import {
    Counter,
    Gauge,
    Rate,
    Trend
} from "k6/metrics";
import http from "k6/http";

const customTrend = new Trend("trend_duration");
const customCounter = new Counter("counter");
const customGauge = new Gauge("gauge");
const customRate = new Rate("rate");

// export const options = {
//     scenarios: {
//         constant_scenario: {
//             executor: "constant-vus",
//             vus: 2,
//             duration: "5s",
//             startTime: '0s'
//         },
//     },
// };

export default function () {
    const res = http.get("https://onlineboutique.dev");
    sleep(1);
    check(res, {
        'is status 200': r => r.status === 200,
    });

    console.log('Response time (ms) was ' + String(res.timings.duration));
    customTrend.add(res.timings.duration);
    console.log('Response trend ' + customTrend.name);

    //Counter - sum of all values
    customCounter.add(1);
    customCounter.add(5);
    customCounter.add(10);

    //Rate 50% pass - 50% fail
    customRate.add(1);
    customRate.add(true);
    customRate.add(false);
    customRate.add(0);

    //Gauge - displays the last value, along with min and max
    customGauge.add(1);
    customGauge.add(5);
    customGauge.add(10);


}