const PORT = process.env.PORT;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const articles = [];
const imgsrc = [];


app.get("/", async (req, res) => {
  try {
    
    const response = await axios.get(
      "https://editorial.rottentomatoes.com/guide/popular-tv-shows/"
    );
    const html = response.data;
    const $ = cheerio.load(html);

    $("div.article_movie_title").each(function () {
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

app.listen(PORT, () => console.log(`server running on ${PORT}`));
//if i am going to host this on github pages what changes do i need to make