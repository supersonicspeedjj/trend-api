const PORT = process.env.PORT || 8000;;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require('cors');
const app = express();
const articles = [];
const movies = [];
const youtube = [];
app.use(cors());

app.get("/", async (req, res) => {

    
    const response = await axios.get(
      "https://editorial.rottentomatoes.com/guide/popular-tv-shows/"
    );
    const html = response.data;
    const $ = cheerio.load(html);

    $("div.article_movie_title").each(function () {
      
      const anchor = $(this).find("a");

      
      const text = anchor.text();
     // const href = anchor.attr("href");
     // const img = anchor.find("img").attr("src");

      
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
   
    const anchor = $(this).find("a");

   
    const text = anchor.text();
   // const href = anchor.attr("href");
   // const img = anchor.find("img").attr("src");

    
    movies.push({
      text,
    });
  });
  
  const first25movies = movies.slice(0, 25);
 // console.log(first25Articles)
  res.json(first25movies);

});




app.listen(PORT, () => console.log(`server running on ${PORT}`));
module.exports=app;
