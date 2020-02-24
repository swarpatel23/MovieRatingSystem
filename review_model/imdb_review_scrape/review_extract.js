const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

//intial url construction for reviews
var movieid = "tt1285241"
const baseurl = "https://www.imdb.com";
var nexturl = "/title/"+ movieid +"/reviews";
var movie_url = baseurl + nexturl;

//file opening
const filename = movieid + ".csv";
const directory = "movie/";
const writeStream = fs.createWriteStream(directory + filename);
writeStream.write("heading,review\n");

function downloadPage(url) {
    return new Promise((resolve, reject) => {
        request(url, (error, response, html) => {
            if (error) reject(error);
            if (response.statusCode != 200) {
                reject('Invalid status code <' + response.statusCode + '>');
            }            
            resolve(cheerio.load(html));
        });
    });
}

//wait for the page to download and then process it.
async function extractReview(url) {
    const review_list_selector = ".lister-list";
    const limit = 15;
    try {        
        const $ = await downloadPage(url)
        console.log('Page exist with : ',url);     
        $(review_list_selector).find(".lister-item.mode-detail").each((index,element)=>{
                       
            let heading = $(element).find(".title").text();
            let review = $(element).find(".content").find(".text.show-more__control").text();
             if(index>limit)
                return false;
            heading = heading.substring(0,heading.length-1);
            console.log("Heading : ",heading);            
            //console.log("Review  : ",review);
            writeStream.write(`"${heading}","${review}" \n`); 
        });

        
    } catch (error) {
        console.error('ERROR:');
        console.error(error);
    }
}

extractReview(movie_url);