
import { BASE_URL, TOKEN_URL } from "./common.js";
import { SharedArray } from 'k6/data';

import { check } from "k6"
import http from 'k6/http';

let binFile = open('param.json');
let d = JSON.parse(binFile);
//Fill the template
let parametervalueString = d['parameter'][0]['valueString'];
let partvalueString = d['part'][0]['valueString'];




console.log("test" + d['parameter'][0]['name']);
//console.log((JSON.parse(binFile)).parameter[0]);

export default function (){
  //  var data = "C:\\Users\\M110544\\IdeaProjects\\KMD\\kmdp-ccrs-load-tests\\tests\\param.json";
  //   let data = `
  //   {"resourceType":"Parameters","parameter":[{"name":"pcIds","valueString": "820fe35c-81ed-39be-8e66-119176bf0bec"},{"name":"context","part":[{"name":"patientId","valueString":"11242722"},{"name":"fhirtoken","valueString": "NzPuviCp3z2R6zj8LNFn7sDo0Wf8uQDmvBsOLFuF"},{"name":"providerId","valueString":"11223344"}]}]}
  //   `;
  //   console.log(JSON.stringify(data));


    let res1 = http.request('POST', BASE_URL, JSON.stringify(binFile), {
        headers: "application/json",
    });



    check(res1, {
        'is': (r) => r.status === 200,
        'body': (r) => r.body.includes("Has Atrial Fibrillation"),
        'length': (r) => r.body.length > 0,
    });

}