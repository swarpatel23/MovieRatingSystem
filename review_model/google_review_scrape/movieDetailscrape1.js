const puppeteer = require("puppeteer");
const fs = require("fs");
var tm = require( 'text-miner' );


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
    urls.push(s[0].slice(1,-1));
    movie_year.push(s[2].slice(1,-1))
  
});
/*
    dir - folder name where scraped data is doing to stored
    headless: true (for disabling browser GUI)
*/
var movieq, dir="movie_data", loc="movie_data/mdata.json", url, base="https://www.imdb.com/title/";
var page,myear;
(async () => {
  try {
    // open the headless browser
    var browser = await puppeteer.launch({ headless: true });
    // open a new page
    for (let i = 0; i < urls.length; i++) {
      url = urls[i];
      myear = movie_year[i];
      movieq = base + url;
      //loc = dir + url + ".json";
      //console.log(loc);

      page = await browser.newPage();
      // enter url in page
      console.log(movieq);

      await page.goto(`${movieq}`);
      await autoScroll(page);
      await page.waitFor(4000);
      async function autoScroll(page){
        await page.evaluate(async () => {
            await new Promise((resolve, reject) => {
                var totalHeight = 0;
                var distance = 100;
                var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
    
                    if(totalHeight >= scrollHeight){
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });
    }
      let moviedata = await page.evaluate(() => {
        let m_data = {};
        try{
        m_data.name=document.querySelector('div.title_wrapper > h1').innerText.slice(0,-7);
        m_data.release_year = document.querySelector('span#titleYear').innerText.slice(1,-1);
        //poster url
        //"https://m.media-amazon.com/images/M/MV5BNTkyOGVjMGEtNmQzZi00NzFlLTlhOWQtODYyMDc2ZGJmYzFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UY268_CR2,0,182,268_AL__QL50.jpg"
        
        // "PG-13 | 2h 50min | Comedy, Drama | 25 December 2009 (India)"
        let genre_year_length = document.querySelector('div.subtext').innerText

        console.log(genre_year_length);
        m_data.tdata = genre_year_length;

        //"Story of the movie is about the education system of India and how a Superhero changes the system."
        let movie_desccription = document.querySelector('div.summary_text').innerText;
        m_data.desc = movie_desccription;
        
        let movie_dir = document.querySelectorAll('div.credit_summary_item')[0].innerText.split(": ")[1].split(",")[0];
        m_data.director =  movie_dir;

        let movie_poster = document.querySelector('div.poster > a > img').src

        let secondary_poster = document.querySelectorAll('div.mediastrip > a > img');
        let mposter = [];
        mposter.push(movie_poster);

        secondary_poster.forEach((poster) => {

            mposter.push(poster.src)

        });
        m_data.poster = mposter;

        let cast_photo_name = document.querySelectorAll('table.cast_list > tbody > tr > td.primary_photo > a > img');
        let cast_movie_name = document.querySelectorAll('table.cast_list > tbody > tr > td.character');
        let cast = [];
        for(var i=0;i<cast_movie_name.length;i++)
        {
            let cast_data = {}
            cast_data.name = cast_photo_name[i].title;
            cast_data.photo = cast_photo_name[i].src;
            cast_data.movie_name = cast_movie_name[i].innerText;
            cast.push(cast_data);
        }

        m_data.cast = cast;

        return m_data;
      }
      catch(err)
      {

      }
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
      //console.dir(movie_data);
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
    json = JSON.stringify(movie_data);
      console.log(json.length);
      if (json.length != 0) {
        fs.writeFileSync(loc, json, 'utf8', function (err, data) {
          if (err) {
            console.log("eror while creating review file");
          }
        });
      }
  }
})();