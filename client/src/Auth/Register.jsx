import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosApi from "../services/axiosApi";
import InputField from "../components/InputField";

// Auth Context
import { useAuthContext } from '../context/AuthContext';

function Register() {
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
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.password_confirmation) {
            setErrors({ password_confirmation: "Passwords do not match" });
            return;
        }

        setCheck(true);
        try {
            const response = await axiosApi.post(
                `/register`,
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response.data.status === true) {
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
                        Create Your Account
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputField
                            name="name"
                            label="Full Name"
                            value={formData.name}
                            handleForm={handleChange}
                            error={errors.name}
                        />
                        <InputField
                            name="username"
                            label="Username"
                            value={formData.username}
                            handleForm={handleChange}
                            error={errors.username}
                        />
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
                        <InputField
                            name="password_confirmation"
                            label="Confirm Password"
                            type="password"
                            value={formData.password_confirmation}
                            handleForm={handleChange}
                            error={errors.password_confirmation}
                        />

                        <button
                            type="submit"
                            disabled={check}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-50">
                            {check ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <p className="text-center text-gray-600 mt-6">
                        Already have an account?{" "}<Link to="/login" className="text-indigo-600 hover:underline">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;