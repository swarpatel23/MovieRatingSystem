const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/moviedb');
var dir = "reviewdata/"
var loc,mloc;
var Schema = new mongoose.Schema({
    imdbId: String,
    name: String,
    release_date: { type: Date },
    release_year: Number,
    release_info: mongoose.Schema.Types.Mixed,
    description: { type: String, default: null },
    genre: [String],
    poster: { type: String, default: null },
    posterimageid: String,
    stars: { type: Number, default: 0 },
    rated: { type: String, default: 'unrated' },
    running_time: mongoose.Schema.Types.Mixed,
    trailer_link: { type: String, default: null },
    images: [{
        id: String,
        h: { type: Number, default: 0 },
        w: { type: Number, default: 0 },
        msrc: { type: String, default: null },
        src: { type: String, default: null },
        altText: { type: String, default: null }
    }],
    cast: [{
        title: String,
        persons: [{
            image: { type: String, default: null },
            link: { type: String, default: null },
            name: { type: String, default: null },
            role: { type: String, default: 'Not Specified' }
        }]
    }],
    reviews: [{
        heading: String,
        review: String,
        imdb_rating: { type: Number, default: 0 },
        our_rating: { type: Number, default: 0 },
        aho_label: { type: Number, default: 0 },
    }],
    updated: { type: Date, default: Date.now }
});

