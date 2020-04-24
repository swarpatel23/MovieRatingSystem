const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
//const writeStream = fs.createWriteStream("moviename.csv");

//writeStream.write("name\n");

var nextpage_selector = ".flat-button.lister-page-next.next-page";
var nextpage = null;
const baseurl = "https://www.imdb.com";
var nexturl = "/list/ls063540474/?sort=user_rating,asc&st_dt=&mode=grid&page=1&ref_=ttls_vw_grd";
var url = baseurl + nexturl;
    console.log(url);
    request(url,(error,response,html)=>{        
        if(!error && response.statusCode == 200)
        {            
            const $ = cheerio.load(html);
            nextpage = $(nextpage_selector).length;
            console.log(nextpage);                   
            if(nextpage == 1)
            {
                nexturl =  $("body").find(nextpage_selector).attr("href");                
                url = baseurl + nexturl;                                               
            }
            else
            {           
                nextpage = null; 
            }                    
        }
    });