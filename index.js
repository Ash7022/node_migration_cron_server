const express= require("express");
const cron =require("node-cron");
const nodeMailer = require('nodemailer');

// const  { processPage,processPageQuiz } = require("./script.js");
const  { processPage,processPageQuiz } = require("./scriptNew.js");
const env = require("dotenv").config().parsed;
const app = express();

// Variable to keep track of page number
let pageNumber = 160000;
let response = 0;
let count = 0;
let sleeptimecount = 0;        
let mailStartCheck =0;
async function mailerNode(html) {
   const transporter =  nodeMailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth:{
            user:'ashutoshnodeserver@gmail.com',
            pass:'lgex nfxr wtox udcl'
        }
    });
    try{
        const info = await transporter.sendMail({
            from:'Ashutosh Nodeserver <ashutoshnodeserver@gmail.com>',
            to:'ashutosh@edmingle.com',
            subject:'Test analyitics migration has been stopped',
            html:html
        });
        console.log("message sent: " +info.messageId);
    } catch (e){

        console.log("error message sent: " +e);
    }

}
// let pageNumber2 = 1;
async function scheduleCronJob() {
    // Define the cron job
    // const job = cron.schedule('*/30 * * * * *', async () => {
    //     // Get current hour
    //     // const currentHour = new Date().getHours();

    //     const options = { timeZone: 'Asia/Kolkata' };
    //     const currentHour = new Date().toLocaleString('en-US', { hour: 'numeric', hour12: false, ...options });        
    //     // Only execute between 12 am and 6 am
    //     console.log("running for every 30 min",currentHour);
    //     if (currentHour >= 0 && currentHour <= 6 && pageNumber<=5000000) {
    //         // Call the function with the current page number
    //         console.log("function calling for every 30 min");

    //        await processPage(pageNumber);
            
    //         // Increment page number for the next call
    //         pageNumber= pageNumber+10000;
    //     }
    // }, {
    //     scheduled: true,
    //     timezone: "Asia/Calcutta" // Replace "Your_Time_Zone" with your actual time zone
    // });

    // // Start the cron job
    // job.start();
    try{
        const html = `
            <h1> migration automation has been stopped. check server api</h1>
            <p>last_page_number ${pageNumber}</p>
        `;
        const htmlNewserver = `
            <h1> serverhas been started</h1>
            <p>last_page_number ${pageNumber}</p>
        `;
        mailerRes = await mailerNode(htmlNewserver).catch(e => console.log(e));
        while(pageNumber<=5000000){
            const options = { timeZone: 'Asia/Kolkata' };
            const currentHour = new Date().toLocaleString('en-US', { hour: 'numeric', hour12: false, ...options });
            // Only execute between 12 am and 6 am
            console.log("running for every 30 min",currentHour);
            if (currentHour >= 0 && currentHour <= 6 && pageNumber<=5000000) {

                const htmlNewstart = `
                <h1>migration automation has been started</h1>
                <p>current number ${pageNumber} and current time ${currentHour}</p>
            `;
                if(mailStartCheck ==0){
                    mailStartCheck =1;
                    mailerRes = await mailerNode(htmlNewstart).catch(e => console.log(e));

                }
                // Call the function with the current page number
                console.log("function calling for every 30 min");
                response = await processPage(pageNumber);
                if(response===0){
                    console.log("last_page_number",pageNumber);
                    mailerRes = await mailerNode(html).catch(e => console.log(e));

                    process.exit(0);
                }
                // Increment page number for the next call
                pageNumber= pageNumber+500;
                 count += 1 ; 
                 sleeptimecount +=1;
                 if(sleeptimecount >=10){
                    // process.exit(0);
                    await new Promise(resolve => setTimeout(resolve, 300000));
                    sleeptimecount =0;
                 }       
    
            }
            else{
                const htmlNew = `
                <h1>migration automation has been stopped. next migration will start tomorrow</h1>
                <p>last_page_number ${pageNumber} and current time ${currentHour}</p>
            `;
                if(mailStartCheck ==1){
                    mailStartCheck=0;
                    mailerRes = await mailerNode(htmlNew).catch(e => console.log(e));

                }
            }
        }
        mailerRes = await mailerNode(html).catch(e => console.log(e));
        process.exit(0);
    }
    catch(error){
        const htmlerr = `
            <h1> migration automation has been stopped. check Node server api</h1>
            <p>last_page_number ${pageNumber}</p>
        `;
        console.log("last_page_number",pageNumber);
        mailerRes = await mailerNode(htmlerr).catch(e => console.log(e));
        process.exit(0);
    }
   
}




// Call the function to schedule the cron job
scheduleCronJob();

// scheduleAnotherCronJob();

app.get('/', (req, res) => {
    res.send('Hello world');
});

// const PORT = 3000;
 const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
