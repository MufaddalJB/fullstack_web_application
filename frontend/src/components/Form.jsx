import { useState } from "react";
import api from '../api';
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from './LoadingIndicator';

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const name = method === "login" ? "Login" : "Register";
    const oppositeRoute = method === "login" ? "/register" : "/login";
    const linkText = method === "login" ? "Don't have an account? Register" : "Already have an account? Login";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleLinkClick = () => {
        navigate(oppositeRoute); // Navigates to the opposite form
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input 
                className="form-input"
                type='text'  
                placeholder='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input 
                className="form-input"
                type='password'  
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                {name}
            </button>
            <p className="form-link" onClick={handleLinkClick} style={{ cursor: 'pointer', color: '#007bff' }}>
                {linkText}
            </p>
        </form>
    );
}

export default Form;
