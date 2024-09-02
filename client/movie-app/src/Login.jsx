import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling
import axios from "axios";

export const Login  = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [showError,setShowError] = useState(false);
    const navigate = useNavigate();
    const Email = email.toLowerCase();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setShowError(true);
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                email: email,
                password: password
            });
    
            const data = response.data;
    
            if (response.status === 200) { 
                const userId = data.user._id;
                toast.success("Login Successful");
                localStorage.setItem("userId", userId);
                localStorage.setItem("username", email);
                localStorage.setItem("token", data.token);
                navigate('/user-home');
            } else {
                toast.error("Login failed: " + data.error); 
            }
        } catch (error) {
            toast.error("An error occurred while logging in: " + error.toString());
        }
    };
    return(
        <div className="SignupContainer">
        <form action="" onSubmit={(e)=>handleSubmit(e)} >
            <input type="text" placeholder="Enter your email.." onChange={(e)=>setEmail(e.target.value)} />
            <input type="text" placeholder="Enter your password.." onChange={(e)=>setPassword(e.target.value)} />
            <button type="submit">Login</button>
            {/* <Link className="forgot-pwd" to="/forgotPassword">Forgot Password</Link>
            <p className="signup-link">dont have an Account?? <Link style={{
                color:"black",
            }} to="/signup">Signup</Link> </p> */}
        </form>
        {showError && (
            <span className="fill-fields-error">Please Fill all the fields</span>
        )}
        <ToastContainer/>
        </div>
    );
} 