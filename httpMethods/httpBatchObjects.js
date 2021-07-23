import http from "k6/http";
import { check } from "k6";

export let options = {
    batch: 5, // default: 20
    batchPerHost: 5, // default: 6
  };
  

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
        'DuckDuckGo.com was 200': (res) => res.status === 200,
    });

    // Named requests
    let namedRequests = {
        'Home page': 'https://k6.io',
        'Pricing page': {
          method: 'GET',
          url: 'https://k6.io/pricing'
        },
    };

    let namedResponses = http.batch(namedRequests);
    console.log("Home Page response " + namedResponses['Home page'].status);
    console.log("Pricing Page response " + namedResponses['Pricing page'].status);


}