import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();
        console.log("Signing up with:", { email, password });
        navigate("/login"); // Redirect to login after signing up
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 dark:text-white">Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            className="mt-1 w-full rounded-md border p-2 dark:bg-gray-700 dark:text-white"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            className="mt-1 w-full rounded-md border p-2 dark:bg-gray-700 dark:text-white"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 w-full rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <span
                        className="cursor-pointer text-blue-500 hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
