const FormData = require("form-data");
// const axios = require("axios");
// import fetch from "node-fetch";
const fetch  = require("node-fetch");
const env = require("dotenv").config().parsed;



async function makeApiRequest(pageNumber) {
    const apiUrl = 'https://enterpriseplanportal-api.edmingle.com/nuSource/api/v1/migrate/studentbulktestupdate';
    const apiKey = 'ef8b6c4bb1043c1b61831838ec75351f';
    const orgId = '5131';

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
    data['per_page'] =  2;
    data['run_migration'] =  1;
    var JSONString = JSON.stringify(data);
    formData.append('JSONString',JSONString);

    return await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: formData,
    })
    .then(response => response.json())
    .catch(error => {
            console.error('Error for page', pageNumber, ':', error);
            return { error: true, message: `Error occurred for page ${pageNumber}. Check console for details.` };
        });
}

async function makeApiRequestForQuiz(pageNumber) {
    const apiUrl = 'http://localhost/nuSource/api/v1/migrate/studentbulktestquizupdate';
    const apiKey = 'b291d4b81f41cf19f759ee5c319ef821';
    const orgId = '2';

    const headers = {                   
        'APIKEY': apiKey,
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'en-GB,en;q=0.9',
        'Connection': 'keep-alive',
        'Cookie': 'G_ENABLED_IDPS=google; _clck=jjneul%7C2%7Cfhq%7C0%7C1450; _fw_crm_v=1be00437-dde8-480e-eebb-ce32da9659a0; _clsk=88jgca%7C1703137621624%7C4%7C1%7Ca.clarity.ms%2Fcollect',
        'ORGID': env.ORGID,
        'Origin': 'http://localhost',
        'Referer': 'http://localhost/myaccount/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
        'sec-ch-ua': '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
    };


    const formData = new FormData();
    var data = {};
    data['page'] =  pageNumber;
    data['per_page'] =  1;
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
    } else {
        return 0; // Not OK
    }
}

exports.processPage= async (pageNumber)=> {
   
   response= await makeApiRequest(pageNumber);
    return 1;
   
}

exports.processPageQuiz= async (pageNumber)=> {
   
    response= await makeApiRequestForQuiz(pageNumber);
     return 1;
    
 }