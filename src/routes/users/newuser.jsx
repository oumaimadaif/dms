import { useState } from "react";
import { Footer } from "@/layouts/footer";
import { useTheme } from "@/hooks/use-theme";

const AddUserPage = () => {
    const { theme } = useTheme();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("Active");
    const [access, setAccess] = useState("User");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const userData = { name, email, status, access };

        try {
            const response = await fetch("http://127.0.0.1:5000/employees", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error("Failed to add user");
            }

            const data = await response.json();
            setMessage("User added successfully!");
            console.log("User added:", data);

            // Clear form fields after successful submission
            setName("");
            setEmail("");
            setStatus("Active");
            setAccess("User");
        } catch (error) {
            setMessage("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Add New Employee</h1>

            <div className="card">
                <div className="card-header">
                    <p className="card-title">Add Employee</p>
                </div>
                <div className="card-body">
                    {message && (
                        <p className={`text-center p-2 ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                            {message}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                        {/* Full Name Input */}
                        <div>
                            <label className="block text-sm font-medium">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 w-full rounded border p-2"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 w-full rounded border p-2"
                                required
                            />
                        </div>

                        {/* Status Dropdown */}
                        <div>
                            <label className="block text-sm font-medium">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="mt-1 w-full rounded border p-2"
                            >
                                <option value="rejected">rejected</option>
                                <option value="approved">approved</option>
                                <option value="blocked">blocked</option>
                            </select>
                        </div>

                        {/* Access Role Dropdown */}
                        <div>
                            <label className="block text-sm font-medium">Access Role</label>
                            <select
                                value={access}
                                onChange={(e) => setAccess(e.target.value)}
                                className="mt-1 w-full rounded border p-2"
                            >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                                <option value="Editor">Editor</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-2 rounded"
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add User"}
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AddUserPage;
