import http from "k6/http";
import { sleep } from "k6";

export default function () {
    http.get("https://reqres.in");
    sleep(1);
}