import { useEffect, useState } from "react";
import axios from 'axios';
import './Movie.css';
import { useNavigate } from "react-router-dom";

export const Movies = () => {
    const [movies,setMovies] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        right()
    },[])

    const right = () => {
        axios.get("http://localhost:3000/auth/movie", {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setMovies(response.data);
        })
        .catch((err) => {
          console.error("Failed to fetch books", err);
        });
      };

      const handleMovies = (movieId) => {
        navigate("/movies/", { state: { data: movieId } })
      }

    return(
        <div className="Movies">
            {movies.length > 0 ? (
                movies.map((movie)=>(
                    <div key={movie._id} className="Movie">
                        <img className="movie-img" src={movie.imgUrl} alt={movie.title} onClick={() => handleMovies(movie._id)} />
                        <h4 className="movie-title">{movie.title}</h4>
                        <h4 className="movie-year">{movie.year}</h4>
                        {/* <h4 className="">{movie.category}</h4>
                        <h4 className="movie-h4">{movie.plotSummary}</h4>
                        <h4 className="movie-h4">{movie.releaseDate}</h4>   
                        <h4 className="movie-h4">{movie.isAvailableIn}</h4> 
                        <h4 className="movie-h4">{movie.uploadedBy}</h4> 
                        <h4 className="movie-h4">{movie.dateUploaded}</h4> 
                        <button className="delete-button" onClick={() => handleDeleteMovies(movie._id)}>🗑️</button>
                        <button className="add-to-favorites-button"onClick={() => handleAddToFavorites(movie._id)}>❤️</button>
                    */}</div>
                ))
            ):(
                <h2 className="no-movies"></h2>
            )}
        </div>
    );
}
