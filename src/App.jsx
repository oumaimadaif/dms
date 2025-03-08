import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";
import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import UsersPage from "./routes/users/users";
import DocumentsPage from "./routes/documents/documents";
import AnalyticsPage from "./routes/dashboard/analytics";
import NewDocumentPage from "./routes/documents/newDocument";
import AddUserPage from "./routes/users/newuser";
import SettingsPage from "./settings/settings";
import Login from "./auth/login";
import Signup from "./auth/signup";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                { index: true, element: <DashboardPage /> },
                { path: "analytics", element: <AnalyticsPage /> },
                { path: "customers", element: <UsersPage /> },
                { path: "new-customer", element: <AddUserPage /> },
                { path: "products", element: <DocumentsPage /> },
                { path: "new-product", element: <NewDocumentPage /> },
                { path: "settings", element: <SettingsPage /> },
            ],
        },
        { path: "/login", element: <Login/> },
        { path: "/signup", element: <Signup/> },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