var Movie = mongoose.model('movie', Schema);


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
async function extractMovieDetails(movieid) {
    const baseurl = "https://www.imdb.com";
    var movie_url = baseurl + "/title/" + movieid;
    var movie_url_credit = movie_url + "/fullcredits";
    //file opening
    const filename = movieid + ".csv";
    const directory = "movie/";
    //   const writeStream = fs.createWriteStream(directory + filename);
    //   writeStream.write("heading,review\n");   
    const title_selector = "#title-overview-widget > div.vital > div.title_block > div > div > div.title_wrapper > h1";
    const category_selector = "#title-overview-widget > div.vital > div.title_block > div > div > div.title_wrapper > div.subtext";
    const year_selector = "#titleYear > a";
    const limit = 25;
    try {
        var $ = await downloadPage(movie_url)
        console.log('Page exist with : ', movie_url);


        let titlem = $(title_selector)[0].childNodes[0].data;
        let year = parseInt($("#titleYear > a").text());
        let rate = "unrated";
        let time = "";
        var running_time = { hour: 0, minute: 0 };
        if ($("#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > div").length != 0) {
            rate = $("#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > div")[0].childNodes[0].data;
            rate = rate.trim();
            if (rate == "")
                rate = "unrated";
        }
        if ($("#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > div > time").length != 0) {
            time = $("#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > div > time")[0].childNodes[0].data;
            time = time.trim();
            let res = time.split(" ");
            for (let y = 0; y < res.length; y++) {
                if (res[y].search("h") != -1)
                    running_time.hour = parseInt(res[y]);
                if (res[y].search("min") != -1)
                    running_time.minute = parseInt(res[y]);
            }
        }
        // let category = $("#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > div > span:nth-child(1)").siblings()[2].children[0].data;        
        let category_list = $("#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > div > a").length;
        let category = [];
        for (let i = 0; i < category_list - 1; i++) {
            category.push($("#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > div > a")[i].childNodes[0].data);
        }
        let stars = 0;
        if ($("#title-overview-widget > div.vital > div.title_block > div > div.ratings_wrapper > div.imdbRating > div.ratingValue > strong > span").length != 0) {
            let starstemp = $("#title-overview-widget > div.vital > div.title_block > div > div.ratings_wrapper > div.imdbRating > div.ratingValue > strong > span").text();
            stars = parseFloat(starstemp);
        }
        let description = "";
        if ($(".summary_text").length != 0) {
            description = $(".summary_text").text();
            description = description.trim();
        }
        let poster = "";
        let posterimageid = "";
        if ($("div.poster > a > img").length != 0) {
            poster = $("div.poster > a > img").attr("src");
            let tempid = $("div.poster > a").attr("href");
            let start = tempid.indexOf("rm");
            let end = tempid.indexOf("?");
            posterimageid = tempid.substring(start, end);
            console.log(posterimageid);
        }
        let date = "";
        let dateobj = null;
        let dateInfo = null;
        if ($("#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > div > a:last-child").length != 0) {
            date = $("#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > div > a:last-child").text().trim();
            let arrdate = date.trim().split(" ");
            //               console.log(arrdate);
            let zone;
            if (arrdate[arrdate.length - 1].includes('(')) {
                let zonestr = arrdate[arrdate.length - 1];
                zone = arrdate[arrdate.length - 1].substring(1, zonestr.length - 1)
                //      console.log(zone);
            }
            dateobj = new Date(date);
            dateInfo = {
                date: arrdate[0],
                month: arrdate[1],
                year: arrdate[2],
                zone: zone,
                datestring: date
            };
        }
        /*
        console.log("Movie Title : ",title);     
        console.log("Movie Year : ",year);            
        console.log("rate :",rate);
        console.log("catregoery ", category);
        console.log("time", time);
        console.log("stars", stars);
        console.log("description", description);
        console.log('poster', poster);
        */

        //Crew details


        $ = await downloadPage(movie_url_credit);
        console.log('Page exist with : ', movie_url_credit);
        var full_credit_list = [];

        $("#fullcredits_content").find(".dataHeaderWithBorder").each((index, Element) => {
            var title = $(Element)[0].childNodes[0].data.trim();
            let credit_list = [];

            title = title.replace(" by", '');
            title = title.replace(" By", '');
            title = title.trim();
            //         console.log(title);            
            $(Element).next("table").find("tr").each(
                (index1, Element1) => {
                    let nametemp = $(Element1).find(".name").text().trim();
                    let credittemp = $(Element1).find(".credit").text().trim();
                    if (credittemp == "")
                        credittemp = title;
                    if (nametemp != "")
                        credit_list.push({ name: nametemp, role: credittemp, link: null, image: null });
                });
            if (title.toLowerCase() != "cast")
                full_credit_list.push({ title: title, persons: credit_list });
        });



        //Cast details   


        var cast_list_temp = [];
        $(".cast_list").find("tr.odd, tr.even").each((index, element) => {
            //console.log(index);                
            let nametemp = $(element).find("td").not(".ellipsis, .character").text().trim();
            let link_person = $(element).find("td").not(".ellipsis, .character").find("a").attr("href").trim();
            let role = $(element).find("td.character").text().trim().replace("(uncredited)", '').trim();
            role = role.replace("\n", '');
            role = role.replace("/", '');
            role = role.trim();


            //as 
            let temprolearr = role.split(" ");
            let trole = "";
            let trflag = 0;
            //console.log(temprolearr);
            for (let b = 0; b < temprolearr.length; b++) {
                //                   console.log(trflag,temprolearr[b]);    
                if (trflag == 0 && temprolearr[b] != '') {
                    trole += (temprolearr[b] + " ");
                }
                else if (trflag == 0 && temprolearr[b] == '') {
                    trflag = 1;
                    trole += "(";
                }
                else if (trflag == 1 && temprolearr[b] != '') {
                    if (b != (temprolearr.length - 1))
                        trole += (temprolearr[b] + " ");
                    else
                        trole += (temprolearr[b]);
                }
            }
            if (trflag == 1)
                trole += ")";
            if (trole != "")
                role = trole
            //console.log(nametemp, role);

            cast_list_temp.push({ name: nametemp, role: role, link: link_person, image: null });
        });

        for (var i = 0; i < cast_list_temp.length; i++) {
            //for(var i=0;i<1;i++){
            try {
                //   console.log(cast_list_temp[i]);
                var actor_link = baseurl + cast_list_temp[i].link;
                $ = await downloadPage(actor_link);
                let image = $("#name-poster").attr("src");
                if (image == undefined)
                    image = null
                console.log(image);
                cast_list_temp[i].image = image;
                //   console.log(cast_list_temp[i]);
            } catch{

            }
        }
        full_credit_list.push({ title: "Cast", persons: cast_list_temp });
        //  console.log(full_credit_list.length);

        //Trailer Link Extract from google


        let trailer = "";
        try {
            var trailer_link = "https://www.google.com/search?q=";
            var query = titlem;
            //  query = query.replace(" ",'+').trim();
            query = query.replace(/[_\W]+/g, "%20");
            console.log("que", query);
            trailer_link = trailer_link + query + "%20trailer";

            trailer_link = trailer_link.replace(' ', "%20").trim();

            //  trailer_link = trailer_link.replace('�','');

            console.log(trailer_link);
            $ = await downloadPage(trailer_link);
            console.log('Page exist with : ', trailer_link);
            var add = $("#main > div:nth-child(4) > div > div > span:nth-child(2) > div").text();
            add = add.replace("watch?v=", "embed/");
            //console.log("add ",add);
            //   console.log($.html());

        } catch{
            console.log("add error ");
            trailer = "";
        }
        if (trailer == "") {
            try {
                let trailer_link_yt = "https://www.youtube.com/results?search_query=";
                let queryyt = titlem;
                //  query = query.replace(" ",'+').trim();
                queryyt = queryyt.replace(/[_\W]+/g, "+");
                console.log("que", query);
                trailer_link_yt = trailer_link_yt + queryyt + "trailer";
                trailer_link_yt = trailer_link_yt.replace(' ', "+").trim();
                //  trailer_link = trailer_link.replace('�','');            
                console.log(trailer_link_yt);
                $ = await downloadPage(trailer_link_yt);
                console.log('Page exist with : ', trailer_link_yt);
                let ytlink = $(".item-section > li:nth-child(1) > div > div > div.yt-lockup-thumbnail.contains-addto > a").first().attr("href");
                ytlink = ytlink.replace("watch?v=", "embed/");
                console.log("youtube add ", ytlink);
                trailer = "https://www.youtube.com" + ytlink;
            } catch{
                //  console.log($.html());
                console.log('No trailer');
                trailer = null;
            }
        }
        console.log("trailer:", trailer);



        //Movie Images Extract

        let image_url = baseurl + "/title/" + movieid + "/mediaindex";
        let imagelist = [];
        try {
            $ = await downloadPage(image_url);
            console.log('Page exist with : ', image_url);
            let images_url_list = [];
            $("#media_index_thumbnail_grid").find("a").each((index, element) => {
                if ($(element).attr("href") != "") {
                    images_url_list.push($(element).attr("href"));
                }
            });
            //           console.log(images_url_list);
            //limit for images                 
            /*
                   for(let x=0;x<times_called;x++){
                       
                       if(x == limit_image)
                           break;
                           let image_extract_url = "https://www.imdb.com" + images_url_list[x*3]; 
                           console.log('Calling Page : ',image_extract_url);
                           $ = await downloadPage(image_extract_url);
                           console.log($.html());
                           console.log('Page exist with : ',image_extract_url);    
                           $("img.pswp__img").each((index,element)=>{
                               let img_src = $(element).attr("src");
                               let img_alt = $(element).attr("alt");
                                    images_list.push({imgid:cntimg, src:img_src, alt: img_alt});
                                   cntimg++;
                            }
                           });
                   }
                   console.log(images_list.length);                   
                   console.log(images_list);       
                   */




            let image_extract_url = "https://www.imdb.com" + images_url_list[0];
            console.log('Calling Page : ', image_extract_url);
            $ = await downloadPage(image_extract_url);
            var actu = "";
            for (let i = 0; i < $('script:not([src])')[12].children.length; i++) {
                if ($('script:not([src])')[12].children[i].type == 'text') {
                    actu += $('script:not([src])')[12].children[i].data;
                }
            }
            let garbage = "window.IMDbMediaViewerInitialState = ";
            actu = actu.trim()
            //console.log(actu);
            var starting = actu.indexOf("allImages") - 1;
            var ending = actu.indexOf('"allLanguages"') - 1;
            var allimg = actu.substring(starting, ending);
            var strtoparse = "{" + allimg + "}";
            //       console.log(strtoparse);                
            let imgobj = JSON.parse(strtoparse);
            //      console.log('imgobj : ', imgobj)

            for (let k = 0; k < imgobj["allImages"].length; k++) {
                if (imgobj["allImages"][k]["id"] == posterimageid) {
                    poster = imgobj["allImages"][k]["src"];
                }
                imagelist.push({
                    id: imgobj["allImages"][k]["id"],
                    h: imgobj["allImages"][k]["h"],
                    w: imgobj["allImages"][k]["w"],
                    msrc: imgobj["allImages"][k]["msrc"],
                    src: imgobj["allImages"][k]["src"],
                    altText: imgobj["allImages"][k]["altText"],
                });
            }
            //           console.log('imagelist', imagelist)                                                     
        } catch{
            console.log("error in image extraction");
        }



        //extract reviews
        const review_list_selector = ".lister-list";
        const limit = 25;   //limit for total movie review that needs to be extracted
        let review_list = [];
        try {
            let reviewurl = "https://www.imdb.com/title/" + movieid + "/reviews";
            const $ = await downloadPage(reviewurl);

            console.log('Page exist with : ', reviewurl);
            $(review_list_selector).find(".lister-item.mode-detail").each((index, element) => {

                let heading = $(element).find(".title").text();
                let review = $(element).find(".content").find(".text.show-more__control").text();
                let user_rating_string = $(element).find("div.review-container > div.lister-item-content > div.ipl-ratings-bar > span > span:nth-child(2)").text();
                let user_rating = 0;
                try {
                    user_rating = parseInt(user_rating_string);
                } catch{
                    user_rating = 0;
                }
                if (isNaN(user_rating)) {
                    user_rating = 0;
                }
                if (index > limit)
                    return false;
                heading = heading.substring(0, heading.length - 1);
                //console.log("Heading : ",heading);            
                review_list.push({
                    heading: heading,
                    review: review,
                    imdb_rating: user_rating,
                    our_rating: 0,
                    algo_label: 0
                });
            });
        } catch (error) {
            console.error('ERROR in review extraction');
        }


        let moviedetail = {
            name: titlem,
            release_year: year,
            release_date: dateobj,
            release_info: dateInfo,
            description: description,
            genre: category,
            poster: poster,
            posterimageid: posterimageid,
            stars: stars,
            rated: rate,
            running_time: running_time,
            trailer_link: trailer,
            images: imagelist,
            cast: full_credit_list,
            reviews: review_list,
            imdbId: movieid
        };
        //    console.log(moviedetail);    
        new Movie({
            imdbId: moviedetail.imdbId,
            name: moviedetail.name,
            release_date: moviedetail.release_date,
            release_year: moviedetail.release_year,
            release_info: moviedetail.release_info,
            description: moviedetail.description,
            genre: moviedetail.genre,
            poster: moviedetail.poster,
            posterimageid: moviedetail.posterimageid,
            stars: moviedetail.stars,
            rated: moviedetail.rated,
            running_time: moviedetail.running_time,
            trailer_link: moviedetail.trailer_link,
            images: moviedetail.images,
            cast: moviedetail.cast,
            reviews: moviedetail.reviews,
        }).save((saveerr, doc) => {
            if (saveerr)
                console.log(saveerr);
            else {
                review_data=moviedetail.reviews;
                movie_data = moviedetail;
                json = JSON.stringify(review_data);
                mjson=JSON.stringify(movie_data);
                console.log(json.length);
                if (json.length != 0) {
                    loc =dir+movieid+".json" 
                    fs.writeFileSync(loc, json, 'utf8', function (err, data) {
                        if (err) {
                            console.log("eror while creating review file");
                        }
                    });
                }
                if (mjson.length != 0) {
                    mloc ="moviedata/"+movieid+".json" 
                    fs.writeFileSync(mloc, mjson, 'utf8', function (err, data) {
                        if (err) {
                            console.log("eror while creating review file");
                        }
                    });
                }
                    console.log("movieid ", movieid, "Completed");
                }
            });
    } catch (error) {
        console.log(movie_url);
        console.error('ERROR:');
        console.error(error);
    }
    return 1;
  
}

var imdblist = []

fs.createReadStream('BollywoodMovieDetail.csv')
    .pipe(csv())
    .on('data', (row) => {
        console.log(row["imdbId"]);
        imdblist.push(row["imdbId"]);

        //extractMovieDetails(row["id"]);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
        //imdblist.push("tt2379713");
        scraping();
    });


async function scraping()
{
   for (let url of imdblist)
   {
        console.log(url);
       let t=await extractMovieDetails(url);
       console.log(t);
   }
}

