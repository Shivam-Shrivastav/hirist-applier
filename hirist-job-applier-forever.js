const puppeteer = require('puppeteer');
const fs = require('fs');
const { exec } = require('child_process');
const ping = require('ping');

// Configuration
const CONFIG = {
  urls: [
  // Add your URLs here
  "https://www.hirist.tech/k/artificial-intelligence-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",

  "https://www.hirist.tech/k/artificial-intelligence-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",

  "https://www.hirist.tech/k/machine-learning-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/machine-learning-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",

  "https://www.hirist.tech/k/nlp-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/nlp-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",

  "https://www.hirist.tech/k/generative-ai-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/generative-ai-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",

  "https://www.hirist.tech/k/predictive-modeling-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/predictive-modeling-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",

  "https://www.hirist.tech/k/query-segmentation-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/query-segmentation-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",

  "https://www.hirist.tech/k/ai-interface-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/ai-interface-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",

  "https://www.hirist.tech/k/llm-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/llm-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",

  "https://www.hirist.tech/k/deep-learning-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/deep-learning-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",

  "https://www.hirist.tech/k/mlops-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/mlops-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",
  "https://www.hirist.tech/k/security-architect-ai-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/security-architect-ai-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",
  "https://www.hirist.tech/k/cloud-architect-ai-ml-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/cloud-architect-ai-ml-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",
  "https://www.hirist.tech/k/data-scientist-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/data-scientist-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",
  "https://www.hirist.tech/k/data-modeling-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/data-modeling-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",
  "https://www.hirist.tech/k/analytics-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/analytics-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",
  "https://www.hirist.tech/k/data-science-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/data-science-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",
  "https://www.hirist.tech/k/data-mining-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/data-mining-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",
  "https://www.hirist.tech/k/tableau-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/tableau-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",
  "https://www.hirist.tech/k/power-bi-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/power-bi-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",
  "https://www.hirist.tech/k/quantitative-analytics-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/quantitative-analytics-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",
  "https://www.hirist.tech/k/data-visualization-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/data-visualization-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",
  "https://www.hirist.tech/k/data-analyst-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/data-analyst-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",
  "https://www.hirist.tech/k/python-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",
  "https://www.hirist.tech/k/python-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/nodejs-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/nodejs-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",
  "https://www.hirist.tech/k/full-stack-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/full-stack-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation",
  "https://www.hirist.tech/k/restful-api-jobs.html?locName=any%20location&locIds=0&exp=1&ref=topnavigation",
  "https://www.hirist.tech/k/restful-api-jobs.html?locName=any%20location&locIds=0&exp=2&ref=topnavigation"
],
  cookiesPath: './cookies.json',
  maxCheckboxes: 50,
  restartDelay: 4 * 60 * 60 * 1000, // 4 hours in milliseconds
  checkConnectionInterval: 30000, // 30 seconds
  statsFile: './job_stats.json',
  maxConnectionAttempts: 5,
  connectionRetryDelay: 10000 // 10 seconds
};

// Initialize stats
let stats = {
  totalApplied: 0,
  lastRun: null,
  urlStats: {}
};

