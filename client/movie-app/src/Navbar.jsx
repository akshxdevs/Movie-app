import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "./assets/Screenshot 2024-07-30 181251.png";
import './Navbar.css';
import axios from "axios";

export const Navbar = () => {
    const [movies,setMovies] = useState([]);
    // const [isOpen,setIsopen] = useState(false);
    // const navigate = useNavigate();
    // const toggleMenu = () => {
    //     setIsopen(!isOpen);
    // }
    // const handleToggleMenu = () => {
    //     setIsopen(false);
    // }
    // const logoutUser  = () => {
    //     if(window.confirm("you wanna logout?")){
    //         localStorage.clear();
    //         navigate('/login')
    //     }else {
    //         navigate('/')
    //     }
    // }
    // const auth = localStorage.getItem("token")
    // const username = localStorage.getItem("username")


    const handleSearch = async(e) => {
        try {
            if (e.target.value) {
            let res = axios.get(`http://localhost:3000/auth/searchMovie/${e.target.value}`,{
                headers: { "Content-Type": "application/json" }
            });
            let searchMovies = res.data;
            
            if (!searchMovies.messsage) {
                setMovies(searchMovies);
            }else{
                setMovies([]);
            }

            }else{
                getMovies()
            }
        } catch (error) {
            console.error(error.messsage);
            
        }
    }



    return(
        <div>
            <nav>
                <div className="navbar">
                    <img src={logo} alt="logo" className="logo" />

                    <div className="search-box">
                        <input type="text" placeholder="Quick Search" className="search-box-field" onChange={(e)=>handleSearch(e)}/>
                    </div>
                    <ul>
                        <li><NavLink to="/home">Home</NavLink></li>
                        <li><NavLink to="/4k">4K</NavLink></li>
                        <li><NavLink to="/trewnding">Trending</NavLink></li>
                        <li><NavLink to="/browsemovies">Browse Movies</NavLink> </li>
                        <li><NavLink to="/login">Login</NavLink></li>
                        <li><NavLink >|</NavLink></li>
                        <li><NavLink to="/signup">Register</NavLink></li>
                    </ul>

                    
                </div>
            </nav>
        </div>
    );
}