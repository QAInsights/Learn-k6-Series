import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';


export default function () {
  let res = http.get('http://test.k6.io');
  console.log(res.status);
  
  sleep(1);
}
