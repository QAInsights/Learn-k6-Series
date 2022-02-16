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

const customTrend = new Trend("custom_duration");
const customCounter = new Counter("custom_counter");
const customGauge = new Gauge("custom_gauge");
const customRate = new Rate("custom_rate");

export const options = {
    ext: {
        loadimpact: {
            projectID: 3571382,
            name: "Metrics Outputs Demo",
        }
    },
    scenarios: {
        constant_scenario: {
            executor: "constant-vus",
            vus: 1,
            duration: "5s",
            startTime: '0s'
        },
    },
};

export default function () {
    const res = http.get("https://onlineboutique.dev");

    check(res, {
        'is status 200': r => r.status === 200,
    });

    //Custom trend
    console.log('Response time (ms) was ' + String(res.timings.duration));
    customTrend.add(res.timings.duration);

    // //Counter - (sum of all values * each iteration)
    customCounter.add(1);
    customCounter.add(2);
    customCounter.add(3);

    // //Rate 50% pass - 50% fail
    customRate.add(1);
    customRate.add(true);
    customRate.add(false);
    customRate.add(0);

    // //Gauge - displays the last value, along with min and max
    customGauge.add(1);
    customGauge.add(5);
    customGauge.add(10);

    sleep(1);

}