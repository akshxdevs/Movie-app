import { useEffect, useState } from "react";
import axios from 'axios';
import { Navbar } from "./Navbar";
import { useLocation } from "react-router-dom";
import './MovieInfo.css';

export const MoviesInfo = () => {
    const [movies, setMovies] = useState([]);
    const location = useLocation();
    const { data } = location.state || {}; 
    
    useEffect(() => {
        if (data) { 
            //console.log("Data in useEffect:", data);
            getOneMovies();
        } else {
            console.error("No data received for movies.");
        }
    }, [data]); 

    const getOneMovies = () => {
        axios.get(`http://localhost:3000/auth/movie/${data}`)
            .then((response) => {
                setMovies(response.data);
                
            })
            .catch((err) => {
                console.error("Failed to fetch movies", err);
            });
    };

    return (
        <div>
            <Navbar/>
            <div className="oneMovies">
                <div className="oneMovie">
                    <div className="img-div">
                        <img className="oneMovie-img" src={movies.imgUrl} alt={movies.title}/>
                    </div>
                </div>
                <button className="Download-btn">Download</button>
                <button className="Watchnow-btn">Watch Now</button>
            </div>


            {/*<h4 className="movie-title">{movies.title}</h4>
                <h4 className="movie-year">{movies.year}</h4>
                <h4 className="">{movies.category}</h4>
                <h4 className="movie-h4">{movies.plotSummary}</h4>
                <h4 className="movie-h4">{movies.releaseDate}</h4>   
                <h4 className="movie-h4">{movies.isAvailableIn}</h4> 
                <h4 className="movie-h4">{movies.uploadedBy}</h4> 
                <h4 className="movie-h4">{movies.dateUploaded}</h4>  */}
            
        </div>

    );
    
};
