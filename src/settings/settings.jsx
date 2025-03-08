import { useState } from "react";
import { Footer } from "@/layouts/footer";
import { useTheme } from "@/hooks/use-theme";

const SettingsPage = () => {
    const { theme, setTheme } = useTheme();
    const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState("johndoe@example.com");
    const [password, setPassword] = useState("");
    const [notifications, setNotifications] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        // 🚨 No action yet - You can add API integration here 🚨
        console.log({ name, email, password, theme, notifications });
    };

    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Settings</h1>

            <div className="card">
                <div className="card-header">
                    <p className="card-title">Profile Settings</p>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                        {/* Name Input */}
                        <div>
                            <label className="block text-sm font-medium">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 w-full rounded border p-2"
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 w-full rounded border p-2"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium">New Password</label>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 w-full rounded border p-2"
                            />
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>

            {/* App Preferences */}
            <div className="card">
                <div className="card-header">
                    <p className="card-title">App Preferences</p>
                </div>
                <div className="card-body">
                    {/* Theme Selection */}
                    <div>
                        <label className="block text-sm font-medium">Theme</label>
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="mt-1 w-full rounded border p-2"
                        >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="card">
                <div className="card-header">
                    <p className="card-title">Notifications</p>
                </div>
                <div className="card-body">
                    <label className="flex items-center gap-x-2">
                        <input
                            type="checkbox"
                            checked={notifications}
                            onChange={() => setNotifications(!notifications)}
                        />
                        Enable Notifications
                    </label>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default SettingsPage;
