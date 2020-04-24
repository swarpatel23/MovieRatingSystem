const puppeteer = require("puppeteer");
const chalk = require("chalk");
const fs = require("fs");
var tm = require( 'text-miner' );

const error = chalk.bold.red;
const success = chalk.keyword("green");
var urls = [];
var movie_year = [];
var movie_data = [];
// Reading csv file and creating array of movie names and year of that movie
// to search into google
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('BollywoodMovieDetail.csv')
});

lineReader.on('line', function (line) {
  var s = line.split(',');
    urls.push(s[1].slice(1,-1));
    movie_year.push(s[2].slice(1,-1))
  
});
/*
    dir - folder name where scraped data is doing to stored
    headless: true (for disabling browser GUI)
*/
var movieq, dir="movie_data", loc, url, base="https://www.google.com/search?q=";
var page,myear;
(async () => {
  try {
    // open the headless browser
    var browser = await puppeteer.launch({ headless: true });
    // open a new page
    for (let i = 0; i < urls.length; i++) {
      url = urls[i];
      myear = movie_year[i];
      movieq = base + url + myear;
      loc = dir + url + ".json";
      //console.log(loc);

      page = await browser.newPage();
      // enter url in page
      console.log(movieq);

      await page.goto(`${movieq}`);
      
      let moviedata = await page.evaluate(() => {
        let m_data = {};
        //base64 encoded poster
        let movie_poster = document.querySelectorAll('img.rISBZc M4dUYb');
        
        // 2009 ‧ Drama/Bollywood ‧ 2h 50m
        let genre_year_length = document.querySelector('div.wwUB2c.PZPZlf').innerText;
        console.log(genre_year_length);
        m_data.tdata = genre_year_length;

        //"Story of the movie is about the education system of India and how a Superhero changes the system."
        let movie_desccription = document.querySelector("#rhs > div > div.EyBRub.kp-blk.knowledge-panel.Wnoohf.OJXvsb > div.xpdopen > div.ifM9O > div > div.SALvLe.farUxc.mJ2Mod > div > div:nth-child(1) > div > div > div > div > span")
        m_data.desc = movie_desccription;
        
        let release_date = document.querySelector('span.LrzXr').innerText;
        m_data.release_date = release_date;

        let mposter = [];

        movie_poster.forEach((poster) => {

            mposter.push(poster.src)

        });
        m_data.poster = mposter;
        console.log(m_data)
        return m_data;
      });
      movie_data.push(moviedata);
     /*
      json = JSON.stringify(reviewdata);
      console.log(json.length);
      if (json.length != 0) {
        fs.writeFileSync(loc, json, 'utf8', function (err, data) {
          if (err) {
            console.log("eror while creating review file");
          }
        });

      }
      */
      console.dir(reviewdata);
      console.dir(reviewdata.length);
      page.close();
      
    }
    debugger;
  
    await browser.close();
    
  } catch (err) {
    // Catch and display errors
    console.log(error(err));
    await browser.close();
    console.log(error("Browser Closed"));
  }
  finally{

  }
})();