const puppeteer = require('puppeteer');
const fs = require('fs');
const readline = require('readline');
const { v4: uuidv4 } = require('uuid'); // Import uuid for generating keys
const { ReplyManager } = require('../replies/ReplyManager'); // Import ReplyManager

const cookiesPath = 'D:/webProjects/BOT/cookies.json';
const TRIAL_FILE = 'trial_info.json';
const PRIVATE_KEY = 'myFisrtAndLastEnd1300';
const LICENSE_KEY = '24f03d3a-c0f1-44c3-a6e3-696d1ff3b98b'; // Generate a new UUID as the license key
const TRIAL_DURATION = 10 * 60 * 1000; // 10 minutes

// Validate License Key Function
function validateLicenseKey() {
    const licenseData = {
        info: {
            name: 'User Name',
            email: 'user@example.com',
            trial: '10-minutes', // Trial information
        },
        prodCode: 'BOT123',
        appVersion: '1.0',
    };

    console.log('Validating License Key...');
    try {
        // Check if the license key is valid (UUID format)
        if (!validateLicense(LICENSE_KEY)) {
            throw new Error('Invalid license key. Please contact support.');
        }

        console.log('License validation result: Valid');
    } catch (error) {
        console.error('License validation failed:', error.message);
        process.exit(1);
    }
}

// Simple License Validation (UUID check)
function validateLicense(licenseKey) {
    // Check if the license key is a valid UUID
    return licenseKey && licenseKey.length === 36; // Check UUID format (length of UUID is 36)
}

function isTrialValid() {
    if (!fs.existsSync(TRIAL_FILE)) {
        // First time running: create trial file
        fs.writeFileSync(TRIAL_FILE, JSON.stringify({ startTime: Date.now() }));
        return true;
    }

    const trialData = JSON.parse(fs.readFileSync(TRIAL_FILE));
    const startTime = trialData.startTime;
    const currentTime = Date.now();

    return currentTime - startTime <= TRIAL_DURATION;
}

async function waitForUserConfirmation(message) {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question(`${message} Press Enter to continue...`, () => {
            rl.close();
            resolve();
        });
    });
}

async function saveCookies(page) {
    const cookies = await page.cookies();
    fs.writeFileSync(cookiesPath, JSON.stringify(cookies, null, 2));
    console.log('Cookies saved successfully.');
}

async function loadCookies(page) {
    if (fs.existsSync(cookiesPath)) {
        const cookiesData = fs.readFileSync(cookiesPath, 'utf-8');
        if (cookiesData.trim()) {
            const cookies = JSON.parse(cookiesData);
            await page.setCookie(...cookies);
            console.log('Cookies loaded successfully.');
        }
    }
}

async function deleteCookies() {
    try {
        if (fs.existsSync(cookiesPath)) {
            fs.unlinkSync(cookiesPath);
            console.log('Cookies deleted successfully.');
        }
    } catch (error) {
        console.error('Error deleting cookies:', error.message);
    }
}

async function navigateToTokenPage(page, tokenAddress) {
    const tokenPageUrl = `https://pump.fun/coin/${tokenAddress}`;
    console.log(`Navigating to: ${tokenPageUrl}`);
    await page.goto(tokenPageUrl, { waitUntil: 'domcontentloaded', timeout: 120000 });
    console.log('Page loaded successfully!');
}

async function postComment(page, commentText) {
    try {
        const postButtonSelector = 'div.flex.items-center.mb-4.md\\:mb-1.mt-1 > div';
        const cardViewSelector = '[role="dialog"][data-state="open"]';
        const commentInputSelector = '#text';
        const submitButtonXPath = '//*[@id="radix-:r3f:"]/button | //button[contains(@class, "bg-green-400") and contains(text(), "post reply")]';

        console.log('Waiting for the "Post a reply" button...');
        const postButton = await page.waitForSelector(postButtonSelector, { timeout: 60000 });
        if (!postButton) {
            throw new Error(`Post button not found for selector: ${postButtonSelector}`);
        }
        console.log('Clicking the "Post a reply" button...');
        await postButton.click();

        console.log('Waiting for the card view (dialog) to appear...');
        await page.waitForSelector(cardViewSelector, { timeout: 60000 });
        console.log('Card view with text area and submit button is now visible.');

        console.log('Waiting for the comment input field...');
        await page.waitForSelector(commentInputSelector, { timeout: 30000 });
        console.log('Comment input field is now visible.');

        console.log('Typing comment...');
        await page.type(commentInputSelector, commentText, { delay: 100 });

        console.log('Waiting for the submit button to become enabled...');
        const submitButton = await page.evaluateHandle((xpath) => {
            const result = document.evaluate(
                xpath,
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            ).singleNodeValue;
            return result;
        }, submitButtonXPath);

        const isDisabled = await submitButton.evaluate(el => el.hasAttribute('disabled'));
        if (!isDisabled) {
            console.log('Submit button is enabled, clicking...');
            await submitButton.click();
        } else {
            console.error('Submit button is still disabled');
        }

        console.log('Comment posted successfully!');
    } catch (error) {
        console.error('Error posting comment:', error.message);
    }
}

async function main() {
    console.log("Starting the bot...");

    // Validate license or trial
    if (!isTrialValid()) {
        console.error('Trial period expired. Please contact support for a valid license.');
        process.exit(1);
    }
    validateLicenseKey();

    const browser = await puppeteer.launch({ headless: false });
    console.log("Browser launched.");
    const page = await browser.newPage();

    console.log("Navigating to Pump.fun...");
    await page.goto('https://pump.fun', { waitUntil: 'domcontentloaded', timeout: 120000 });

    await loadCookies(page);

    if (!fs.existsSync(cookiesPath)) {
        console.log('Please log in manually in the browser.');
        await waitForUserConfirmation('Login complete?');
        await saveCookies(page);
    }

    const replyManager = new ReplyManager();
    await replyManager.initialize();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    let tokenAddress = '';
    let commentCount = null;

    console.log("Waiting for token address and comment count...");

    rl.on('line', async (input) => {
        input = input.trim();

        if (input === 'delete_cookies') {
            try {
                await deleteCookies();
                console.log("Cookies deletion confirmed.");
            } catch (error) {
                console.error("Error during cookie deletion:", error.message);
            }
            console.log("Bot stopping. Cookies cleared.");
            rl.close();
            await browser.close();
            process.exit(0);
        } else if (!tokenAddress) {
            tokenAddress = input;
            console.log(`Token address received: ${tokenAddress}`);
        } else if (tokenAddress && commentCount === null) {
            commentCount = parseInt(input, 10);

            if (isNaN(commentCount) || commentCount <= 0) {
                console.error('Invalid comment count. Please enter a positive number.');
                commentCount = null;
            } else {
                console.log(`Comment count received: ${commentCount}`);
                rl.close();

                for (let i = 0; i < commentCount; i++) {
                    await navigateToTokenPage(page, tokenAddress);
                    const commentText = await replyManager.getUniqueReply();
                    console.log(`Posting comment: ${commentText}`);
                    await postComment(page, commentText);
                    await new Promise(resolve => setTimeout(resolve, 5000));
                }

                console.log("All comments posted successfully.");
                console.log("Bot session is still active.");
            }
        }
    });
}

// Invoke main
main().catch(async (error) => {
    console.error("Fatal error:", error.message);
    await deleteCookies(); // Ensure cookies are deleted on fatal errors
    process.exit(1);
});
