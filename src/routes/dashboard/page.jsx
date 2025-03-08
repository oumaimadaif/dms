import { useState, useEffect } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTheme } from "@/hooks/use-theme";
import { Footer } from "@/layouts/footer";
import { CreditCard, DollarSign, Package, TrendingUp, Users, PencilLine, Trash, Eye } from "lucide-react";

const DashboardPage = () => {
    const { theme } = useTheme();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/documents"); // Ensure Flask is running
                if (!response.ok) {
                    throw new Error("Failed to fetch documents");
                }
                const data = await response.json();
                setDocuments(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[
                    { title: "Total Documents", value: 2500, icon: <Package size={26} />, percentage: "9%" },
                    { title: "Processed Documents", value: 160, icon: <DollarSign size={26} />, percentage: "2%" },
                    { title: "Total Employees", value: 500, icon: <Users size={26} />, percentage: "5%" }
                ].map((item, index) => (
                    <div key={index} className="card">
                        <div className="card-header flex items-center gap-x-4">
                            <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 dark:bg-blue-600/20 dark:text-blue-600">
                                {item.icon}
                            </div>
                            <p className="card-title">{item.title}</p>
                        </div>
                        <div className="card-body bg-slate-100 dark:bg-slate-950 p-4">
                            <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">{item.value}</p>
                            <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                                <TrendingUp size={18} />
                                {item.percentage}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Documents Table */}
            <div className="card">
                <div className="card-header">
                    <p className="card-title">Top Documents</p>
                </div>
                <div className="card-body p-0">
                    {loading ? (
                        <p className="text-center p-4">Loading...</p>
                    ) : error ? (
                        <p className="text-center p-4 text-red-500">{error}</p>
                    ) : (
                        <div className="relative h-[500px] w-full overflow-auto rounded-none">
                            <table className="table">
                                <thead className="table-header">
                                    <tr className="table-row">
                                        <th className="table-head">#</th>
                                        <th className="table-head">Docs</th>
                                        <th className="table-head">Size</th>
                                        <th className="table-head">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    {documents.map((doc, index) => (
                                        <tr key={index} className="table-row">
                                            <td className="table-cell">{index + 1}</td>
                                            <td className="table-cell">
                                                <div className="flex w-max gap-x-4">
                                                    <div className="flex flex-col">
                                                        <p>{doc.name}</p>
                                                        <p className="font-normal text-slate-600 dark:text-slate-400">
                                                            {doc.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="table-cell">{doc.size || "N/A"}</td>
                                            <td className="table-cell">{doc.status || "Unknown"}</td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DashboardPage;
