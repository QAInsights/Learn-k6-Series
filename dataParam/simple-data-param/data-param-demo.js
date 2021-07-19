import http from "k6/http";
import { SharedArray } from "k6/data";

// init
export let options = {
    vus: 5,
    duration: '5s',
    iterations: 5,
  };

var data = new SharedArray("colors", function() {
    return JSON.parse(open('./tags.json')).tags; // return array of tags
});

// Reading random tag from the JSON file
var randomTag = data[Math.floor(Math.random() * data.length)];

export default function() {
let response =  http.get(`http://localhost/category.html?tags=${randomTag}`);
console.log(`VU ID: ${__VU} ` + "- URL: " + response.url + " - Status Code: " + response.status);

}