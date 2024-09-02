const express = require("express");
const router = express.Router();
const Movie = require("../schema/movieSchema");
const Liked = require("../schema/likedMoviesSchema")
router.post("/movie",async(req,res) => {
    try {
        const {title,year,category,plotSummary,rating,releaseDate,isAvailableIn,uploadedBy,imgUrl,dateUploaded} = req.body;

        const newMovie = await Movie.create({
            title,
            year,
            category,
            plotSummary,
            rating,
            releaseDate,
            isAvailableIn,
            uploadedBy,
            dateUploaded,
            imgUrl,
        })
        res.status(201).json(newMovie);
    } catch (e) {
        console.error(e);
        res.status(500).json({error:"Internal Server Error!!"})
    }
});

router.get("/movie",async(req,res)=>{
    try {
        const getAllMovies = await Movie.find()
        res.status(200).json(getAllMovies);
    } catch (error) {
        console.log("Internal server error!",error);
    }
});

router.get("/movie/:id",async(req,res)=>{
  try {
      const getOneMovie = await Movie.findOne({_id:req.params.id})
      res.status(200).json(getOneMovie);
  } catch (error) {
      console.log("Internal server error!",error);
  }
});

router.delete("/movie/:id", async (req, res) => {
    try {
        const movieId = req.params.id;
        const deleteMovie = await Movie.deleteOne({ _id: movieId });
        if (!deleteMovie.deletedCount) {
            return res.status(404).json({ error: "Movie not found!" });
        } else {
            return res.status(200).json({ message: "Deleted successfully!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/likedmovie/user/:id",async(req,res)=>{
    try {
        const userID = req.params.id;
        const likedMovies = await Liked.find({ userID });
        res.status(200).json(likedMovies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/likedmovie/:id", async (req, res) => {
    try {
      if (!req.body.userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
      const movie = await Movie.findOne({ _id: req.params.id });
      if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
      }
      const existingFavorite = await Liked.findOne({ title: movie.title, userId: req.body.userId });
      if (existingFavorite) {
        return res.status(400).json({ error: "Movie already exists in your favorites" });
      }
      const { title, year, category, plotSummary, rating, releaseDate, isAvailableIn, uploadedBy, imgUrl, dateUploaded } = movie;
      const { userId } = req.body;
      const newFavorite = await Liked.create({
        title,
        year,
        category,
        plotSummary,
        rating,
        releaseDate,
        isAvailableIn,
        uploadedBy,
        imgUrl,
        dateUploaded,
        userId
      });
      res.status(201).json(newFavorite);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

router.delete("/removeLiked/:id", async (req, res) => {
    try {
      const movieId = req.params.id;
      const deleteLikedMovie = await Liked.findOneAndDelete({ _id: movieId });
      if (!deleteLikedMovie) {
        return res.status(404).json({ error: "Liked movie not found" });
      }
      res.status(200).json({ message: "Removed successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error", details: error.message });
    }
  });

  router.get("/searchMovie/:key", async (req, res) => {
    try {
      const movie = await Movie.find({
        title: { $regex: new RegExp(req.params.key, "i") },
      });
      if (movie.length === 0) {
        return res.status(404).json({ message: "Movie not found" });
      }
      res.status(200).json(movie); // Send back the found movies
    } catch (error) {
      res.status(500).json({ error: "Internal server error", details: error.message });
    }
  });


module.exports = router;