import http from 'k6/http';

import { sleep } from 'k6';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '5s', target: 1 },
    { duration: '30s', target: 3 },
    { duration: '5s', target: 1 },
  ],
  thresholds: {
    // 99% of requests must finish within 1000ms.
    http_req_duration: ['p(99) < 1000'],
  },
};


export default function () {
  let homepage = http.get('https://onlineboutique.dev');

    check(homepage, {
      'status is 200': (r) => r.status === 200,
    });

  const homePageResponse  =  homepage.body;

  const linkpattern = /<a href="\/product\/(.+?)">/g;

  const matches = homePageResponse.matchAll(linkpattern);
  const matchesCount =  (homePageResponse.match(linkpattern) || []).length;
  let allProducts = [];
  for (const match of matches){
      console.log(match[1]);
      allProducts.push(match[1]);
  }
  console.log(allProducts[1]);
  const randomLink = Math.floor(Math.random() * matchesCount)+1;
  console.log("Random Number is: " + randomLink);

  let productLink = "https://onlineboutique.dev" + "/product/" + allProducts[randomLink];
  let productLinkClick = http.get(productLink);

  console.log(productLinkClick.url);

  check(productLinkClick, {
    'status is 200': (r) => r.status === 200,
  });

  // Add to Cart
  let cartLink = "https://onlineboutique.dev/cart";
  let cartParams = cartLink + "?product_id=" + allProducts[randomLink] + "&quantity=1";

  let addToCart = http.post(cartParams);
  console.log(cartParams);
  console.log(addToCart.url);
  console.log(addToCart.status);

  //Checkout
  let checkoutParams = "?email=someone%40example.com&street_address=1600+Amphitheatre+Parkway&zip_code=94043&city=Mountain+View&state=CA&country=United+States&credit_card_number=4432-8015-6152-0454&credit_card_expiration_month=1&credit_card_expiration_year=2022&credit_card_cvv=672";
  let checkoutLink = "https://onlineboutique.dev/cart/checkout" + checkoutParams;

  let checkout = http.post(checkoutLink);

  console.log(checkout.status);
  //console.log(checkout.body);

  check(checkout, {
    'status is 200': (r) => r.status === 200,
    'Order Complete Check': (r) => r.html('h3').text().includes('Your order is complete!'),
  });


  sleep(1);
}
