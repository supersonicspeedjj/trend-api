const PORT = process.env.PORT || 8000;;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require('cors');
const app = express();
const articles = [];
const imgsrc = [];
app.use(cors({ origin: 'http://localhost:3000' }));

app.get("/", async (req, res) => {

    
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
    
    const first25Articles = articles.slice(0, 25);
    
    res.json(first25Articles);
  
});
app.get("/movies", async (req, res) => {

    
  const response = await axios.get(
    "https://editorial.rottentomatoes.com/guide/popular-movies/"
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
  
  const first25Articles = articles.slice(0, 25);
  
  res.json(first25Articles);

});
app.listen(PORT, () => console.log(`server running on ${PORT}`));
module.exports=app;
//if i am going to host this on github pages what changes do i need to make