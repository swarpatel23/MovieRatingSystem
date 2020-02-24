const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

//intial url construction
const baseurl = "https://www.imdb.com";
var nexturl = "/list/ls063540474/?sort=user_rating,asc&st_dt=&mode=grid&page=1&ref_=ttls_vw_grd";
var url = baseurl + nexturl;

//file opening
const writeStream = fs.createWriteStream("moviename.csv");
writeStream.write("id,name,url\n");


//downloads page 
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
async function myBackEndLogic(url) {
    //for id
    let start = 7;
    let end = 16;
    try {        
        const $ = await downloadPage(url)
        console.log('Page exist with : ',url);        
        var nextpage_selector = ".flat-button.lister-page-next.next-page";
        var nextpage = $(nextpage_selector).length;        
        
        const movie_list = ".lister-list";
        $(movie_list).find(".title").each((index,element)=>{
            let name = $(element).text();
            let url = $(element).find("a").attr("href");            
            console.log(name, "   :  ",baseurl + url)            
            var id = url.substring(start,end);
            writeStream.write(`${id},"${name}",${baseurl + url} \n`); 
        });
        

        //checking if next page exist
        if(nextpage == 1)
        {
            nexturl =  $("body").find(nextpage_selector).attr("href");                
            url = baseurl + nexturl;  
            console.log("calling for ",url); 
            myBackEndLogic(url);
        }
        else
        {           
            return null;
        }                   
        // try downloading an invalid url
      //  await downloadPage('http://      .com')
    } catch (error) {
        console.error('ERROR:');
        console.error(error);
    }
}

// run your async function
/*
while(pageExist = true)
{
    pageExist = myBackEndLogic(url);
}*/
console.log("calling for ",url);
next = myBackEndLogic(url);
