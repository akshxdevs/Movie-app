import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css"; 
import axios from 'axios';

export const Signup  = () => {

    const [name,setName]  = useState("");
    const [email,setEmail]  = useState("");
    const [password,setPassword]  = useState("");
    const [showError,setShowError] = useState(false);


    const Email = email.toLowerCase();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password || !name) {
          setShowError(true);
          return; // Ensure function exits if validation fails
        }
      
        try {
          const response = await axios.post('http://localhost:3000/auth/signup', {
            name: name,
            email: email,
            password: password
          });
      
          // Assuming response data contains the structure { error, token }
          const data = response.data;
          if (data.error) {
            toast.warn("User already exists.");
          } else {
            toast.success("Signed up successfully!");
            localStorage.setItem("token", data.token);
          }
        } catch (error) {
          toast.error("An error occurred while registering user: " + error.toString());
        }
      };

    return(
        <div className="SignupCotainer">
            <form action="" onSubmit={(e)=>handleSubmit(e)}>
            <input type="text" placeholder="Enter youe name.." onChange={(e)=>setName(e.target.value)}/>
            <input type="text" placeholder="Enter your email.." onChange={(e)=>setEmail(e.target.value)} />
            <input type="text" placeholder="Enter your password.." onChange={(e)=>setPassword(e.target.value)} />
            <button type="submit">Signup</button> 
            </form>
            {showError && (
                <span className="fill-field-error">Please fill all the fields!</span>
            )}

            <ToastContainer/>
        </div>
    );
} 