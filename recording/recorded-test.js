import { sleep, group } from "k6";
import http from "k6/http";

export const options = {
  stages: [
    { duration: "1m", target: 1 }
  ]
};

export default function main() {
  let response;

  const vars = {};

  group("page_1 - https://onlineboutique.dev/", function () {
    response = http.get("https://onlineboutique.dev/", {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        dnt: "1",
        "sec-ch-ua": '"Chromium";v="91", " Not;A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
    });
    sleep(1);
  });

  group("page_2 - https://onlineboutique.dev/product/66VCHSJNUP", function () {
    response = http.get("https://onlineboutique.dev/product/66VCHSJNUP", {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9",
        dnt: "1",
        "sec-ch-ua": '"Chromium";v="91", " Not;A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
    });

    vars["product_id1"] = response
      .html()
      .find("input[name=product_id]")
      .first()
      .attr("value");

    sleep(1);
  });

  group("page_3 - https://onlineboutique.dev/cart", function () {
    response = http.post(
      "https://onlineboutique.dev/cart",
      {
        product_id: `${vars["product_id1"]}`,
        quantity: "1",
      },
      {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "max-age=0",
          "content-type": "application/x-www-form-urlencoded",
          dnt: "1",
          origin: "https://onlineboutique.dev",
          "sec-ch-ua": '"Chromium";v="91", " Not;A Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
        },
      }
    );
    sleep(1);
  });

  group("page_4 - https://onlineboutique.dev/cart/checkout", function () {
    response = http.post(
      "https://onlineboutique.dev/cart/checkout",
      {
        email: "someone%40example.com",
        street_address: "1600%20Amphitheatre%20Parkway",
        zip_code: "94043",
        city: "Mountain%20View",
        state: "CA",
        country: "United%20States",
        credit_card_number: "4432-8015-6152-0454",
        credit_card_expiration_month: "1",
        credit_card_expiration_year: "2022",
        credit_card_cvv: "672",
      },
      {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "max-age=0",
          "content-type": "application/x-www-form-urlencoded",
          dnt: "1",
          origin: "https://onlineboutique.dev",
          "sec-ch-ua": '"Chromium";v="91", " Not;A Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
        },
      }
    );
  });
}
