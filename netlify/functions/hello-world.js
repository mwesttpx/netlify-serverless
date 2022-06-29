// Load HTTP client dependency
const axios = require('axios')
// Load HTML & XML parser
const cheerio = require('cheerio')
// Make HTML output more readable
const pretty = require("pretty");

exports.handler = async (event, context) => {
    const eventBody = JSON.parse(event.body)
    // URL of the page we want to scrape
    const url = eventBody.url
    // selector for nodes to scrape
    const selector = eventBody.selector

    try {


        // Fetch HTML of the page we want to scrape
        const response = await axios.get(url);
        // Load HTML we fetched in the previous line
        const $ = await cheerio.load(response.data);
        /* queryDOM */
        const html = $(selector)

        return {
            statusCode: 200,
            body: JSON.stringify({
                url: url,
                selector: selector,
                html: html.html()
            })
        }
    }
    catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({
            error: error
          })
        }
      }
  }