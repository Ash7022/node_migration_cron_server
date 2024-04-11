const express= require("express");
const cron =require("node-cron");
const  { processPage,processPageQuiz } = require("./script.js");
const env = require("dotenv").config().parsed;
const app = express();

// Variable to keep track of page number
let pageNumber = 1;
// let pageNumber2 = 1;
function scheduleCronJob() {
    // Define the cron job
    const job = cron.schedule('*/30 * * * * *', async () => {
        // Get current hour
        const currentHour = new Date().getHours();
        
        // Only execute between 12 am and 6 am
        console.log("running for every 30 min",currentHour);
        if (currentHour >= 0 && currentHour <= 6 && pageNumber<=5000000) {
            // Call the function with the current page number
            console.log("function calling for every 30 min");

           await processPage(pageNumber);
            
            // Increment page number for the next call
            pageNumber= pageNumber+10000;
        }
    }, {
        scheduled: true,
        timezone: "Asia/Calcutta" // Replace "Your_Time_Zone" with your actual time zone
    });

    // Start the cron job
    job.start();
}


//cron job for quiz

// function scheduleAnotherCronJob() {
//     // Define the second cron job
//     const job = cron.schedule('*/15 * * * * *', async () => {
//         // Get current hour
//         const currentHour = new Date().getHours();
//         console.log('Second cron job for quiz is running every 30 seconds...');

//         // Only execute between 12 am and 6 am
//         if (currentHour >= 18 && currentHour <= 23) {
//             try {
//                 // Call the function with the current page number
//                 await processPageQuiz(pageNumber2);
                
//                 // Increment page number for the next call
//                 pageNumber2++;
//             } catch (error) {
//                 console.error('Error processing page for second cron job:', error);
//             }
//         }
//     }, {
//         scheduled: true,
//         timezone: "Asia/Calcutta" // Replace "Your_Time_Zone" with your actual time zone
//     });

//     // Start the second cron job
//     job.start();
// }

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
