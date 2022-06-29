// Load HTTP client dependency
const axios = require('axios')
// Load HTML & XML parser
const cheerio = require('cheerio')
// Make HTML output more readable
const pretty = require("pretty");

exports.handler = async (event, context) => {
    // to hit the function callback visit https://uoescraperpoc.netlify.app/.netlify/functions/hello-world.js
    // You can specify GET parameters in the URL ?url=*url*
    // to access query parameters here use: event.queryStringParameters.url

    const eventBody = JSON.parse(event.body)
    // URL of the page we want to scrape
    const url = eventBody.url
    // selector for nodes to scrape
    const selector = eventBody.selector

    try {

        // Fetch HTML using Axios for the page we want to scrape
        const response = await axios.get(url);
        // Load HTML we fetched into Cheerio
        const $ = await cheerio.load(response.data);
        // Filter HTML using the CSS selector specified 
        const html = $(selector)

        return {
            statusCode: 200,
            body: JSON.stringify({
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