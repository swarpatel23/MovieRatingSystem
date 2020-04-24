const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    imdbId: String,
    name: String,                     
    release_date: {type:Date},
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
    images:[{
        id:String,
        h:{ type: Number, default: 0 },
        w:{ type: Number, default: 0 },
        msrc:{ type: String, default: null },
        src:{ type: String, default: null },
        altText:{ type: String, default: null }
    }],
    cast: [{
        title: String,
        persons:[{
            image: { type: String, default: null },
            link: { type: String, default: null },
            name: { type: String, default: null },
            role: { type: String, default: 'Not Specified' }
        }]
    }],
    reviews: [{
        heading:String,
        review:String,
        imdb_rating:{ type: Number, default: 0 },
        our_rating:{ type: Number, default: 0 },
        aho_label:{ type: Number, default: 0 },
    }],
    updated: { type: Date, default: Date.now }   
});
 
module.exports = mongoose.model('movie',MovieSchema,'movies')