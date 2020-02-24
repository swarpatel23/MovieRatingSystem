const fs = require('fs');
const tm = require('text-miner');
const path = require('path');
var lemmatizer = require("lemmatizer")

const directoryPath = "../puppet/bollymovie1";
const savebase = "cleanedReview/";
var filerev = [];
var data, obj, filteredreview;
fs.readdir(directoryPath, function (err, files) {

    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    let base = "../puppet/bollymovie1/";
    let revtext = [];
    files.forEach(function (file) {

        let filepath = base + file;
        //console.log(filepath);
        if (filepath.endsWith('.json')) {
            let rawdata = fs.readFileSync(filepath);
            let reviews = JSON.parse(rawdata);
            for (var k in reviews) {
                //console.log(k,reviews[k]);
                reviews[k].review = cleanEmojies(reviews[k].review);
                var s = "";
                reviews[k].review.split(" ").forEach(function (item) {
                    s += lemmatizer.lemmatizer(item) + " ";
                });
                revtext.push(s);
            }
            var corpus = new tm.Corpus(revtext);
            revtext = [];
            filteredreview = corpus.trim().toLower().clean().removeInterpunctuation().removeNewlines().removeDigits().removeWords(tm.STOPWORDS.EN).stem();
            //var terms = new tm.DocumentTermMatrix(filteredreview);
            //console.log(filteredreview);
            var fileSavePath = savebase + file;

            data = JSON.stringify(filteredreview);
            obj = JSON.parse(data);
            filteredreview = null;
            //console.log(obj);
            //console.log(filerev);

            for (var k in obj.documents) {
                let json = {}
                //console.log(obj.documents[k].text);
                json.review = obj.documents[k].text;
                json.label = 0;
                //console.log(json);


                filerev.push(json);
                //json = {};
            }
            obj = null;

            //console.log(filerev);

            rjson = JSON.stringify(filerev);


            console.log(rjson.length);

            if (rjson.length != 2) {
                console.log(fileSavePath);
                fs.writeFileSync(fileSavePath, rjson, 'utf8', function (err, data) {
                    if (err) {
                        console.log("eror while creating review file");
                    }
                    else {
                        //console.log("hi");
                    }
                });
            }
            //filerev.length = 0;
            filerev = [];
            obj = null;
            data = null;


            //console.log(terms.findFreqTerms(5));
            //console.log(revtext);


        }
    });
});

function cleanEmojies(rev) {
    rev = rev.replace(/😚/g, "EMO_POS ");
    rev = rev.replace(/👌/g, "EMO_POS ");
    rev = rev.replace(/😍/g, "EMO_POS ");
    rev = rev.replace(/👍/g, "EMO_POS ");
    rev = rev.replace(/😂/g, "EMO_POS ");
    rev = rev.replace(/😇/g, "EMO_POS ");
    rev = rev.replace(/😎/g, "EMO_POS ");
    rev = rev.replace(/🤣/g, "EMO_POS ");
    rev = rev.replace(/🤩/g, "EMO_POS ");
    rev = rev.replace(/🥰/g, "EMO_POS ");

    rev = rev.replace(/😕/g, "EMO_NEG ");
    rev = rev.replace(/😟/g, "EMO_NEG ");
    rev = rev.replace(/😭/g, "EMO_NEG ");
    rev = rev.replace(/😩/g, "EMO_NEG ");
    rev = rev.replace(/😫/g, "EMO_NEG ");
    rev = rev.replace(/🥱/g, "EMO_NEG ");
    rev = rev.replace(/😤/g, "EMO_NEG ");
    rev = rev.replace(/😡/g, "EMO_NEG ");
    rev = rev.replace(/😠/g, "EMO_NEG ");

    //rev = rev.replace(/\\'g/, "");
    return rev;
}