const { defineConfig } = require("cypress");

module.exports = defineConfig({

    
    "viewportWidth": 1366,
    "viewportHeight": 768,
    "watchForFilesChanges": false,
    "chromeWebSecurity": false,
    "waitForAnimation": true,
    "defaultCommandTimeout": 6000,
    "pageLoadTimeout": 60000,
    "video": true,
    "screenshotsFolder": "cypress/videos",
    "failOnStatusCode": false,
    // "integrationFolder": ".",

    // "reporter": "cypress-mochawesome-reporter",
    // "reporterOptions": {
    //     "reportDir": "cypress/report",
    //     "html":true,
    //     "overwrite":false,
    //     "json": false,
    //     "charts": true,
    //     "reportPageTitle": "Shopist.io Report",
    //     "embeddedScreenshots": true
    // },

    "retries":{
        "runMode":1,
        "openMode":0
    },

    projectId: "rhtyz9",
 // aws code buil CYPRESS_RECORD_KEY d18e6be6-b228-47d3-a221-5c3a175d1248


  e2e: {
    "baseUrl": "https://www.shopist.io",
    setupNodeEvents(on, config) {  
      // implement node event listeners here
    },
  },
});
