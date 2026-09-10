/**
 * External Test Script: Asynchronous Utilities & Timer
 */
console.info("⚡ Executing external script: sample-async.js");

(async function () {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    console.log("Starting step-by-step async execution task...");
    
    await delay(500);
    console.log("Step 1: Initializing background service connection [OK]");

    await delay(700);
    console.log("Step 2: Fetching system metrics [OK]");

    await delay(400);
    console.info("Step 3: All background tasks resolved successfully!");
})();
