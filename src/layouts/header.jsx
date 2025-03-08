import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { useTheme } from "@/hooks/use-theme";
import { Bell, ChevronsLeft, Moon, Search, Sun } from "lucide-react";
import profileImg from "@/assets/profile-image.jpg";
import PropTypes from "prop-types";

export const Header = ({ collapsed, setCollapsed }) => {
    const { theme, setTheme } = useTheme();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const notificationsRef = useRef(null);
    const navigate = useNavigate();

    // Sample Notifications (Replace with API Data)
    const notifications = [
        { id: 1, type: "document", message: "New document uploaded: Contract.pdf" },
        { id: 2, type: "employee", message: "John Doe has joined the team!" },
        { id: 3, type: "document", message: "Policy update: Leave Policy 2024" },
        { id: 4, type: "employee", message: "Employee performance review due for Sarah" },
    ];

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                notificationsRef.current && !notificationsRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
                setNotificationsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <ChevronsLeft className={collapsed ? "rotate-180" : ""} />
                </button>
                <div className="input">
                    <Search size={20} className="text-slate-300" />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search..."
                        className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                    />
                </div>
            </div>
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    <Sun size={20} className="dark:hidden" />
                    <Moon size={20} className="hidden dark:block" />
                </button>

                {/* Notifications Dropdown */}
                <div className="relative" ref={notificationsRef}>
                    <button
                        className="btn-ghost size-10 relative"
                        onClick={() => setNotificationsOpen(!notificationsOpen)}
                    >
                        <Bell size={20} />
                        {notifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                {notifications.length}
                            </span>
                        )}
                    </button>

                    {notificationsOpen && (
                        <div className="absolute right-0 mt-2 w-64 rounded-lg bg-white shadow-lg dark:bg-gray-800">
                            <div className="p-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Notifications
                            </div>
                            <ul className="max-h-48 overflow-y-auto">
                                {notifications.map((notification) => (
                                    <li
                                        key={notification.id}
                                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm"
                                    >
                                        {notification.message}
                                    </li>
                                ))}
                            </ul>
                            {notifications.length === 0 && (
                                <div className="p-2 text-center text-gray-500 text-sm">
                                    No notifications
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Profile Image with Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        className="size-10 overflow-hidden rounded-full"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <img src={profileImg} alt="Profile" className="size-full object-cover" />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white shadow-lg dark:bg-gray-800">
                            <ul className="flex flex-col p-2 text-sm">
                                <li 
                                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                    onClick={() => navigate("/settings")}
                                >
                                    Settings
                                </li>
                                <li 
                                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </li>
                                <li 
                                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                    onClick={() => navigate("/signup")}
                                >
                                    Signup
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
};
