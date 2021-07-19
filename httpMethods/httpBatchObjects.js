import http from "k6/http";
import { check } from "k6";

export default function() {
    let req1 = {
        method: "GET",
        url: "https://example.com",
    };

    let req2 = {
        method: "GET",
        url: "https://duckduckgo.com",
    };


    let res = http.batch([req1, req2]);

    check(res[0], {
        'Example.com was 200': (res) => res.status === 200,
    });

    check(res[1], {
        'Bing.com was 200': (res) => res.status === 200,
    });
}