// Load or initialize stats
function loadStats() {
  try {
    const data = fs.readFileSync(CONFIG.statsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Initialize with default stats
    const initialStats = {
      totalApplied: 0,
      lastRun: null,
      urlStats: {}
    };
    CONFIG.urls.forEach(url => {
      initialStats.urlStats[url] = { applied: 0, lastProcessed: null };
    });
    return initialStats;
  }
}

// Save stats to file
function saveStats() {
  stats.lastRun = new Date().toISOString();
  fs.writeFileSync(CONFIG.statsFile, JSON.stringify(stats, null, 2));
  console.log('Stats saved:', stats);
}

// Check internet connection
async function checkInternetConnection() {
  try {
    const res = await ping.promise.probe('8.8.8.8');
    return res.alive;
  } catch (error) {
    return false;
  }
}

// Wait for internet connection
async function waitForInternetConnection() {
  let attempts = 0;
  while (attempts < CONFIG.maxConnectionAttempts) {
    attempts++;
    const isConnected = await checkInternetConnection();
    if (isConnected) return true;
    
    console.log(`No internet connection (attempt ${attempts}/${CONFIG.maxConnectionAttempts}). Retrying...`);
    await new Promise(resolve => setTimeout(resolve, CONFIG.connectionRetryDelay));
  }
  return false;
}

// Process a single URL
async function processUrl(url, browser) {
  let page = null;
  let needToRevisit = true;
  let processedCheckboxes = new Set();
  let urlAppliedCount = 0;

  // Initialize URL stats if not exists
  if (!stats.urlStats[url]) {
    stats.urlStats[url] = { applied: 0, lastProcessed: null };
  }

  while (needToRevisit) {
    try {
      // Check internet connection before processing
      const isConnected = await checkInternetConnection();
      if (!isConnected) {
        console.log('Internet connection lost during processing. Waiting...');
        const reconnected = await waitForInternetConnection();
        if (!reconnected) {
          console.log('Failed to restore internet connection. Exiting...');
          return false;
        }
        console.log('Internet connection restored. Continuing...');
      }

      page = await browser.newPage();
      await page.setViewport({ width: 0, height: 0 });

      // Load cookies
      try {
        const cookiesString = fs.readFileSync(CONFIG.cookiesPath, 'utf8');
        const cookies = JSON.parse(cookiesString);
        if (cookies.length > 0) await page.setCookie(...cookies);
      } catch (error) {
        console.error('Error loading cookies:', error);
      }

      console.log(`Navigating to: ${url}`);
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      await autoScroll(page);

      const checkboxes = await page.$$('div.job-apply-checkbox input.job-apply-input:not([disabled])');
      console.log(`Found ${checkboxes.length} non-disabled checkboxes`);

      if (checkboxes.length === 0) {
        console.log('No non-disabled checkboxes found on this page. Moving to next URL.');
        needToRevisit = false;
        await page.close();
        return true;
      }

      let clickedCount = 0;
      let done_check_box = [];

      for (const checkbox of checkboxes) {
        const checkboxId = await page.evaluate(el => el.id, checkbox);
        if (processedCheckboxes.has(checkboxId)) continue;

        const label = await page.$(`label[for="${checkboxId}"]`);
        if (label && !done_check_box.includes(checkboxId)) {
          done_check_box.push(checkboxId);
          await label.click();
          console.log(`Clicked checkbox with ID: ${checkboxId}`);
          processedCheckboxes.add(checkboxId);
          clickedCount++;
          urlAppliedCount++;
          stats.totalApplied++;
          stats.urlStats[url].applied++;
          await page.waitForTimeout(500);

          // Save stats periodically during processing
          if (clickedCount % 10 === 0) saveStats();
        }

        if (clickedCount >= CONFIG.maxCheckboxes) {
          console.log(`Reached maximum checkbox limit (${CONFIG.maxCheckboxes}). Will click "Apply All" now.`);
          break;
        }
      }

      await page.waitForTimeout(1000);

      // Click the "Apply All" button
      const applyAllButton = await page.$('div.fixed-apply-bar > div > button:nth-child(1)');
      if (applyAllButton) {
        const buttonText = await page.evaluate(el => el.textContent, applyAllButton);
        console.log(`Found button with text: ${buttonText}`);

        if (buttonText.includes('Apply All')) {
          console.log('Clicking "Apply All" button');
          await applyAllButton.click();
          await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }).catch(e => {
            console.log('Navigation timeout or error after clicking Apply All, continuing...');
          });

          const pages = await browser.pages();
          if (pages.length > 2) await pages[pages.length - 1].close();
        }
      }

      const totalCheckboxes = await page.$$eval('div.job-apply-checkbox input.job-apply-input:not([disabled])', boxes => boxes.length);
      needToRevisit = processedCheckboxes.size < totalCheckboxes && clickedCount >= CONFIG.maxCheckboxes;

      stats.urlStats[url].lastProcessed = new Date().toISOString();
      await page.close();

    } catch (error) {
      console.error(`Error processing URL ${url}:`, error);
      if (page) await page.close();
      needToRevisit = false;
      return false;
    }
  }

  console.log(`Completed processing URL: ${url}. Applied to ${urlAppliedCount} jobs.`);
  return true;
}

// Auto-scroll function
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

// Main processing loop
async function processAllUrls() {
  let browser;
  
  try {
    // Check internet connection before starting
    const isConnected = await checkInternetConnection();
    if (!isConnected) {
      console.log('No internet connection. Waiting...');
      const reconnected = await waitForInternetConnection();
      if (!reconnected) {
        console.log('Failed to establish internet connection. Will try again later.');
        return;
      }
    }

    browser = await puppeteer.launch({
      headless: "new",
      defaultViewport: null,
      args: ['--start-maximized']
    });

    for (const url of CONFIG.urls) {
      const success = await processUrl(url, browser);
      if (!success) break; // Stop processing if there was an error
    }

  } catch (error) {
    console.error('Error in main process:', error);
  } finally {
    if (browser) await browser.close();
    saveStats();
    console.log(`Finished processing all URLs. Will restart in ${CONFIG.restartDelay / (60 * 60 * 1000)} hours.`);
  }
}

// Continuous execution with restart
async function runForever() {
  while (true) {
    stats = loadStats();
    console.log('Starting new processing cycle...');
    await processAllUrls();
    await new Promise(resolve => setTimeout(resolve, CONFIG.restartDelay));
  }
}

// Start the infinite loop
runForever().catch(console.error);