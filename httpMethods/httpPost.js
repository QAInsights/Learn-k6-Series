import http from "k6/http";
import { check } from "k6";

export default function() {
    let payload = {
        "name": "morpheus",
        "job": "leader"
    }
    let res = http.post("https://reqres.in/api/users", JSON.stringify(payload), {
        headers: {
            "Content-Type": "application/json"
        }});
    console.log("The name is " + res.json().name);

    let putPayload = {
            "name": "morpheus frank",
            "job": "zion resident"
    }

    let resPut = http.put("https://reqres.in/api/users/2", JSON.stringify(putPayload), {
        headers: {
            "Content-Type": "application/json"
        }});
    console.log("The new name is " + resPut.json().name);

    let patchPayload = {
        "name": "morpheus wood",
        "job": "leader"
    }
   let resPatch = http.patch("https://reqres.in/api/users/2", JSON.stringify(patchPayload), {
        headers: {
            "Content-Type": "application/json"
        }});
    console.log("The patched name is " + resPatch.json().name);

    // Delete a user
    let resDelete = http.del("https://reqres.in/api/users/2");
    check(resDelete, {
        'is status 204': (r) => r.status === 204,
    });

    // Options request
    let resOptions = http.options("https://example.org");
    console.log(resOptions.headers['Allow']);

    // Custom request
    let resCustom = http.request("GET", "https://duckduckgo.com");
    console.log(resCustom.status);
}