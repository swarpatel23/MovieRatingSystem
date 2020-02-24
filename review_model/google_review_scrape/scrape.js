const puppeteer = require("puppeteer");
const chalk = require("chalk");
const fs = require("fs");
var tm = require( 'text-miner' );

// MY OCD of colorful console.logs for debugging... IT HELPS
const error = chalk.bold.red;
const success = chalk.keyword("green");
var urls = [];
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('BollywoodMovieDetail.csv')
});

lineReader.on('line', function (line) {
  var s = line.split(',"');
  if (s[1] != undefined) {
    s1 = s[1].split('"');
    console.log(s1[0]);
    urls.push(s1[0]);
  }
});
// stream = fs.open('moviename.csv', 'r',function(err,data)
// {
//   line = data.readLine();
//   while(line) {
//     //casper.echo(line);

//     line = stream.readLine();
//     var s = line.split(',"');
//     if(s[1]!=undefined)
//     {
//         s1 = s[1].split('",');
//         console.log(s1[0]);
//         urls.pish(s1[0]);
//     }

//   }

// });
var movieq, dir, loc, url, base, page;
(async () => {
  try {
    // open the headless browser
    var browser = await puppeteer.launch({ headless: true });
    // open a new page
    for (let i = 0; i < urls.length; i++) {
      url = urls[i];
      base = "https://www.google.com/search?q=";
      dir = "bollymovie1/"
      movieq = base + url + " movie";
      loc = dir + url + ".json";
      //console.log(loc);


      page = await browser.newPage();
      // enter url in page
      console.log(movieq);
      await page.goto(`${movieq}`);
      //await page.waitFor(5000);
      //page.waitForNavigation({ waitUntil: 'networkidle2' });
      await page.evaluate(() => {
        if (document.querySelector('span.aKcFGd') != undefined) {
          document.querySelector('span.aKcFGd').click();
        }
      });
      await page.waitFor(3000);
      //const element = await select(page).getElement(`span.aKcFGd`);
      //await page.screenshot({ path: 'buddy-screenshot.png' });
      

      await page.evaluate(() => {
        if (document.querySelector('div.U1vjCc') != null) {
          document.querySelector('div.U1vjCc').scrollBy(0, 6000);
        }
      });
      await page.waitFor(500);
      await page.evaluate(() => {
        if (document.querySelector('div.U1vjCc') != null) {
          document.querySelector('div.U1vjCc').scrollBy(0, 6000);
        }
      });
      await page.waitFor(500);
      await page.evaluate(() => {
        if (document.querySelector('div.U1vjCc') != null) {
          document.querySelector('div.U1vjCc').scrollBy(0, 6000);
        }
      });
      await page.waitFor(500);
      await page.evaluate(() => {
        if (document.querySelector('div.U1vjCc') != null) {
          document.querySelector('div.U1vjCc').scrollBy(0, 6000);
        }
      });
      await page.waitFor(500);
      let reviewdata = await page.evaluate(() => {

        let reviews = [];
        let revtext = [];
        let review = document.querySelectorAll('pre.T7nuU');
        review.forEach((rev) => {
          //var my_corpus = new tm.Corpus([]);
          
          let revJson = {};
          if(!rev.innerText.toLowerCase().endsWith("...more"))
          {
          //console.log(loc);
          try {
            
            //my_corpus.addDoc(rev.innerText);
            //my_corpus.toLower().clean().removeInterpunctuation().removeNewlines().removeDigits().stem("Porter");
            //console.log(my_corpus);
            revJson.review = rev.innerText.toLowerCase();
            revJson.label = 0;
            //revtext.push(rev.innerText);
           
            //fs.write(loc, rev.innerText+"\n", 'a');
          }
          catch (exception) {

          }
          
          reviews.push(revJson);
        }
        });
        console.log(revtext);
        return reviews;
      });
      //   const fields = [
      //     'review',
      //     'label'
      // ];
      // let csv = json2csv({ data: reviewdata, fields });
      // fs.writeFile(loc, csv);
      json = JSON.stringify(reviewdata);
      console.log(json.length);
      if (json.length != 0) {
        fs.writeFileSync(loc, json, 'utf8', function (err, data) {
          if (err) {
            console.log("eror while creating review file");
          }
        });

      }
      console.dir(reviewdata);
      //console.log(revtext);
      console.dir(reviewdata.length);

      page.close();
      //await page.goto(`${url}`);
      //await page.waitForNavigation({ waitUntil: 'networkidle2' });
    }
    debugger;
    // console.log(news);
    await browser.close();
    // Writing the news inside a json file
    // fs.writeFile("hackernews.json", JSON.stringify(news), function(err) {
    //   if (err) throw err;
    //   console.log("Saved!");
    // });
    // console.log(success("Browser Closed"));
  } catch (err) {
    // Catch and display errors
    console.log(error(err));
    await browser.close();
    console.log(error("Browser Closed"));
  }
})();