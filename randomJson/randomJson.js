import http from "k6/http";

export default function() {

    let data = {
        "Name": "xyz12344"
    }

    data['Name'] = generateRandomData(10);;
    console.log("Updated data " + data['Name']);
}

function generateRandomData(inputLength) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < inputLength; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
}

