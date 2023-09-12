
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const articles = [];
const imgsrc = [];


app.get("https://trend-api-git-master-supersonicspeedjj.vercel.app", async (req, res) => {
  try {
    
    const response = await axios.get(
      "https://www.imdb.com/search/title/?count=100&title_type=feature,tv_series"
    );
    const html = response.data;
    const $ = cheerio.load(html);

    $('h3.lister-item-header').each(function(){
      // Find the <a> tag inside the current <h3> element
      const anchor = $(this).find("a");

      // Get the text and href attributes of the <a> tag
      const text = anchor.text();
     // const href = anchor.attr("href");
     // const img = anchor.find("img").attr("src");

      // Do something with the text and href
      articles.push({
        text,
      });
    });
    
    
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


