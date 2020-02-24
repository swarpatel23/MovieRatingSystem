const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream("books.csv");

writeStream.write("heading,price\n");

const page = 50;
for(var i=1;i<=page;i++){
    const url = 'http://books.toscrape.com/catalogue/page-'+i+'.html';
    console.log(url);
    request(url,(error,response,html)=>{
        if(!error && response.statusCode == 200)
        {
            const $ = cheerio.load(html);            
            $(".product_pod").each((index,element)=>{
                var heading = $(element)
                                .find("h3 > a")
                                .attr("title");
                var price = $(element)
                                .find(".price_color")         
                                .text();                   
                writeStream.write(`"${heading}", ${price} \n`); 
            });
        }
    });
}