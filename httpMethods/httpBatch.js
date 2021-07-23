import http from "k6/http";

export default function() {
    
    let requests = http.batch([
        [ "GET", "https://onlineboutique.dev"],
        [ "GET", "https://onlineboutique.dev/static/styles/styles.css" ],
        [ "GET", "https://onlineboutique.dev/static/styles/cart.css"],
        [ "GET", "https://onlineboutique.dev/static/styles/order.css"],
        [ "GET", "https://onlineboutique.dev/static/icons/Hipster_CurrencyIcon.svg"],
        [ "GET", "https://onlineboutique.dev/static/img/products/barista-kit.jpg"],
    ]);
   
    console.log(requests[0].status); // First request's status code

    for (let i=0; i<requests.length; i++) { // Iterate over all requests
        console.log(requests[i].status);
    }
}