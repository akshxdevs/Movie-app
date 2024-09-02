const mongoose = require("mongoose");

const likedMovies = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 1,
        maxlength: 255,
        match: /^[a-zA-Z0-9 ]*$/,
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: props => `${props.value} is not a valid title!`
        }
    },
    year: {
        type: [Number],
        validate: {
            validator: function(v) {
                return Array.isArray(v) && v.every(num => num >= 1888); // Ensure each year is a valid movie year
            },
            message: props => `${props.value} is not a valid year!`
        }
    },
    category: {
        type: String,
        required: true,
    },
    plotSummary: {
        type: String,
        default: "No summary available.",
        maxlength: 500
    },
    rating: {
        type: Number,
        min: 0,
        max: 10
    },
    releaseDate: {
        type: String,
    },
    isAvailableIn: {
        type: String,
    },
    uploadedBy: {
        type: String,
        required: true,
    },
    dateUploaded: {
        type: Date,
        default: Date.now,
    },
    imgUrl:{
        type: String,
        trim: true,
    },  userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
});

const Liked = mongoose.model("LikedMovies",likedMovies);
module.exports = Liked
