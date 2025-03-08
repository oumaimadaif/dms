import { useEffect, useState } from "react";
import { PencilLine, Trash, EyeIcon } from "lucide-react";
import { Footer } from "@/layouts/footer";

const DocumentsPage = () => {
    const [documents, setDocuments] = useState([]);
    const [filteredDocuments, setFilteredDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingDoc, setEditingDoc] = useState(null);
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchDocuments();
    }, []);

    useEffect(() => {
        setFilteredDocuments(
            documents.filter(doc => 
                doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.status.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, documents]);

    const fetchDocuments = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/documents");
            if (!response.ok) {
                throw new Error("Failed to fetch documents");
            }
            const data = await response.json();
            setDocuments(data);
            setFilteredDocuments(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this document?")) return;
        try {
            const response = await fetch(`http://127.0.0.1:5000/documents/${id}`, { method: "DELETE" });
            if (!response.ok) {
                throw new Error("Failed to delete document");
            }
            setDocuments(prev => prev.filter(doc => doc.id !== id));
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    };

    const handleEdit = async (id) => {
        try {
            const formData = new FormData();
            formData.append("name", editName);
            formData.append("description", editDescription);

            const response = await fetch(`http://127.0.0.1:5000/documents/${id}`, {
                method: "PUT",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to edit document");
            }

            setEditingDoc(null);
            fetchDocuments();
        } catch (error) {
            console.error("Error editing document:", error);
        }
    };

    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Documents</h1>

            <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 rounded w-full mb-4"
            />

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
                        <div className="relative h-[500px] w-full overflow-auto">
                            <table className="table">
                                <thead className="table-header">
                                    <tr className="table-row">
                                        <th className="table-head">#</th>
                                        <th className="table-head">Name</th>
                                        <th className="table-head">Description</th>
                                        <th className="table-head">Size</th>
                                        <th className="table-head">Status</th>
                                        <th className="table-head">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    {filteredDocuments.map((doc, index) => (
                                        <tr key={index} className="table-row">
                                            <td className="table-cell">{index + 1}</td>
                                            <td className="table-cell">
                                                {editingDoc === doc.id ? (
                                                    <input
                                                        type="text"
                                                        value={editName}
                                                        onChange={(e) => setEditName(e.target.value)}
                                                        className="border p-2 rounded w-full"
                                                    />
                                                ) : (
                                                    <p>{doc.name}</p>
                                                )}
                                            </td>
                                            <td className="table-cell">
                                                {editingDoc === doc.id ? (
                                                    <input
                                                        type="text"
                                                        value={editDescription}
                                                        onChange={(e) => setEditDescription(e.target.value)}
                                                        className="border p-2 rounded w-full"
                                                    />
                                                ) : (
                                                    <p>{doc.description}</p>
                                                )}
                                            </td>
                                            <td className="table-cell">{doc.size || "N/A"}</td>
                                            <td className="table-cell">{doc.status}</td>
                                            <td className="table-cell">
                                                <div className="flex items-center gap-x-4">
                                                    {editingDoc === doc.id ? (
                                                        <button onClick={() => handleEdit(doc.id)} className="text-green-500">Save</button>
                                                    ) : (
                                                        <button
                                                            className="text-blue-500"
                                                            onClick={() => {
                                                                setEditingDoc(doc.id);
                                                                setEditName(doc.name);
                                                                setEditDescription(doc.description);
                                                            }}
                                                        >
                                                            <PencilLine size={20} />
                                                        </button>
                                                    )}
                                                    <button className="text-red-500" onClick={() => handleDelete(doc.id)}>
                                                        <Trash size={20} />
                                                    </button>
                                                    <button className="text-green-500" onClick={() => window.open(doc.fileUrl || "#", "_blank")}>
                                                        <EyeIcon size={20} />
                                                    </button>
                                                </div>
                                            </td>
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

export default DocumentsPage;