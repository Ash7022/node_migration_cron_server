const FormData = require("form-data");
// const axios = require("axios");
// import fetch from "node-fetch";
const fetch  = require("node-fetch");
const env = require("dotenv").config().parsed;



async function makeApiRequest(pageNumber) {
    const apiUrl = 'https://enterpriseplanportal-api.edmingle.com/nuSource/api/v1/migrate/studentbulktestupdate';
    const apiKey = 'ef8b6c4bb1043c1b61831838ec75351f';
    const orgId = '5131';
try{
    const headers = {                   
        'authority': 'enterpriseplanportal-api.edmingle.com',
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'apikey': apiKey,
        'orgid': orgId,
        'origin': 'https://enterpriseplanportal.edmingle.com',
        'referer': 'https://enterpriseplanportal.edmingle.com/',
        'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    };


    const formData = new FormData();
    var data = {};
    data['page'] =  pageNumber;
    data['per_page'] =  200;
    data['run_migration'] =  1;
    var JSONString = JSON.stringify(data);
    formData.append('JSONString',JSONString);

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: formData,
    });
    if (response.ok) {
        return 1; // Success
    } else if (response.status === 504) {
        return 504; // Gateway Timeout
    } else {
        return 0; // Not OK
    }
}
catch(error){
    return 0;
}
    
}

exports.processPage= async (pageNumber)=> {
   
   return await makeApiRequest(pageNumber);
   
}