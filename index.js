const PORT = process.env.PORT || 8000;;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require('cors');
const app = express();
const articles = [];
const movies = [];
const youtube = [];
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
    movies.push({
      text,
    });
  });
  
  const first25movies = movies.slice(0, 25);
 // console.log(first25Articles)
  res.json(first25movies);

});

app.get("/youtube/:title/:year", async  (req, res) => {
  const title = req.params.title;
  const year = req.params.year;
  const response = await axios.get(
    `www.youtube.com/results?search_query=${title} ${year} official trailer`
  );
  const html = response.data;
  const $ = cheerio.load(html);

  const anchor = $("h3.title-and-badge style-scope ytd-video-renderer").first().find("a");

  if (anchor.length > 0) {
    const link = anchor.href();
    youtube.push(link);
  }

  // function extractVideoID(url) {
  //   const startIndex = url.indexOf("v=");
  
  //   if (startIndex !== -1) {
  //     startIndex += 2; // Move past "v="
  //     const endIndex = url.indexOf('&', startIndex);
  //     if (endIndex !== -1) {
  //       return url.substring(startIndex, endIndex);
  //     } else {
  //       return url.substring(startIndex);
  //     }
  //   }
  
  //   return url; // Return null if "v=" or "&" is not found
  // }
res.json(youtube[0]);

});


app.listen(PORT, () => console.log(`server running on ${PORT}`));
module.exports=app;
//if i am going to host this on github pages what changes do i need to make