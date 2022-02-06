import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    thresholds: {
      checks: ['rate>0.99'],
      http_req_duration: [{
        threshold: 'p(90) < 100',
        abortOnFail: true, 
      }]      
    },
  };

export default function () {
    const res = http.get("https://reqres.in/api/users?page=2");

    check(res, {
        'is status 200': r => r.status === 200,
        'is not status 404': r => r.status !== 404,
        'has data': r => (JSON.parse(r.body)).data.length > 0,
        'body size is less than 1030': r => r.body.length <= 1030,
    });

    sleep(1);
}