const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    supportFile: false,
    fixturesFolder: false,
    baseUrl:"http://localhost:19006/",
    setupNodeEvents(on, config) {
      
    },
  }
})
