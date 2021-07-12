import { SharedArray } from "k6/data";
import http from "k6/http";
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";
import encoding from 'k6/encoding';

// init
export let options = {
    vus: 5,
    duration: '5s',
    iterations: 5,
};

const csvRead = new SharedArray("credentials", function() {
    return papaparse.parse(open('./data.csv'), {header: true}).data;
});

export default function main(){
    // Looping through the credentials
    // for (let data of csvRead){
    //     console.log(JSON.stringify(data['username']));
    //     console.log(JSON.stringify(data['password']));
    // }

    // Random credentials
    // var randomCredentials = csvRead[Math.floor(Math.random() * csvRead.length)];
    // console.log(randomCredentials['username']);
    // console.log(randomCredentials['password']);

    var username = csvRead[0]['username'];
    var password = csvRead[0]['password'];

    // Generate base64 encoded credentials
    var toBeEncoded = username + ':' + password;
    var encodedString = encoding.b64encode(toBeEncoded);

    console.log(encodedString);

    let params = {
        headers : {
        "Authorization": "Basic " + encodedString,
        "X-Requested-With": "XMLHttpRequest"
        }
    };

    let response = http.get("http://localhost/login", params);
    console.log(response.status);
};

