const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const axios = require('axios');

mongoose.connect('mongodb://localhost:27017/moviedb');
var dir = "reviewdata/"
var loc, mloc;
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
var map = new Map();
Movie.find({}, function (err, movies) {
    if (err) {
        console.log(err);
    }
    else {
        //console.log(movies.length);
        //console.log(movies[0].reviews[0].review);
        for (let movie of movies) {
            //console.log(movie.reviews);
            let list = [];
            for (let review of movie.reviews) {
                //console.log(review);
                list.push(review.review);
            }
            map.set(movie.imdbId, list);


        }
        //console.log(map.size);
        predict().then(function () {
            for (let r of actualrate) {
                console.log(r[1] * 10 / reviewrate.get(r[0]));
                actualrate.set(r[0], (r[1] * 10 / reviewrate.get(r[0])))
            }
        }).then(function () {
            for (let s of actualrate) {
                Movie.findOne({ imdbId: s[0] }, function (err, review) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        review.stars = s[1];
                        review.save();
                    }
                })
            }
        });

    }
})
var reviewrate = new Map();
var actualrate = new Map();
async function predicting(key, review) {
    await axios.post("http://127.0.0.1:12345/model/predict", { "review": review }).then(response => {
        console.log(response.data)
        if (reviewrate.has(key)) {
            reviewrate.set(key, reviewrate.get(key) + 1);
            if (response.data == 1) {
                if (actualrate.has(key)) {
                    actualrate.set(key, actualrate.get(key) + 1);
                }
                else {
                    actualrate.set(key, 1)
                }
            }
        }
        else {
            reviewrate.set(key, 1);
        }
        //return response.data;
    }).catch(error => {
        console.log(error)
        return -1;
    })
}
async function predict() {

    for await (let [k, v] of map) {
        console.log(k);
        for await (let re of v) {
            //console.log(re);
            await predicting(k, re);
            //console.log(" " + t + " ");
        }
    }
}
