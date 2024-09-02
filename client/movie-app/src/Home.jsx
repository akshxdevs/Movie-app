import { Intro } from "./Intro";
import { Movies } from "./Movies";
import { Navbar } from "./Navbar";
import './Home.css';

export const Home  = () => {
    return(
        <div className="Home">
            <Navbar/>
            <Intro/>
            <Movies/>
        </div>
    );
} 