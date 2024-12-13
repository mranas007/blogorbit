import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosApi from "../services/axiosApi";
import ButtonLoader from "../components/ButtonLoader";
import InputField from "../components/InputField";

// Auth Context
import { useAuthContext } from "../context/AuthContext";

function Login() {
    // check it user's token exist then redirect to home
    const navigate = useNavigate();
    const { token, setUserId, setToken } = useAuthContext();

    useEffect(() => {
        if (token) {
            navigate("/home");
        }
    }, [token, navigate]);

    const [check, setCheck] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCheck(true);
        try {
            const response = await axiosApi.post(
                `/login`,
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response.data.status === true) {
                // Token and Id will set here
                setUserId(response.data.data.id);
                setToken(response.data.data.token);
                navigate("/home");
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setCheck(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Login
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputField
                            name="email"
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            handleForm={handleChange}
                            error={errors.email}
                        />
                        <InputField
                            name="password"
                            label="Password"
                            type="password"
                            value={formData.password}
                            handleForm={handleChange}
                            error={errors.password}
                        />

                        <button
                            type="submit"
                            disabled={check}
                            className="
                                w-full py-3 rounded-lg 
                                bg-gradient-to-r from-indigo-600 to-purple-600 
                                text-white font-semibold 
                                hover:opacity-90 
                                transition-all duration-300
                                focus:outline-none focus:ring-2 focus:ring-indigo-300
                                disabled:opacity-50 flex justify-center items-center">
                            {check ? <ButtonLoader variant='white' /> : "LogIn"}
                        </button>
                    </form>

                    <p className="text-center text-gray-600 mt-6">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-indigo-600 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;